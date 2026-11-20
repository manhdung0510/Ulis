import type { ConsultContent } from '@/content/vi/consult';

export const consultContentEn: ConsultContent = {
  status: 'draft-needs-review',
  counselors: [
    {
      id: 'counselor-minh-thu',
      name: 'Ms. Minh Thu',
      title: 'Lecturer, Faculty of Psychology & Liberal Education',
      initials: 'MT',
      avatarTone: 'primary',
      focusAreas: [
        'Presentation & exam anxiety',
        'Language-learning pressure',
        'First-year transition',
      ],
      formats: ['in-person', 'online'],
      bio: 'Supports students in noticing self-pressuring thoughts and building a sustainable study pace.',
      status: 'draft-needs-review',
    },
    {
      id: 'counselor-hoang-nam',
      name: 'Mr. Hoang Nam',
      title: 'Lecturer, Faculty of Psychology & Liberal Education',
      initials: 'HN',
      avatarTone: 'secondary',
      focusAreas: [
        'Peer & group-work communication',
        'Family expectations',
        'Everyday stress management',
      ],
      formats: ['in-person', 'online'],
      bio: 'Listens to student concerns around friendships, teamwork dynamics, and personal direction in university life.',
      status: 'draft-needs-review',
    },
    {
      id: 'counselor-lan-anh',
      name: 'Ms. Lan Anh',
      title: 'Lecturer, Faculty of Psychology & Liberal Education',
      initials: 'LA',
      avatarTone: 'sand',
      focusAreas: [
        'Emotional fatigue & overwhelm',
        'Harsh self-criticism',
        'Self-care routines',
      ],
      formats: ['online', 'in-person'],
      bio: 'Helps students slow down when feeling drained and practice a kinder, steadier inner dialogue.',
      status: 'draft-needs-review',
    },
  ],
  seedPosts: [
    {
      id: 'seed-post-1',
      title: 'My voice shakes every time I present in English',
      content:
        'Whenever I stand in front of the class to speak English, my heart races. The moment I forget one word, I feel like everyone thinks I am incompetent.',
      topic: 'anxiety-stress',
      isAnonymous: true,
      authorName: 'A fellow student',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-18T09:15:00+07:00',
      sampleReply: {
        counselorId: 'counselor-minh-thu',
        counselorName: 'Ms. Minh Thu',
        content:
          'Feeling nervous before speaking a foreign language is very common among students. Forgetting one word can quickly feel like "everyone is judging me". You might try the Thought Record exercise to separate a brief pause from your overall ability, or preview booking a 1-on-1 session.',
        suggestedExerciseId: 'thought-record',
        repliedAt: '2026-11-18T11:30:00+07:00',
      },
    },
    {
      id: 'seed-post-2',
      title: 'Left out of my usual group for a final project',
      content:
        'We formed project teams this week, and my close friends already filled their group. I keep wondering if they secretly dislike working with me.',
      topic: 'relationships',
      isAnonymous: false,
      authorName: 'Minh Anh',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-18T14:20:00+07:00',
      sampleReply: {
        counselorId: 'counselor-hoang-nam',
        counselorName: 'Mr. Hoang Nam',
        content:
          'It is natural to feel hurt when group sign-ups fill before you join. Often team placement comes down to headcount caps or class schedules rather than a judgment on you. Try Spotting Cognitive Distortions to check whether mind reading is sneaking in.',
        suggestedExerciseId: 'distortion-spotter',
        repliedAt: '2026-11-18T16:10:00+07:00',
      },
    },
    {
      id: 'seed-post-3',
      title: 'Stressed by family expectations for a scholarship this term',
      content:
        'My parents often ask about scholarships and compare me with relatives. I love them, yet the more they ask, the harder it gets to focus.',
      topic: 'family',
      isAnonymous: true,
      authorName: 'A fellow student',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-17T20:05:00+07:00',
      sampleReply: {
        counselorId: 'counselor-hoang-nam',
        counselorName: 'Mr. Hoang Nam',
        content:
          'Carrying family hopes alongside university coursework can feel heavy. The Thought Reframing exercise may help separate what is within your control today from the fear of letting people down.',
        suggestedExerciseId: 'thought-reframing',
        repliedAt: '2026-11-18T08:40:00+07:00',
      },
    },
    {
      id: 'seed-post-4',
      title: 'Listening scores in my second foreign language stay low',
      content:
        'I practice listening almost an hour every evening, yet my quiz scores stay around 6/10. Sometimes I feel like giving up because I lack talent.',
      topic: 'study',
      isAnonymous: false,
      authorName: 'Hai Dang',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-17T15:30:00+07:00',
      sampleReply: {
        counselorId: 'counselor-minh-thu',
        counselorName: 'Ms. Minh Thu',
        content:
          'Plateaus early in language study can easily trigger harsh labels like "no talent". Try Thought Reframing to recognize the consistency you have already shown, and consider asking your course lecturer for targeted listening feedback.',
        suggestedExerciseId: 'thought-reframing',
        repliedAt: '2026-11-17T17:45:00+07:00',
      },
    },
    {
      id: 'seed-post-5',
      title: 'Classmate read my project message and did not reply',
      content:
        'I asked about slide assignments this morning; it says Seen with no reply. All afternoon I worried I said something annoying.',
      topic: 'relationships',
      isAnonymous: true,
      authorName: 'A fellow student',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-16T17:10:00+07:00',
      sampleReply: {
        counselorId: 'counselor-lan-anh',
        counselorName: 'Ms. Lan Anh',
        content:
          'When a message sits on Seen, our minds quickly fill the silence with self-doubt. In reality, people often read quickly between classes and mean to reply later. Spotting Cognitive Distortions can help loosen that assumption.',
        suggestedExerciseId: 'distortion-spotter',
        repliedAt: '2026-11-16T19:00:00+07:00',
      },
    },
    {
      id: 'seed-post-6',
      title: 'Exhausted near finals but cannot fall asleep early',
      content:
        'I work on deadlines late every night, and even when I lie down my head keeps spinning through tomorrow’s tasks.',
      topic: 'anxiety-stress',
      isAnonymous: false,
      authorName: 'Thanh Ha',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-16T10:00:00+07:00',
      sampleReply: {
        counselorId: 'counselor-lan-anh',
        counselorName: 'Ms. Lan Anh',
        content:
          'When your mind stays in planning mode all evening, your body struggles to wind down even when tired. Writing tomorrow’s tasks onto paper before bed—or trying a Thought Record for racing worries—can help create some calm.',
        suggestedExerciseId: 'thought-record',
        repliedAt: '2026-11-16T13:20:00+07:00',
      },
    },
    {
      id: 'seed-post-7',
      title: 'Feeling lonely after moving into a solo room',
      content:
        'I moved closer to campus this year. At first I liked the independence, yet coming back to a quiet room every evening lately feels unexpectedly hollow.',
      topic: 'other',
      isAnonymous: true,
      authorName: 'A fellow student',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-15T21:15:00+07:00',
      sampleReply: {
        counselorId: 'counselor-lan-anh',
        counselorName: 'Ms. Lan Anh',
        content:
          'Adjusting to living alone often brings quiet waves of loneliness in the evening. Noticing that feeling gently is a natural cue to reach out to friends or family. You can also explore the 1-on-1 booking flow if you want to try scheduling a talk.',
        suggestedExerciseId: 'emotion-awareness',
        repliedAt: '2026-11-16T08:50:00+07:00',
      },
    },
    {
      id: 'seed-post-8',
      title: 'Worried about picking the wrong internship direction',
      content:
        'Many classmates already have part-time gigs in translation or teaching, while I still feel torn between the two tracks.',
      topic: 'study',
      isAnonymous: false,
      authorName: 'Tuan Kiet',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-19T08:30:00+07:00',
    },
    {
      id: 'seed-post-9',
      title: 'Hard to say no when friends ask me to cover their slides',
      content:
        'I often take on extra group work so nobody gets upset, then end up feeling resentful and stretched thin over the weekend.',
      topic: 'relationships',
      isAnonymous: true,
      authorName: 'A fellow student',
      isMine: false,
      isSampleSeed: true,
      createdAt: '2026-11-19T13:45:00+07:00',
    },
  ],
  replyTemplatesByTopic: {
    study: {
      counselorId: 'counselor-minh-thu',
      counselorName: 'Ms. Minh Thu',
      content:
        'Thank you for sharing honestly about academic pressure right now. When expectations and coursework pile up, it is easy to judge yourself harshly. Try the Thought Reframing exercise to sort out what is within your reach this week, or explore booking a 1-on-1 session.',
      suggestedExerciseId: 'thought-reframing',
    },
    relationships: {
      counselorId: 'counselor-hoang-nam',
      counselorName: 'Mr. Hoang Nam',
      content:
        'Tension with friends or project teammates can take up a lot of mental space. Before assuming the worst, try Spotting Cognitive Distortions to look at alternative explanations, or preview a 1-on-1 session to practice a calm conversation.',
      suggestedExerciseId: 'distortion-spotter',
    },
    'anxiety-stress': {
      counselorId: 'counselor-minh-thu',
      counselorName: 'Ms. Minh Thu',
      content:
        'Thank you for taking a moment to put what feels stressful into words. Anxiety often makes worst-case stories sound very convincing. Try the Thought Record exercise to weigh the facts gently, or try the booking flow if you would like a space to talk.',
      suggestedExerciseId: 'thought-record',
    },
    family: {
      counselorId: 'counselor-hoang-nam',
      counselorName: 'Mr. Hoang Nam',
      content:
        'Family expectations often mix care with heavy pressure. You do not have to resolve everything in a single day. Spend a few minutes with Thought Reframing to separate family hopes from one manageable step for yourself right now.',
      suggestedExerciseId: 'thought-reframing',
    },
    other: {
      counselorId: 'counselor-lan-anh',
      counselorName: 'Ms. Lan Anh',
      content:
        'Thank you for trusting this space with what is on your mind. Simply naming what weighs on you can create a little room to breathe. You might try the Thought Record exercise or browse the counselors to try the booking flow.',
      suggestedExerciseId: 'thought-record',
    },
  },
};
