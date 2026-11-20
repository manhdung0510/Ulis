# Hướng dẫn chỉnh sửa nội dung cho nhóm Họa

Toàn bộ nội dung văn bản của ứng dụng được tách khỏi giao diện và đặt tại `src/content/vi/`, `src/content/en/` và `src/i18n/`. Khi thay nội dung chính thức từ sổ tay giấy hoặc giảng viên cố vấn, nhóm chỉ cần sửa các tệp dưới đây.

## 1. Trạng thái nội dung (`status`)

Mỗi tệp nội dung có trường `status`:
- `placeholder`: Bản nháp mẫu dùng cho demo, cần nhóm thay bằng nội dung chính thức.
- `draft-needs-review`: Bản dịch tiếng Anh do nhóm cần rà soát lại thuật ngữ và văn phong.
- `final`: Nội dung đã chốt (ví dụ số khẩn cấp `115`, `111`).

## 2. Danh sách các tệp nội dung

| Tệp (Tiếng Việt / Tiếng Anh) | Nội dung bên trong | Ghi chú khi chỉnh sửa |
|---|---|---|
| `src/content/{vi,en}/checkin.ts` | Thứ tự 8 cảm xúc, câu phản hồi ấm theo cảm xúc, bảng ánh xạ `moodToExercises` | Có thể đổi gợi ý bài tập cho từng cảm xúc |
| `src/content/{vi,en}/exercisesMeta.ts` | Tên, mô tả ngắn, thời lượng ước tính, tham chiếu trang sổ tay của 4 bài tập | Giữ nguyên `id` của bài tập (`thought-record`, `distortion-spotter`, `thought-reframing`, `emotion-awareness`) |
| `src/content/{vi,en}/distortions.ts` | 10 sai lệch nhận thức (tên, mô tả đời thường, ví dụ sinh viên, câu hỏi gợi mở) | Mỗi mục cần đủ 4 trường để bài tập và bảng tra cứu hiển thị đầy đủ |
| `src/content/{vi,en}/exercises.ts` | Hướng dẫn từng bước, câu hỏi gợi ý, nhãn ô nhập và ví dụ cho 4 bài tập | Giữ nguyên cấu trúc khóa bước |
| `src/content/{vi,en}/consult.ts` | 3 hồ sơ giảng viên mẫu, 9 bài hỏi đáp mẫu, 5 mẫu phản hồi theo chủ đề | Khi chưa có giảng viên thật tham gia, luôn giữ nhãn `(mẫu)` / `(sample)` |
| `src/content/{vi,en}/support.ts` | Thông tin 115, 111 và mục liên hệ tham vấn tại ULIS | Điền phòng tiếp đón, email, giờ trực chính thức của ULIS vào mục `ulis-counseling` và đổi `status` thành `'final'` |
| `src/content/{vi,en}/guide.ts` | Nội dung "Khi nào mở sổ tay giấy" và "Khi nào dùng nền tảng web", 3 bước nhịp sử dụng | Dùng ở cả Trang chủ và `/huong-dan` |
| `src/i18n/{vi,en}.ts` | Toàn bộ chuỗi giao diện (nút, tiêu đề, thông báo, nhãn biểu mẫu) | Chạy `npm test` sau khi sửa để kiểm tra hai bộ khóa khớp nhau |

## 3. Lưu ý an toàn & giọng điệu

- Không dùng từ: `AI`, `thông minh`, `điều trị`, `chữa khỏi`, `bệnh nhân`, `chẩn đoán` (ngoài dòng tuyên bố miễn trừ chuẩn).
- Giữ giọng điệu gần gũi (`bạn` / `mình`), ngắn gọn, không phán xét hay gây áp lực.
- Không đưa số liệu nghiên cứu chưa kiểm chứng hoặc lời chứng thực hư cấu vào giao diện.
