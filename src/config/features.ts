/**
 * Cờ tính năng của ứng dụng Họa.
 * Nhóm có thể bật (true) hoặc tắt (false) từng phần dễ dàng.
 */
export interface FeatureFlags {
  /** P1: Bài tập thứ 4 "Nhận diện cảm xúc" */
  emotionExercise: boolean;
  /** Nút chuyển đổi ngôn ngữ Việt – Anh */
  languageSwitch: boolean;
  /** P1: Nút mở biểu mẫu Góp ý (chỉ hiện khi FEEDBACK_FORM_URL có giá trị) */
  feedbackButton: boolean;
  /** P1: Trang Hỗ trợ khi cần (/ho-tro) */
  supportPage: boolean;
}

export const FEATURES: FeatureFlags = {
  emotionExercise: true,
  languageSwitch: true,
  feedbackButton: true,
  supportPage: true,
};
