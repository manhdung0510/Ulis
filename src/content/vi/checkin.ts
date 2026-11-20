import type { ContentStatus, EmotionId, ExerciseId } from '@/types/domain';

export interface CheckinContent {
  status: ContentStatus;
  emotionOrder: EmotionId[];
  warmResponses: Record<EmotionId, string>;
  moodToExercises: Record<EmotionId, ExerciseId[]>;
}

export const checkinContentVi: CheckinContent = {
  status: 'placeholder',
  emotionOrder: [
    'peaceful',
    'joyful',
    'anxious',
    'stressed',
    'sad',
    'angry',
    'tired',
    'confused',
  ],
  warmResponses: {
    peaceful:
      'Khoảnh khắc bình yên rất đáng quý. Bạn có thể ghi lại điều nhỏ bé nào đang giúp mình thấy dễ chịu lúc này.',
    joyful:
      'Thật vui khi hôm nay có điều làm bạn mỉm cười. Nếu muốn, bạn thử gọi tên cảm xúc cụ thể hơn để giữ lại khoảnh khắc này.',
    anxious:
      'Cảm giác lo lắng thường xuất hiện khi mình quan tâm nhiều đến điều sắp tới. Bạn có thể viết suy nghĩ ấy ra giấy để nhìn rõ hơn.',
    stressed:
      'Khi nhiều đầu việc dồn lại, đầu óc rất dễ căng lên. Chậm lại một nhịp và tách từng suy nghĩ ra sẽ giúp bạn nhẹ hơn đôi chút.',
    sad:
      'Buồn là một phản ứng tự nhiên khi có điều chưa như ý. Bạn không cần vội xua nó đi, cứ cho mình một khoảng lặng vừa đủ.',
    angry:
      'Cơn giận thường báo hiệu một giới hạn hoặc kỳ vọng của bạn vừa bị chạm tới. Gọi tên điều đó rõ ràng sẽ giúp bạn bình tĩnh hơn.',
    tired:
      'Cơ thể và tâm trí đang nhắc bạn nghỉ một chút. Hôm nay bạn không cần ép mình giải quyết mọi thứ ngay lập tức.',
    confused:
      'Khi mọi thứ còn rối, việc chưa biết bắt đầu từ đâu là điều bình thường. Thử tách cảm xúc và suy nghĩ thành từng mảnh nhỏ nhé.',
  },
  moodToExercises: {
    anxious: ['thought-record', 'distortion-spotter'],
    stressed: ['thought-record', 'thought-reframing'],
    sad: ['thought-reframing', 'emotion-awareness'],
    angry: ['emotion-awareness', 'thought-record'],
    tired: ['emotion-awareness'],
    confused: ['emotion-awareness', 'distortion-spotter'],
    joyful: ['emotion-awareness'],
    peaceful: ['emotion-awareness'],
  },
};
