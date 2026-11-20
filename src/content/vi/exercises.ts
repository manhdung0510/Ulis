import type { ContentStatus } from '@/types/domain';

export interface EmotionGroupOption {
  id: string;
  label: string;
  description: string;
  words: string[];
}

export interface ExercisesContent {
  status: ContentStatus;
  thoughtRecord: {
    steps: {
      situation: {
        title: string;
        instruction: string;
        label: string;
        placeholder: string;
        example: string;
      };
      thoughtEmotion: {
        title: string;
        instruction: string;
        thoughtLabel: string;
        thoughtPlaceholder: string;
        emotionLabel: string;
        intensityLabel: string;
        example: string;
      };
      distortions: {
        title: string;
        instruction: string;
        unsureLabel: string;
        unsureDescription: string;
        example: string;
      };
      evidence: {
        title: string;
        instruction: string;
        forLabel: string;
        forPlaceholder: string;
        againstLabel: string;
        againstPlaceholder: string;
        example: string;
      };
      reframe: {
        title: string;
        instruction: string;
        balancedLabel: string;
        balancedPlaceholder: string;
        afterIntensityLabel: string;
        example: string;
      };
    };
  };
  distortionSpotter: {
    steps: {
      thought: {
        title: string;
        instruction: string;
        label: string;
        placeholder: string;
        example: string;
      };
      pickDistortion: {
        title: string;
        instruction: string;
        unsureLabel: string;
        unsureDescription: string;
        example: string;
      };
      reflect: {
        title: string;
        instruction: string;
        unsureExplain: string;
        unsureQuestion: string;
        noteLabel: string;
        notePlaceholder: string;
        example: string;
      };
    };
  };
  thoughtReframing: {
    questions: Array<{ id: string; label: string; helper: string }>;
    steps: {
      thought: {
        title: string;
        instruction: string;
        label: string;
        placeholder: string;
        intensityLabel: string;
        example: string;
      };
      pickQuestions: {
        title: string;
        instruction: string;
        limitHint: string;
        maxError: string;
        example: string;
      };
      rewrite: {
        title: string;
        instruction: string;
        selectedPromptsHeading: string;
        label: string;
        placeholder: string;
        example: string;
      };
      afterIntensity: {
        title: string;
        instruction: string;
        label: string;
        example: string;
      };
    };
  };
  emotionAwareness: {
    groups: EmotionGroupOption[];
    bodySensations: Array<{ id: string; label: string }>;
    steps: {
      group: {
        title: string;
        instruction: string;
        example: string;
      };
      words: {
        title: string;
        instruction: string;
        example: string;
      };
      body: {
        title: string;
        instruction: string;
        example: string;
      };
      context: {
        title: string;
        instruction: string;
        label: string;
        placeholder: string;
        example: string;
      };
    };
    summaryTemplatePrefix: string;
  };
}

