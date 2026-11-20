import type { ContentStatus } from '@/types/domain';

export interface GuideContent {
  status: ContentStatus;
  paperItems: string[];
  webItems: string[];
  rhythmSteps: Array<{ title: string; detail: string }>;
}

export const guideContentVi: GuideContent = {
  status: 'placeholder',
  paperItems: [
    'Buổi tối trước khi ngủ hoặc lúc cần tách khỏi màn hình điện thoại để viết chậm bằng tay.',
    'Khi muốn vẽ phác, ghi chú tự do ngoài lề hoặc lưu giữ trang viết dài cho riêng mình.',
    'Lúc cần ngồi yên tĩnh 10–15 phút để hoàn thành trọn vẹn một trang bài tập CBT.',
  ],
  webItems: [
    'Giữa giờ học hoặc lúc đang ở trường cần check-in nhanh cảm xúc chỉ trong 30 giây.',
    'Khi muốn xem lại hướng dẫn từng bước hoặc tra tên 10 kiểu suy nghĩ thường gặp.',
    'Lúc muốn đặt câu hỏi ẩn danh hoặc xem quy trình đặt lịch tham vấn (bản demo).',
  ],
  rhythmSteps: [
    {
      title: '1. Dừng lại và check-in nhanh',
      detail: 'Mở web để gọi tên cảm xúc và mức độ hiện tại bất cứ lúc nào trong ngày.',
    },
    {
      title: '2. Chọn viết trên giấy hoặc trên web',
      detail: 'Nếu đang tiện cầm sổ tay Họa, bạn mở đúng trang bài tập tương ứng; nếu đang di chuyển, bạn viết nháp ngay trên web.',
    },
    {
      title: '3. Nhìn lại nhẹ nhàng',
      detail: 'Cuối tuần mở Nhật ký hoặc lật lại sổ giấy để nhận ra điều gì giúp bạn thấy vững hơn, không chấm điểm hay tự trách.',
    },
  ],
};
