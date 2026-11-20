import type {
  ConsultPost,
  ConsultTopic,
  ContentStatus,
  CounselorProfile,
  ExerciseId,
} from '@/types/domain';

export interface ReplyTemplate {
  counselorId: string;
  counselorName: string;
  content: string;
  suggestedExerciseId: ExerciseId;
}

export interface ConsultContent {
  status: ContentStatus;
  counselors: CounselorProfile[];
  seedPosts: ConsultPost[];
  replyTemplatesByTopic: Record<ConsultTopic, ReplyTemplate>;
}

export const consultContentVi: ConsultContent = {
  status: 'placeholder',
  counselors: [
    {
      id: 'counselor-minh-thu',
      name: 'Cô Minh Thư',
      title: 'Giảng viên Khoa Tâm lý – Giáo dục Khai phóng',
      initials: 'MT',
      avatarTone: 'primary',
      focusAreas: ['Lo âu thuyết trình & thi cử', 'Áp lực học ngoại ngữ', 'Thích nghi năm nhất'],
      formats: ['in-person', 'online'],
      bio: 'Đồng hành cùng sinh viên trong việc nhận diện suy nghĩ tự tạo áp lực và xây dựng nhịp học tập vừa sức.',
      status: 'placeholder',
    },
    {
      id: 'counselor-hoang-nam',
      name: 'Thầy Hoàng Nam',
      title: 'Giảng viên Khoa Tâm lý – Giáo dục Khai phóng',
      initials: 'HN',
      avatarTone: 'secondary',
      focusAreas: ['Giao tiếp & làm việc nhóm', 'Cân bằng kỳ vọng gia đình', 'Kỹ năng quản lý căng thẳng'],
      formats: ['in-person', 'online'],
      bio: 'Lắng nghe các băn khoăn về mối quan hệ bạn bè, nhóm học tập và định hướng cá nhân ở bậc đại học.',
      status: 'placeholder',
    },
    {
      id: 'counselor-lan-anh',
      name: 'Cô Lan Anh',
      title: 'Giảng viên Khoa Tâm lý – Giáo dục Khai phóng',
      initials: 'LA',
      avatarTone: 'sand',
      focusAreas: ['Cảm xúc quá tải & mệt mỏi', 'Tự phê bình bản thân', 'Thói quen tự chăm sóc'],
      formats: ['online', 'in-person'],
      bio: 'Hỗ trợ sinh viên chậm lại khi thấy cạn năng lượng và thực hành đối thoại tử tế hơn với chính mình.',
      status: 'placeholder',
    },
  ],
  seedPosts: [
    {
      id: 'seed-post-1',
      title: 'Hồi hộp đến run giọng mỗi lần thuyết trình tiếng Anh',
      content:
        'Mỗi lần chuẩn bị đứng trước lớp nói tiếng Anh là tim mình đập rất nhanh. Chỉ cần quên một từ là mình nghĩ cả lớp đang đánh giá mình kém cỏi.',
      topic: 'anxiety-stress',
      isAnonymous: true,
      authorName: 'Một bạn sinh viên',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-18T09:15:00+07:00',
      sampleReply: {
        counselorId: 'counselor-minh-thu',
        counselorName: 'Cô Minh Thư',
        content:
          'Cảm giác hồi hộp trước khi nói ngoại ngữ rất phổ biến ở sinh viên. Khi quên một từ, đầu óc mình dễ phóng đại thành "cả lớp đang đánh giá". Bạn có thể thử bài tập Nhật ký suy nghĩ để tách giữa sự việc vấp một từ và khả năng chung của bản thân, hoặc đặt một buổi trao đổi thử nghiệm nhé.',
        suggestedExerciseId: 'thought-record',
        repliedAt: '2026-11-18T11:30:00+07:00',
      },
    },
    {
      id: 'seed-post-2',
      title: 'Bị tách ra khỏi nhóm cũ khi làm đồ án cuối kỳ',
      content:
        'Tuần này chia nhóm môn chuyên ngành nhưng nhóm bạn thân lại đủ người trước rồi. Mình cứ nghĩ hay là mọi người thấy mình làm việc không hợp.',
      topic: 'relationships',
      isAnonymous: false,
      authorName: 'Minh Anh',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-18T14:20:00+07:00',
      sampleReply: {
        counselorId: 'counselor-hoang-nam',
        counselorName: 'Thầy Hoàng Nam',
        content:
          'Cảm giác hụt hẫng khi chưa ghép được nhóm cùng bạn quen là rất dễ hiểu. Đôi khi việc chia nhóm chỉ phụ thuộc vào số lượng thành viên tối đa hoặc lịch học trùng nhau chứ chưa hẳn là đánh giá về bạn. Bạn thử bài Nhận diện sai lệch nhận thức để xem mình có đang suy diễn vội vàng không nhé.',
        suggestedExerciseId: 'distortion-spotter',
        repliedAt: '2026-11-18T16:10:00+07:00',
      },
    },
    {
      id: 'seed-post-3',
      title: 'Áp lực vì gia đình kỳ vọng điểm học bổng kỳ này',
      content:
        'Bố mẹ hay hỏi thăm chuyện học bổng và so sánh với con nhà bác hàng xóm. Mình thương bố mẹ nhưng càng nghe càng thấy căng thẳng, học không vào.',
      topic: 'family',
      isAnonymous: true,
      authorName: 'Một bạn sinh viên',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-17T20:05:00+07:00',
      sampleReply: {
        counselorId: 'counselor-hoang-nam',
        counselorName: 'Thầy Hoàng Nam',
        content:
          'Mang theo kỳ vọng của gia đình bên cạnh khối lượng bài vở đại học dễ khiến bạn bị quá tải. Bạn có thể thử bài Tái cấu trúc suy nghĩ để phân tách phần mình kiểm soát được trong việc học hôm nay với nỗi lo làm người khác thất vọng.',
        suggestedExerciseId: 'thought-reframing',
        repliedAt: '2026-11-18T08:40:00+07:00',
      },
    },
    {
      id: 'seed-post-4',
      title: 'Học ngoại ngữ thứ hai mãi mà điểm nghe vẫn thấp',
      content:
        'Mình luyện nghe mỗi tối gần một tiếng nhưng bài kiểm tra vẫn chỉ quanh mức 6 điểm. Đôi lúc mình muốn bỏ cuộc vì thấy mình không có năng khiếu.',
      topic: 'study',
      isAnonymous: false,
      authorName: 'Hải Đăng',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-17T15:30:00+07:00',
      sampleReply: {
        counselorId: 'counselor-minh-thu',
        counselorName: 'Cô Minh Thư',
        content:
          'Sự chững lại ở giai đoạn đầu khi học ngoại ngữ mới khiến nhiều bạn dễ nản và tự gán nhãn "không có năng khiếu". Thử dùng bài Tái cấu trúc suy nghĩ để nhìn lại những phần bạn đã duy trì được suốt thời gian qua, đồng thời trao đổi thêm với giảng viên bộ môn về phương pháp nghe nhé.',
        suggestedExerciseId: 'thought-reframing',
        repliedAt: '2026-11-17T17:45:00+07:00',
      },
    },
    {
      id: 'seed-post-5',
      title: 'Nhắn tin hỏi bài mà bạn cùng lớp xem xong không trả lời',
      content:
        'Từ sáng mình nhắn hỏi bạn về phần phân công slide, thấy đã xem nhưng không phản hồi. Cả buổi chiều mình cứ nghĩ có phải mình lỡ nói gì sai.',
      topic: 'relationships',
      isAnonymous: true,
      authorName: 'Một bạn sinh viên',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-16T17:10:00+07:00',
      sampleReply: {
        counselorId: 'counselor-lan-anh',
        counselorName: 'Cô Lan Anh',
        content:
          'Khi tin nhắn bị "đã xem", tâm trí mình rất hay tự điền vào khoảng trống bằng nỗi lo bị ghét hoặc làm phiền. Thực tế bạn kia có thể đang vội di chuyển hoặc chưa kịp soạn câu trả lời. Bạn có thể làm nhanh bài Nhận diện sai lệch nhận thức để làm dịu bớt phần suy đoán này.',
        suggestedExerciseId: 'distortion-spotter',
        repliedAt: '2026-11-16T19:00:00+07:00',
      },
    },
    {
      id: 'seed-post-6',
      title: 'Gần cuối kỳ lúc nào cũng thấy mệt nhưng không ngủ sớm được',
      content:
        'Ngày nào cũng chạy deadline đến khuya, đến lúc đặt lưng xuống đầu vẫn quay cuồng chuyện ngày mai phải làm gì nên sáng dậy rất uể oải.',
      topic: 'anxiety-stress',
      isAnonymous: false,
      authorName: 'Thanh Hà',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-16T10:00:00+07:00',
      sampleReply: {
        counselorId: 'counselor-lan-anh',
        counselorName: 'Cô Lan Anh',
        content:
          'Khi đầu óc liên tục ở chế độ "chạy việc", cơ thể rất khó chuyển sang trạng thái nghỉ ngơi dù đã mệt. Bạn có thể viết ra giấy những việc ngày mai trước khi ngủ để bớt phải giữ trong đầu, hoặc thử bài Nhật ký suy nghĩ khi thấy lo âu dâng cao.',
        suggestedExerciseId: 'thought-record',
        repliedAt: '2026-11-16T13:20:00+07:00',
      },
    },
    {
      id: 'seed-post-7',
      title: 'Cảm thấy lạc lõng khi chuyển ra ở trọ một mình',
      content:
        'Năm hai mình chuyển ra ở riêng gần trường cho tiện đi học. Ban đầu thấy tự do, nhưng mấy tuần nay buổi tối về phòng yên ắng quá lại thấy trống trải.',
      topic: 'other',
      isAnonymous: true,
      authorName: 'Một bạn sinh viên',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-15T21:15:00+07:00',
      sampleReply: {
        counselorId: 'counselor-lan-anh',
        counselorName: 'Cô Lan Anh',
        content:
          'Nhịp chuyển sang sống một mình thường đi kèm cảm giác lạ lẫm vào buổi tối. Việc bạn nhận ra nỗi trống trải ấy là một tín hiệu tự nhiên để mình kết nối lại với bạn bè hoặc gia đình. Nếu muốn, bạn có thể thử đặt một lịch trò chuyện 1-1 để chia sẻ thêm.',
        suggestedExerciseId: 'emotion-awareness',
        repliedAt: '2026-11-16T08:50:00+07:00',
      },
    },
    {
      id: 'seed-post-8',
      title: 'Sợ chọn sai định hướng thực tập năm ba',
      content:
        'Thấy nhiều bạn quanh mình đã đi làm thêm đúng ngành từ sớm, còn mình vẫn chưa chắc muốn theo biên dịch hay giảng dạy.',
      topic: 'study',
      isAnonymous: false,
      authorName: 'Tuấn Kiệt',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-19T08:30:00+07:00',
    },
    {
      id: 'seed-post-9',
      title: 'Khó nói "không" khi bạn nhờ làm hộ phần việc nhóm',
      content:
        'Mình hay nhận làm thêm phần của bạn vì ngại mất lòng, nhưng xong rồi lại thấy ấm ức và mệt vì dồn hết bài của mình sang cuối tuần.',
      topic: 'relationships',
      isAnonymous: true,
      authorName: 'Một bạn sinh viên',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-19T13:45:00+07:00',
    },
  ],
  replyTemplatesByTopic: {
    study: {
      counselorId: 'counselor-minh-thu',
      counselorName: 'Cô Minh Thư',
      content:
        'Cảm ơn bạn đã chia sẻ thẳng thắn về áp lực học tập hiện tại. Khi kỳ vọng và khối lượng bài vở dồn lại, mình rất dễ tự đánh giá khắt khe với bản thân. Bạn có thể thử bài Tái cấu trúc suy nghĩ để nhìn lại phần việc nào nằm trong tầm kiểm soát ngay tuần này, hoặc đặt lịch hẹn để trao đổi kỹ hơn nhé.',
      suggestedExerciseId: 'thought-reframing',
    },
    relationships: {
      counselorId: 'counselor-hoang-nam',
      counselorName: 'Thầy Hoàng Nam',
      content:
        'Những vướng mắc trong giao tiếp với bạn bè hay nhóm học tập thường khiến mình suy nghĩ rất nhiều. Trước khi tự trách mình hoặc đoán ý người khác, bạn thử đi qua bài Nhận diện sai lệch nhận thức để xem góc nhìn khách quan hơn nhé. Bạn cũng có thể thử đặt lịch 1-1 nếu muốn chuẩn bị cho một cuộc trò chuyện thẳng thắn.',
      suggestedExerciseId: 'distortion-spotter',
    },
    'anxiety-stress': {
      counselorId: 'counselor-minh-thu',
      counselorName: 'Cô Minh Thư',
      content:
        'Cảm ơn bạn đã dừng lại viết ra điều đang khiến mình căng thẳng. Lo âu thường làm các kịch bản xấu trông rất thật trong đầu. Bạn có thể thử bài Nhật ký suy nghĩ để đặt suy nghĩ ấy cạnh các bằng chứng thực tế, và nếu cần thêm không gian lắng nghe, bạn có thể thử đặt lịch hẹn với giảng viên.',
      suggestedExerciseId: 'thought-record',
    },
    family: {
      counselorId: 'counselor-hoang-nam',
      counselorName: 'Thầy Hoàng Nam',
      content:
        'Áp lực từ sự kỳ vọng của gia đình vừa có tình thương vừa dễ tạo cảm giác nặng vai. Bạn không cần phải giải quyết mọi mâu thuẫn chỉ trong một ngày. Thử dành vài phút với bài Tái cấu trúc suy nghĩ để tách giữa mong muốn của gia đình và bước đi vừa sức của bạn lúc này nhé.',
      suggestedExerciseId: 'thought-reframing',
    },
    other: {
      counselorId: 'counselor-lan-anh',
      counselorName: 'Cô Lan Anh',
      content:
        'Cảm ơn bạn đã tin tưởng ghi lại suy nghĩ của mình ở đây. Đôi khi chỉ riêng việc gọi tên điều đang làm mình bận lòng đã giúp đầu óc nhẹ hơn một chút. Bạn có thể thử bài Nhật ký suy nghĩ để sắp xếp lại dòng suy nghĩ hiện tại hoặc xem qua danh sách giảng viên để thử đặt lịch hẹn 1-1.',
      suggestedExerciseId: 'thought-record',
    },
  },
};
