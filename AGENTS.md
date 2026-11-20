# Quy tắc làm việc cho Agent & Nhóm phát triển — Dự án Họa

## 1. Quy trình trao đổi & làm rõ yêu cầu
- **Hỏi lại khi chưa chắc 100%**: Ngay sau khi nhận yêu cầu mới, nếu có điểm nào chưa rõ nghĩa, có nhiều cách hiểu, hoặc ảnh hưởng đến kiến trúc/trải nghiệm mà chưa chắc 100%, **phải hỏi lại trước khi sửa code**, nêu rõ:
  1. Điểm nào chưa chắc 100% và vì sao.
  2. Các phương án xử lý kèm phương án khuyến nghị.
- **Gợi ý bước tiếp theo**: Sau mỗi thao tác hoàn thành, luôn gợi ý 2–3 hướng làm tiếp theo thiết thực cho người dùng.

## 2. Minh bạch & Bằng chứng
- Mọi báo cáo kết quả phải kèm bằng chứng thực tế vừa kiểm tra trong phiên (tên tệp/dòng code đã đọc hoặc sửa, kết quả `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`, mã commit `git`).
- Nếu có bước chưa kiểm tra được (ví dụ: không có `gh` CLI, chưa mở được trình duyệt thật, hay chưa kiểm tra được link live), phải ghi rõ giới hạn đó, tuyệt đối không suy đoán hoặc báo "đã xong" khi chưa chạy kiểm chứng.

## 3. Tự động Commit, Push & Deploy GitHub Pages
- **Link deploy cố định của dự án**: `https://manhdung0510.github.io/Ulis/`
- **Tự động cập nhật sau mỗi lần hoàn thành**:
  1. Chạy đầy đủ kiểm tra: `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`.
  2. Kiểm tra `git status --short` để chỉ stage các tệp thay đổi hợp lệ (không commit cache tạm trong `node_modules/.vite/`).
  3. Thực hiện `git commit` với message rõ nghĩa và `git push origin main`.
  4. Nhờ [.github/workflows/deploy.yml](.github/workflows/deploy.yml), mỗi lần push lên `main` sẽ tự động build và cập nhật thẳng lên `https://manhdung0510.github.io/Ulis/` mà không cần người dùng thao tác tay lại.

## 4. Nguyên tắc sản phẩm & mã nguồn Họa
- **An toàn & nội dung**: Không dùng chữ `AI`, `thông minh`, `chữa khỏi`, `bệnh nhân`, `chẩn đoán`, hoặc `điều trị` (trừ dòng tuyên bố miễn trừ chuẩn). Không bịa số liệu, tên người thật, số điện thoại hay đường link.
- **Hiển thị demo**: Giữ dải thông báo cố định phía trên (`DemoNotice` banner) và tuyên bố miễn trừ ở footer, đầu mỗi bài tập, đầu cổng tham vấn; **không** dùng hộp thoại modal chặn lúc mới vào trang.
- **Kiến trúc tách lớp**: Mọi nội dung nằm ở `src/content/{vi,en}/` và `src/i18n/{vi,en}.ts`; mọi đọc/ghi dữ liệu đi qua `src/services/`; TypeScript `strict` (không `any`, không warning khi lint/build).
