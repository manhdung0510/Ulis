import type { ContentStatus } from '@/types/domain';

export interface SupportResourceItem {
  id: string;
  title: string;
  description: string;
  phone?: string;
  hours?: string;
  status: ContentStatus;
}

export interface SupportContent {
  status: ContentStatus;
  resources: SupportResourceItem[];
}

export const supportContentVi: SupportContent = {
  status: 'placeholder',
  resources: [
    {
      id: '115',
      title: 'Cấp cứu y tế 115',
      description: 'Liên hệ ngay khi bạn hoặc người xung quanh cần hỗ trợ y tế khẩn cấp.',
      phone: '115',
      hours: '24/7',
      status: 'final',
    },
    {
      id: '111',
      title: 'Tổng đài Quốc gia Bảo vệ Trẻ em 111',
      description:
        'Hỗ trợ lắng nghe, tư vấn và kết nối bảo vệ miễn phí dành cho người dưới 18 tuổi.',
      phone: '111',
      hours: '24/7',
      status: 'final',
    },
    {
      id: 'ulis-counseling',
      title: 'Liên hệ tham vấn tại ULIS (thông tin chờ bổ sung)',
      description:
        'Khu vực này dành để nhóm điền email, phòng tiếp đón hoặc lịch trực chính thức của đơn vị tham vấn tại Trường Đại học Ngoại ngữ, ĐHQGHN.',
      status: 'placeholder',
    },
  ],
};
