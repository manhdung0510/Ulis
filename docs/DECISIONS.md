# Nhật ký quyết định kỹ thuật & thiết kế (Decisions Log)

Tệp này ghi lại các lựa chọn triển khai tại những điểm prompt để mở, nhằm giữ sự nhất quán và giúp nhóm dễ thay đổi về sau.

- **Tailwind CSS v3 + CSS variables**: Dùng Tailwind v3 cấu hình trực tiếp từ `src/styles/tokens.css` để không cần UI kit bên ngoài mà vẫn kiểm soát chặt token màu, font, bo góc và đổ bóng.
- **Độ tương phản màu sắc**: Nền giấy `#FAF6EF`, mực `#2B2623`, nhấn chính `#A24A30`, nhấn phụ `#3A5A4B`, bề mặt cát `#F0E8DA`, viền mạnh `#8A7E72` để đạt chuẩn WCAG AA (>= 4.5:1 cho chữ thường, >= 3:1 cho chữ lớn và thành phần giao diện).
- **Lớp dịch vụ tách biệt + độ trễ mô phỏng**: Mọi đọc/ghi đi qua interface trong `src/services/` với độ trễ giả 300–650ms (có thể đặt về 0ms trong unit test qua helper cấu hình) để mô phỏng API thật và dễ thay thế bằng `fetch` khi có backend.
- **Thời gian phản hồi mẫu trong Cổng tham vấn**: Khi người dùng đăng câu hỏi, hệ thống lưu `replyReadyAt = createdAt + offsetMs` (6–10 giây theo hash xác định của nội dung/ID) vào `localStorage`. Nhờ vậy nếu rời trang rồi quay lại vẫn tính đúng trạng thái phản hồi theo đồng hồ thực tế thay vì chỉ giữ timer trong RAM.
- **Thông báo lần đầu (First-visit dialog)**: Lưu trạng thái đã đọc trong cùng object `hoa-demo:v1` (`onboardingDismissed`), và khi bấm "Xóa toàn bộ dữ liệu của tôi", ứng dụng xóa toàn bộ dữ liệu cá nhân, giữ/re-seed dữ liệu mẫu của Cổng tham vấn và đặt lại trạng thái sạch.
- **Nút Góp ý (`FEEDBACK_FORM_URL`)**: Khởi tạo là chuỗi rỗng `''` theo đúng quy tắc không bịa đường link; khi nhóm có Google Form chính thức chỉ cần điền vào `src/config/app.ts` là nút tự động xuất hiện.
- **Hình minh họa dự phòng**: Component `<Illustration name="..." />` hỗ trợ ánh xạ tới các tệp ảnh thật trong `src/assets/illustrations/` (khi nhóm bổ sung) và tự động hiển thị khung giữ chỗ trung tính kèm `alt` mô tả nếu chưa có tệp ảnh, không tự vẽ minh họa giả phức tạp.
- **Liên kết tới các bài viết / bài tập**: Đường dẫn tiếng Việt không dấu (`/check-in`, `/bai-tap`, `/bai-tap/:id`, `/nhat-ky`, `/tham-van`, `/ho-tro`, `/huong-dan`) dùng `HashRouter` để tương thích 100% với GitHub Pages và đường dẫn con (subpath).
- **Bản dịch cho dữ liệu mẫu Cổng tham vấn**: Các bài hỏi đáp seed (`isSampleSeed: true`) được ánh xạ theo `id` sang `src/content/{vi,en}/consult.ts` khi hiển thị để đổi ngôn ngữ mượt mà cả phần Q&A mẫu, trong khi câu hỏi và ghi chú do người dùng tự nhập giữ nguyên ngôn ngữ gốc.
- **Tạo tệp lịch `.ics` ở phía client**: Dùng hàm thuần `buildAppointmentIcs` tạo chuẩn iCalendar UTC từ giờ `Asia/Ho_Chi_Minh` (`+07:00`) mà không cần cài thêm thư viện ngoài.
- **Độ dài tối thiểu ở bài tập CBT**: Các bước viết tự do bắt buộc áp dụng kiểm tra nhẹ nhàng tối thiểu 10 ký tự; các bước kiểm chứng phụ hoặc ghi chú phản hồi cho phép để trống để tránh tạo áp lực cho sinh viên.
