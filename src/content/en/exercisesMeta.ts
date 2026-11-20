import type { ExercisesMetaContent } from '@/content/vi/exercisesMeta';

export const exercisesMetaEn: ExercisesMetaContent = {
  status: 'draft-needs-review',
  items: {
    'thought-record': {
      id: 'thought-record',
      title: 'Thought Record',
      shortDescription: 'Walk through 5 structured steps from situation and emotion to a more balanced thought.',
      estimatedMinutes: 8,
      notebookReference: 'Matches the Thought Record section in the Họa notebook',
    },
    'distortion-spotter': {
      id: 'distortion-spotter',
      title: 'Spotting Cognitive Distortions',
      shortDescription: 'Notice which common thinking pattern may be coloring a stressful moment in 3 short steps.',
      estimatedMinutes: 4,
      notebookReference: 'Matches the 10 Thinking Patterns reference in Họa',
    },
    'thought-reframing': {
      id: 'thought-reframing',
      title: 'Thought Reframing',
      shortDescription: 'Use 1–3 gentle reflection questions to widen perspective on a sticky thought.',
      estimatedMinutes: 6,
      notebookReference: 'Matches the Reframing worksheet in the Họa notebook',
    },
    'emotion-awareness': {
      id: 'emotion-awareness',
      title: 'Emotion Awareness',
      shortDescription: 'Pinpoint more specific emotion words and notice where sensations show up in your body.',
      estimatedMinutes: 4,
      notebookReference: 'Matches the Emotion Naming section in Họa',
    },
  },
};
