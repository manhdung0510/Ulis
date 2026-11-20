# Họa — Nền tảng web bổ trợ sổ tay CBT dành cho sinh viên

**Họa** là sổ tay vật lý kết hợp nền tảng web tương tác, hỗ trợ sinh viên (15–24 tuổi) gọi tên cảm xúc, nhận diện sai lệch nhận thức và thực hành viết lại suy nghĩ cân bằng hơn dựa trên liệu pháp nhận thức – hành vi (CBT). Dự án của nhóm sinh viên Trường Đại học Ngoại ngữ – ĐHQGHN (ULIS), tham gia cuộc thi *Thắp lửa khởi nghiệp sáng tạo ULIS 2026* (Bảng B – Sản phẩm ứng dụng).

> **Lưu ý về bản demo:** Phiên bản hiện tại là demo tương tác chỉ chạy ở trình duyệt (`localStorage`), không có máy chủ. Phần Cổng tham vấn ULIS là mô phỏng, nội dung không được gửi tới giảng viên thật.

---

## 1. Chạy thử trên máy tính

Yêu cầu cài sẵn [Node.js](https://nodejs.org/) (phiên bản 20 trở lên). Mở terminal tại thư mục dự án và chạy:

```bash
npm install
npm run dev
```

Trình duyệt sẽ mở địa chỉ local (thường là `http://localhost:5173`).

### Tạo bản dựng dự phòng chạy offline (khi đi thi hoặc mất mạng)

Ứng dụng đã đóng gói sẵn phông chữ (`@fontsource/be-vietnam-pro` và `@fontsource/lora`), không gọi tài nguyên ngoài khi chạy:

```bash
npm run build
npm run preview
```

### Kiểm tra chất lượng mã nguồn

```bash
npm test
npm run lint
npx tsc --noEmit
```

---

## 2. Đưa lên đường link công khai (Deploy)

Dự án cấu hình `base: './'` và dùng `HashRouter`, nên chạy ổn định trên mọi đường dẫn con (subpath) mà không bị lỗi 404 khi tải lại trang.

### Cách 1: GitHub Pages (tự động)
1. Đẩy mã nguồn lên nhánh `main` của repository GitHub.
2. Vào **Settings → Pages**, ở mục **Source** chọn **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` sẽ tự động build và xuất bản mỗi khi có thay đổi trên `main`.

### Cách 2: Vercel hoặc Netlify
1. Import repository GitHub vào Vercel hoặc Netlify.
2. Giữ cấu hình mặc định:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Bấm Deploy để nhận đường link công khai.

---

## 3. Hướng dẫn cho thành viên không chuyên kỹ thuật

| Việc cần chỉnh | Mở tệp nào | Ghi chú |
|---|---|---|
| Sửa nội dung bài tập, câu phản hồi, giảng viên mẫu, thông tin hỗ trợ | Thư mục `src/content/vi/` và `src/content/en/` | Xem chi tiết trong [docs/CONTENT.md](docs/CONTENT.md) |
| Sửa nhãn nút, tiêu đề giao diện | `src/i18n/vi.ts` và `src/i18n/en.ts` | Giữ bộ khóa hai tệp khớp nhau (`npm test` sẽ tự kiểm tra) |
| Đổi bảng màu, phông chữ, bo góc, đổ bóng | `src/styles/tokens.css` | Sửa giá trị CSS variables ở đầu tệp |
| Thay hình minh họa từ sổ tay thật | `src/assets/illustrations/` và `src/components/illustration/Illustration.tsx` | Thêm ảnh vào `src/assets/illustrations/` rồi gắn vào `ILLUSTRATION_SOURCES` |
| Bật / tắt tính năng (Bài 4, đổi ngôn ngữ, nút Góp ý, trang Hỗ trợ) | `src/config/features.ts` | Đổi `true` / `false` |
| Gắn link Google Form Góp ý | `src/config/app.ts` | Điền URL vào `FEEDBACK_FORM_URL` (để `''` thì nút tự ẩn) |

---

## 4. Tài liệu kỹ thuật liên quan

- [docs/CONTENT.md](docs/CONTENT.md): Bản đồ toàn bộ tệp nội dung và quy ước trạng thái (`placeholder` / `draft-needs-review` / `final`).
- [docs/HANDOFF.md](docs/HANDOFF.md): Mô tả các service trong `src/services/` và danh sách API cần có khi chuyển sang backend thật.
- [docs/DECISIONS.md](docs/DECISIONS.md): Nhật ký các quyết định thiết kế & kỹ thuật.
