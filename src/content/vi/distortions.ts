import type { ContentStatus } from '@/types/domain';

export interface DistortionItem {
  id: string;
  name: string;
  description: string;
  example: string;
  promptQuestion: string;
}

export interface DistortionsContent {
  status: ContentStatus;
  items: DistortionItem[];
}

export const distortionsVi: DistortionsContent = {
  status: 'placeholder',
  items: [
    {
      id: 'all-or-nothing',
      name: 'Tư duy tất cả hoặc không có gì',
      description:
        'Nhìn mọi chuyện theo hai cực trắng – đen, chỉ thấy thành công trọn vẹn hoặc thất bại hoàn toàn mà bỏ qua khoảng giữa.',
      example:
        'Bài thuyết trình tiếng Anh bị vấp hai chỗ, thế là mình nghĩ: "Hỏng hết rồi, mình làm tệ quá."',
      promptQuestion:
        'Nếu chấm trên thang 10 thay vì "đạt hoặc hỏng", phần nào trong việc này vẫn ổn?',
    },
    {
      id: 'overgeneralization',
      name: 'Khái quát hóa quá mức',
      description:
        'Từ một sự việc không như ý, mình rút ra kết luận rằng mọi chuyện sau này đều sẽ như vậy mãi.',
      example:
        'Điểm kiểm tra giữa kỳ thấp hơn kỳ vọng nên mình nghĩ: "Môn này chắc mình chẳng bao giờ học khá nổi."',
      promptQuestion:
        'Đây là một sự việc riêng lẻ hay thật sự lúc nào cũng xảy ra y hệt như vậy?',
    },
    {
      id: 'mental-filter',
      name: 'Lọc tiêu cực',
      description:
        'Chỉ tập trung vào một chi tiết chưa tốt và phóng lớn nó lên, làm lu mờ những phần tích cực xung quanh.',
      example:
        'Cô giáo khen bài viết mạch lạc nhưng góp ý sửa hai lỗi ngữ pháp, cả tối mình chỉ nghĩ về hai lỗi đó.',
      promptQuestion:
        'Ngoài chi tiết làm mình bận tâm, bức tranh đầy đủ hôm nay còn có những phần nào khác?',
    },
    {
      id: 'disqualifying-positive',
      name: 'Phủ nhận điều tích cực',
      description:
        'Tự gạt bỏ lời khen hoặc kết quả tốt của bản thân bằng cách cho rằng đó chỉ là may mắn hay chuyện nhỏ.',
      example:
        'Bạn cùng nhóm khen phần slide mình làm gọn gàng, mình lại đáp: "Có gì đâu, làm đại thôi mà."',
      promptQuestion:
        'Nếu một người bạn làm được đúng điều đó, mình có xem nhẹ công sức của bạn ấy không?',
    },
    {
      id: 'jumping-to-conclusions',
      name: 'Suy diễn vội vàng (đọc suy nghĩ / tiên đoán tương lai)',
      description:
        'Tự đoán chắc người khác đang nghĩ xấu về mình hoặc dự báo kết quả tệ khi chưa có bằng chứng rõ ràng.',
      example:
        'Nhắn tin hỏi bài tập nhóm từ trưa chưa thấy bạn trả lời, mình nghĩ ngay: "Chắc bạn ấy thấy mình phiền."',
      promptQuestion:
        'Còn những lý do bình thường nào khác có thể giải thích chuyện này mà mình chưa biết?',
    },
    {
      id: 'magnification-catastrophizing',
      name: 'Phóng đại hoặc coi nhẹ (thảm họa hóa)',
      description:
        'Thổi phồng một sai sót nhỏ thành thảm họa lớn, đồng thời thu nhỏ khả năng xoay xở của bản thân.',
      example:
        'Lỡ gửi nhầm file nháp cho giảng viên, mình hoảng lên nghĩ: "Chắc bị đánh rớt môn này mất."',
      promptQuestion:
        'Kể cả khi tình huống xấu xảy ra thật, bước nhỏ tiếp theo mình có thể làm để sửa là gì?',
    },
    {
      id: 'emotional-reasoning',
      name: 'Lập luận theo cảm xúc',
      description:
        'Tin rằng cảm xúc mình đang trải qua chính là sự thật khách quan về bản thân hoặc tình huống.',
      example:
        'Hôm nay thấy nặng nề và lo âu nên mình kết luận: "Mình thật sự vô dụng."',
      promptQuestion:
        'Cảm xúc này đang nói với mình điều gì, và dữ kiện thực tế có hoàn toàn giống vậy không?',
    },
    {
      id: 'should-statements',
      name: 'Tư duy "phải / nên"',
      description:
        'Đặt ra những quy tắc cứng nhắc cho bản thân hoặc người khác bằng chữ "phải", "lẽ ra", dễ tạo cảm giác tội lỗi hay bực bội.',
      example:
        'Mình luôn tự nhủ: "Sinh viên năm hai rồi thì phải tự tin nói trước lớp, không được run."',
      promptQuestion:
        'Nếu đổi chữ "phải" thành "mình mong muốn" hoặc "mình đang tập", áp lực có dịu bớt không?',
    },
    {
      id: 'labeling',
      name: 'Gán nhãn',
      description:
        'Dán một nhãn tiêu cực cố định lên bản thân hoặc người khác chỉ vì một hành động hay khoảnh khắc chưa trọn vẹn.',
      example:
        'Quên mang tài liệu thảo luận nhóm, mình tự gọi mình là "đứa cẩu thả".',
      promptQuestion:
        'Mình đang mô tả một hành động cụ thể vừa xảy ra, hay đang gắn nhãn cho cả con người mình?',
    },
    {
      id: 'personalization',
      name: 'Cá nhân hóa',
      description:
        'Tự nhận toàn bộ trách nhiệm về một chuyện ngoài tầm kiểm soát hoặc nghĩ phản ứng của người khác là do lỗi của mình.',
      example:
        'Không khí buổi họp nhóm hơi trầm lắng, mình liền nghĩ: "Chắc tại mình nói câu lúc nãy nên mọi người mới im."',
      promptQuestion:
        'Trong chuyện này có những yếu tố nào khác không thuộc về mình?',
    },
  ],
};
