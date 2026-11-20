import type { ContentStatus, ExerciseId } from '@/types/domain';

export interface ExerciseMetaItem {
  id: ExerciseId;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  notebookReference: string;
}

export interface ExercisesMetaContent {
  status: ContentStatus;
  items: Record<ExerciseId, ExerciseMetaItem>;
}

export const exercisesMetaVi: ExercisesMetaContent = {
  status: 'placeholder',
  items: {
    'thought-record': {
      id: 'thought-record',
      title: 'Nhật ký suy nghĩ',
      shortDescription: 'Đi qua 5 bước từ tình huống, cảm xúc đến viết lại một góc nhìn cân bằng hơn.',
      estimatedMinutes: 8,
      notebookReference: 'Tương ứng phần Nhật ký suy nghĩ trong sổ tay Họa',
    },
    'distortion-spotter': {
      id: 'distortion-spotter',
      title: 'Nhận diện sai lệch nhận thức',
      shortDescription: 'Gọi tên kiểu suy nghĩ quen thuộc đang làm bạn nặng lòng chỉ trong 3 bước ngắn.',
      estimatedMinutes: 4,
      notebookReference: 'Tương ứng bảng 10 kiểu suy nghĩ trong sổ tay Họa',
    },
    'thought-reframing': {
      id: 'thought-reframing',
      title: 'Tái cấu trúc suy nghĩ',
      shortDescription: 'Thử đặt 1–3 câu hỏi kiểm chứng nhẹ nhàng để nới rộng góc nhìn cho một suy nghĩ căng thẳng.',
      estimatedMinutes: 6,
      notebookReference: 'Tương ứng bài tập Tái cấu trúc trong sổ tay Họa',
    },
    'emotion-awareness': {
      id: 'emotion-awareness',
      title: 'Nhận diện cảm xúc',
      shortDescription: 'Tìm từ gọi tên cảm xúc cụ thể hơn và chú ý tín hiệu trong cơ thể lúc này.',
      estimatedMinutes: 4,
      notebookReference: 'Tương ứng phần Gọi tên cảm xúc trong sổ tay Họa',
    },
  },
};
