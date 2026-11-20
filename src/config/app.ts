/**
 * Cấu hình chung của ứng dụng Họa.
 */

/**
 * Đường dẫn tới biểu mẫu góp ý của nhóm (ví dụ Google Form).
 * Để chuỗi rỗng '' thì nút Góp ý sẽ tự động ẩn đi để tránh dẫn tới đường link chưa sẵn sàng.
 */
export const FEEDBACK_FORM_URL = '';

/** Key lưu trữ duy nhất trong localStorage có gắn phiên bản */
export const STORAGE_KEY = 'hoa-demo:v1';

/** Múi giờ chuẩn dùng cho hiển thị ngày giờ */
export const APP_TIMEZONE = 'Asia/Ho_Chi_Minh';

/** Độ trễ mô phỏng cho lớp dịch vụ dữ liệu (ms) */
export const SIMULATED_DELAY_MIN_MS = 300;
export const SIMULATED_DELAY_MAX_MS = 650;