export const exercisesContentVi: ExercisesContent = {
  status: 'placeholder',
  thoughtRecord: {
    steps: {
      situation: {
        title: '1. Tình huống vừa xảy ra',
        instruction:
          'Mô tả ngắn gọn sự việc khách quan như một chiếc máy quay ghi lại: chuyện gì xảy ra, ở đâu, lúc nào, với ai.',
        label: 'Tình huống',
        placeholder:
          'Ví dụ: Sáng thứ Tư, trước giờ thuyết trình môn Kỹ năng nói, mình thấy tim đập nhanh và quên mất ý mở đầu...',
        example:
          'Chiều qua khi xem điểm bài kiểm tra giữa kỳ, mình được 6.5 trong khi đặt mục tiêu 8.0. Lúc đó mình đang ngồi ở thư viện một mình.',
      },
      thoughtEmotion: {
        title: '2. Suy nghĩ tự động và cảm xúc',
        instruction:
          'Ngay khoảnh khắc đó, câu nói nào thoáng qua trong đầu bạn? Bạn cảm thấy cảm xúc nào rõ nhất và ở mức độ nào?',
        thoughtLabel: 'Điều thoáng qua trong đầu mình',
        thoughtPlaceholder: 'Ví dụ: "Mình học kém quá, kiểu này cuối kỳ chắc trượt mất..."',
        emotionLabel: 'Cảm xúc nổi bật nhất lúc đó',
        intensityLabel: 'Mức độ cảm xúc ban đầu (1–5)',
        example:
          'Suy nghĩ: "Mình học hành chán quá, chẳng tiến bộ nổi." Cảm xúc: Lo lắng (mức 4/5).',
      },
      distortions: {
        title: '3. Nhận diện sai lệch nhận thức',
        instruction:
          'Thử xem suy nghĩ vừa viết có mang nét của kiểu suy nghĩ quen thuộc nào dưới đây không. Bạn có thể chọn nhiều mục hoặc chọn "Mình chưa chắc".',
        unsureLabel: 'Mình chưa chắc',
        unsureDescription: 'Không sao cả nếu lúc này bạn chưa muốn gắn tên cho suy nghĩ đó.',
        example:
          'Với câu "Mình chẳng tiến bộ nổi" chỉ sau một bài kiểm tra, mình có thể đang "Khái quát hóa quá mức" hoặc "Tư duy tất cả hoặc không có gì".',
      },
      evidence: {
        title: '4. Kiểm chứng bằng chứng thực tế',
        instruction:
          'Đặt suy nghĩ ấy lên bàn cân giống một người quan sát công bằng: điều gì ủng hộ nó và điều gì cho thấy bức tranh rộng hơn?',
        forLabel: 'Điều gì khiến mình tin suy nghĩ đó? (không bắt buộc)',
        forPlaceholder: 'Ví dụ: Điểm lần này thấp hơn mục tiêu mình đặt ra...',
        againstLabel: 'Điều gì cho thấy suy nghĩ đó chưa hẳn là toàn bộ sự thật?',
        againstPlaceholder:
          'Ví dụ: Hai tuần trước bài nói nhóm mình vẫn làm tốt; môn này mình mới đổi cách học nên cần thêm thời gian...',
        example:
          'Ủng hộ: Điểm 6.5 thấp hơn kỳ vọng. Không ủng hộ: Mình vẫn qua môn và phần phát âm của mình được cô khen tiến bộ hơn đầu kỳ.',
      },
      reframe: {
        title: '5. Viết lại suy nghĩ cân bằng hơn',
        instruction:
          'Kết hợp cả hai vế vừa tìm được để viết một câu công bằng, thực tế và tử tế hơn với chính mình. Sau đó đánh giá lại mức độ cảm xúc.',
        balancedLabel: 'Suy nghĩ cân bằng hơn',
        balancedPlaceholder:
          'Ví dụ: "Điểm 6.5 chưa như mình mong muốn, nhưng nó cho mình biết phần nào cần ôn lại chứ không có nghĩa là mình kém."',
        afterIntensityLabel: 'Mức độ cảm xúc sau khi viết lại (1–5)',
        example:
          '"Kết quả này chưa cao như mình kỳ vọng, nhưng một bài giữa kỳ không quyết định cả quá trình. Mình có thể hỏi lại bạn bè hoặc giảng viên phần mình hay nhầm."',
      },
    },
  },
  distortionSpotter: {
    steps: {
      thought: {
        title: '1. Ghi lại một suy nghĩ đang làm bạn nặng lòng',
        instruction:
          'Viết nguyên văn câu nói hoặc suy nghĩ cứ lặp lại trong đầu bạn lúc này.',
        label: 'Suy nghĩ mình muốn soi lại',
        placeholder: 'Ví dụ: "Nhắn tin mà bạn ấy không trả lời chắc là bạn ấy giận mình rồi."',
        example:
          '"Hôm nay cả nhóm im lặng khi mình góp ý, chắc mọi người thấy ý tưởng của mình ngớ ngẩn."',
      },
      pickDistortion: {
        title: '2. Kiểu suy nghĩ nào nghe gần giống nhất?',
        instruction:
          'Đọc lướt qua 10 kiểu suy nghĩ thường gặp và chọn một kiểu bạn thấy gần với câu vừa viết nhất.',
        unsureLabel: 'Mình chưa chắc',
        unsureDescription: 'Mình vẫn muốn xem một câu hỏi gợi mở nhẹ nhàng để suy nghĩ tiếp.',
        example:
          'Khi tự đoán người khác đang nghĩ gì về mình mà chưa hỏi lại, đó thường là "Suy diễn vội vàng".',
      },
      reflect: {
        title: '3. Gợi ý nhìn lại nhẹ nhàng',
        instruction: 'Đọc mô tả ngắn và thử tự trả lời câu hỏi gợi mở bên dưới nếu bạn muốn.',
        unsureExplain:
          'Không cần gọi tên chính xác ngay cũng không sao. Điều quan trọng là bạn đã dừng lại để nhìn suy nghĩ như một ý nghĩ thoáng qua, chứ chưa hẳn là sự thật.',
        unsureQuestion:
          'Nếu nhìn lại chuyện này sau một giấc ngủ ngon, điều gì vẫn là sự thật khách quan và điều gì chỉ là phỏng đoán?',
        noteLabel: 'Vài dòng suy ngẫm thêm (không bắt buộc)',
        notePlaceholder: 'Ví dụ: Có thể lúc họp nhóm mọi người đang mệt hoặc bận ghi chép...',
        example:
          'Bạn có thể viết 1–2 câu ngắn ghi lại góc nhìn khác mà bạn vừa nhận ra.',
      },
    },
  },
  thoughtReframing: {
    questions: [
      {
        id: 'evidence',
        label: 'Bằng chứng thật sự là gì?',
        helper: 'Có dữ kiện cụ thể nào chứng minh suy nghĩ này đúng 100%, hay chỉ là cảm giác lo lắng?',
      },
      {
        id: 'friend',
        label: 'Nếu bạn thân gặp chuyện này, bạn sẽ nói gì?',
        helper: 'Mình thường tử tế và thực tế với bạn bè hơn rất nhiều so với chính mình.',
      },
      {
        id: 'outcomes',
        label: 'Điều tệ nhất, tốt nhất và dễ xảy ra nhất là gì?',
        helper: 'Tách kịch bản thực tế ra khỏi kịch bản thảm họa hóa trong đầu.',
      },
      {
        id: 'time-zoom',
        label: 'Một tháng hoặc sáu tháng nữa nhìn lại thì sao?',
        helper: 'Khoảng cách thời gian giúp nhìn rõ mức độ quan trọng thật sự của sự việc.',
      },
      {
        id: 'control',
        label: 'Phần nào mình kiểm soát được, phần nào thì không?',
        helper: 'Đặt năng lượng vào một bước nhỏ trong tầm tay thay vì tự trách chuyện ngoài ý muốn.',
      },
    ],
    steps: {
      thought: {
        title: '1. Suy nghĩ bạn muốn xem lại',
        instruction:
          'Viết xuống một suy nghĩ khiến bạn căng thẳng hoặc mất tự tin hôm nay, và chọn mức độ cảm xúc hiện tại.',
        label: 'Suy nghĩ cần xem lại',
        placeholder:
          'Ví dụ: "Gia đình kỳ vọng nhiều mà mình cứ chậm chạp thế này, chắc làm mọi người thất vọng."',
        intensityLabel: 'Mức độ cảm xúc hiện tại (1–5)',
        example:
          '"Bạn cùng phòng học giỏi tiếng Anh quá, còn mình nói mãi vẫn vấp, chắc mình không hợp ngành này."',
      },
      pickQuestions: {
        title: '2. Chọn 1–3 câu hỏi để nhìn từ góc khác',
        instruction:
          'Chọn từ 1 đến 3 câu hỏi bạn thấy dễ trả lời nhất cho tình huống lúc này.',
        limitHint: 'Chọn tối thiểu 1 và tối đa 3 câu hỏi.',
        maxError: 'Bạn chọn tối đa 3 câu hỏi để tránh bị ngợp nhé.',
        example:
          'Nhiều bạn sinh viên thấy câu "Nếu bạn thân gặp chuyện này, mình sẽ nói gì?" rất dễ mở nút thắt.',
      },
      rewrite: {
        title: '3. Viết lại một suy nghĩ cân bằng hơn',
        instruction:
          'Dựa vào các câu hỏi bạn vừa chọn, thử diễn đạt lại suy nghĩ ban đầu theo hướng công bằng và có ích hơn.',
        selectedPromptsHeading: 'Câu hỏi bạn đã chọn để gợi ý',
        label: 'Suy nghĩ mới cân bằng hơn',
        placeholder:
          'Ví dụ: "Mỗi người có xuất phát điểm và tốc độ khác nhau. Việc mình còn vấp nghĩa là mình đang luyện tập, không phải không hợp."',
        example:
          '"Bố mẹ lo cho mình nên mới hay hỏi han. Mình vẫn đang cố gắng từng bước theo lịch của mình."',
      },
      afterIntensity: {
        title: '4. Nhìn lại cảm xúc lúc này',
        instruction:
          'Sau khi thử viết lại, cảm giác căng thẳng hoặc nặng lòng ban đầu hiện ở mức nào? (Không sao nếu mức độ chưa giảm ngay.)',
        label: 'Mức độ cảm xúc hiện tại (1–5)',
        example:
          'Đôi khi cảm xúc chỉ dịu đi 1 bậc từ 4 xuống 3, như vậy cũng đã là một khoảng thở đáng kể.',
      },
    },
  },
  emotionAwareness: {
    groups: [
      {
        id: 'calm-warm',
        label: 'Dễ chịu / Bình yên',
        description: 'Cảm giác nhẹ nhõm, an tâm, hài lòng hoặc biết ơn.',
        words: ['Bình yên', 'Nhẹ nhõm', 'Ấm áp', 'Hài lòng', 'Tò mò', 'Biết ơn', 'Thư thái'],
      },
      {
        id: 'anxious-tense',
        label: 'Lo âu / Bồn chồn',
        description: 'Cảm giác hồi hộp, bất an, đứng ngồi không yên hoặc sợ sai.',
        words: ['Hồi hộp', 'Bồn chồn', 'Bất an', 'Áp lực', 'Ngợp', 'Sợ bị đánh giá', 'Căng như dây đàn'],
      },
      {
        id: 'heavy-sad',
        label: 'Trùng xuống / Buồn',
        description: 'Cảm giác hụt hẫng, cô đơn, thất vọng hoặc thiếu năng lượng.',
        words: ['Hụt hẫng', 'Cô đơn', 'Tủi thân', 'Thất vọng', 'Chán nản', 'Trống rỗng', 'Nhớ nhà'],
      },
      {
        id: 'frustrated-angry',
        label: 'Bực bội / Khó chịu',
        description: 'Cảm giác ấm ức, cáu kỉnh, bất lực hoặc thấy không công bằng.',
        words: ['Ấm ức', 'Cáu kỉnh', 'Bất lực', 'Bực mình', 'Thất vọng vì người khác', 'Căng thẳng'],
      },
      {
        id: 'tired-confused',
        label: 'Mệt mỏi / Bối rối',
        description: 'Cảm giác cạn pin, mất phương hướng, khó tập trung hoặc lưng chừng.',
        words: ['Cạn năng lượng', 'Buồn ngủ', 'Lơ mơ', 'Lúng túng', 'Phân vân', 'Quá tải'],
      },
    ],
    bodySensations: [
      { id: 'shoulders', label: 'Vai hoặc cổ hơi căng cứng' },
      { id: 'heartbeat', label: 'Tim đập nhanh hoặc thình thịch' },
      { id: 'chest', label: 'Nặng hoặc tức nhẹ ở ngực' },
      { id: 'stomach', label: 'Bụng cồn cào hoặc thắt lại' },
      { id: 'head', label: 'Đầu nặng hoặc khó tập trung' },
      { id: 'breath', label: 'Hơi thở nông, ngắn' },
      { id: 'relaxed', label: 'Cơ thể thả lỏng, thở đều' },
      { id: 'unsure-body', label: 'Mình chưa cảm nhận rõ ở cơ thể' },
    ],
    steps: {
      group: {
        title: '1. Chọn nhóm cảm xúc gần với bạn nhất',
        instruction: 'Bắt đầu từ một vùng rộng trước khi tìm từ chính xác hơn.',
        example: 'Ví dụ trước ngày nộp bài cuối kỳ, bạn có thể thấy gần nhóm "Lo âu / Bồn chồn".',
      },
      words: {
        title: '2. Gọi tên cụ thể hơn',
        instruction: 'Chọn một hoặc vài từ mô tả sát nhất cảm giác bên trong bạn lúc này.',
        example: 'Thay vì chỉ gọi là "buồn", đôi khi mình thật ra đang thấy "hụt hẫng" và "tủi thân".',
      },
      body: {
        title: '3. Cơ thể đang báo hiệu điều gì?',
        instruction:
          'Quan sát nhanh từ đầu xuống chân xem cảm xúc này đang nằm ở đâu trong cơ thể (chọn nhiều mục nếu có).',
        example: 'Nhiều bạn nhận ra khi lo lắng thì hai vai nhô lên và hơi thở ngắn hơn bình thường.',
      },
      context: {
        title: '4. Điều gì liên quan đến cảm xúc này?',
        instruction: 'Viết ngắn gọn hoàn cảnh hoặc điều vừa diễn ra khiến cảm xúc này xuất hiện.',
        label: 'Điều liên quan lúc này',
        placeholder:
          'Ví dụ: Từ sáng đến giờ mình học liên tục 3 ca mà vẫn chưa xong phần đọc tài liệu...',
        example: 'Vừa gọi điện về nhà và nghe nhắc chuyện thực tập năm ba nên đầu óc hơi rối.',
      },
    },
    summaryTemplatePrefix: 'Mình đang cảm thấy',
  },
};
