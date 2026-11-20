# Tài liệu bàn giao kỹ thuật (Backend Handoff)

Tất cả thao tác đọc/ghi dữ liệu trong giao diện đều đi qua lớp service tại `src/services/`. Các component React không gọi `localStorage` trực tiếp. Khi chuyển sang backend thật, nhóm chỉ cần thay phần cài đặt bên trong các service mà không phải sửa giao diện.

## 1. Lưu trữ hiện tại (`src/services/storage.ts`)

- Dùng một key duy nhất có gắn phiên bản: `hoa-demo:v1` (`src/config/app.ts`).
- Có hàm `migrateStorageState` để nâng cấp an toàn dữ liệu cũ hoặc thiếu trường.
- Nếu trình duyệt chặn `localStorage` (ví dụ chế độ riêng tư hạn chế bộ nhớ), ứng dụng tự động chuyển sang bộ nhớ tạm trên RAM (`isUsingMemoryFallback()`) và hiển thị thông báo nhẹ ở đầu trang.
- Độ trễ mô phỏng `300–650ms` được đặt trong `src/services/delay.ts` để kiểm tra trạng thái loading; khi gắn `fetch` thật thì bỏ `waitSimulatedDelay()`.

## 2. Danh sách Service và API tương ứng

### `IMoodService` (`src/services/moodService.ts`)
- `getAll(): Promise<MoodCheckin[]>` → `GET /api/checkins`
- `getToday(): Promise<MoodCheckin | null>` → `GET /api/checkins/today`
- `getRecent(days = 7): Promise<MoodCheckin[]>` → `GET /api/checkins?days=7`
- `saveToday(input: SaveMoodCheckinInput): Promise<MoodCheckin>` → `PUT /api/checkins/today` (mỗi ngày 1 bản ghi theo múi giờ `Asia/Ho_Chi_Minh`)
- `deleteById(id: string): Promise<void>` → `DELETE /api/checkins/:id`

### `IJournalService` (`src/services/journalService.ts`)
- `getAll(): Promise<ExerciseEntry[]>` → `GET /api/journal/exercises`
- `getById(id: string): Promise<ExerciseEntry | null>` → `GET /api/journal/exercises/:id`
- `saveEntry(input: SaveExerciseEntryInput): Promise<ExerciseEntry>` → `POST /api/journal/exercises`
- `deleteEntry(id: string): Promise<void>` → `DELETE /api/journal/exercises/:id`
- `getDraft(exerciseId)` / `saveDraft(draft)` / `clearDraft(exerciseId)` → Có thể giữ ở `localStorage` phía client hoặc đồng bộ `PUT /api/drafts/:exerciseId`

### `IConsultService` (`src/services/consultService.ts`)
- `getPosts(nowMs?: number): Promise<ConsultPost[]>` → `GET /api/consult/posts`
- `createPost(input: CreateConsultPostInput): Promise<ConsultPost>` → `POST /api/consult/posts` (bỏ `replyReadyAt` và phần tự động tạo `sampleReply` khi có giảng viên thật phản hồi)
- `resolveReadyReplies(...)` → Khi có backend thật, thay bằng polling hoặc realtime lấy phản hồi thật từ máy chủ
- `deletePost(id: string): Promise<void>` → `DELETE /api/consult/posts/:id`

### `IAppointmentService` (`src/services/appointmentService.ts`)
- `getCounselors(language)` → `GET /api/counselors`
- `getAvailableDates()` → `GET /api/counselors/available-dates`
- `getSlotsForCounselorAndDate(counselorId, dateKey)` → `GET /api/counselors/:id/slots?date=YYYY-MM-DD` (trả về danh sách `TimeSlotOption` từ lịch trống thật của giảng viên)
- `getAppointments()` → `GET /api/appointments`
- `createAppointment(input)` → `POST /api/appointments` (máy chủ kiểm tra chống đặt trùng khung giờ và sinh mã tham chiếu `HOA-XXXXXX`)
- `cancelAppointment(id)` → `PATCH /api/appointments/:id/cancel`

## 3. Kiểu dữ liệu cốt lõi (`src/types/domain.ts`)

Xem đầy đủ định nghĩa TypeScript cho `MoodCheckin`, `ExerciseEntry`, `ExerciseDraft`, `ConsultPost`, `CounselorProfile`, `Appointment`, `TimeSlotOption` và `HoaStorageState` trong `src/types/domain.ts`.
