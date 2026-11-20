import type { ExercisesContent } from '@/content/vi/exercises';

export const exercisesContentEn: ExercisesContent = {
  status: 'draft-needs-review',
  thoughtRecord: {
    steps: {
      situation: {
        title: '1. The situation',
        instruction:
          'Briefly describe the objective facts as if a camera recorded them: what happened, where, when, and with whom.',
        label: 'Situation',
        placeholder:
          'For example: Wednesday morning right before my speaking presentation, my heart started racing and I forgot my opening line...',
        example:
          'Yesterday afternoon in the library, I saw my midterm grade was 6.5 when I had aimed for 8.0.',
      },
      thoughtEmotion: {
        title: '2. Automatic thought and emotion',
        instruction:
          'In that moment, what thought flashed through your mind? Which emotion stood out most, and how strong was it?',
        thoughtLabel: 'What went through my mind',
        thoughtPlaceholder: 'For example: "I am terrible at this, I am going to fail the final..."',
        emotionLabel: 'Strongest emotion in that moment',
        intensityLabel: 'Initial emotion intensity (1–5)',
        example: 'Thought: "I am not making any progress." Emotion: Anxious (4/5).',
      },
      distortions: {
        title: '3. Spot thinking patterns',
        instruction:
          'Notice whether the thought above reflects any of these common thinking patterns. Select all that fit, or choose "I\'m not sure yet".',
        unsureLabel: "I'm not sure yet",
        unsureDescription: 'It is completely fine if you do not want to label the thought right now.',
        example:
          'Thinking "I am not making any progress" from one quiz could reflect "Overgeneralization" or "All-or-nothing thinking".',
      },
      evidence: {
        title: '4. Examine the evidence',
        instruction:
          'Look at the thought like a fair observer: what supports it, and what facts point to a fuller picture?',
        forLabel: 'What makes this thought feel true? (optional)',
        forPlaceholder: 'For example: This score was lower than the goal I set...',
        againstLabel: 'What facts show this thought is not the whole truth?',
        againstPlaceholder:
          'For example: My group presentation went well two weeks ago, and I only recently switched study methods...',
        example:
          'For: 6.5 is below my target. Against: I passed comfortably, and my pronunciation got positive feedback earlier this month.',
      },
      reframe: {
        title: '5. Write a more balanced thought',
        instruction:
          'Combine both sides into a statement that is fair, realistic, and kind toward yourself. Then re-rate the emotion intensity.',
        balancedLabel: 'More balanced thought',
        balancedPlaceholder:
          'For example: "A 6.5 is lower than I hoped, and it shows me what to review—it does not mean I am incapable."',
        afterIntensityLabel: 'Emotion intensity after reframing (1–5)',
        example:
          '"This result is not what I aimed for, yet one midterm does not define the whole semester. I can ask my lecturer or a classmate about the parts I missed."',
      },
    },
  },
  distortionSpotter: {
    steps: {
      thought: {
        title: '1. Write down one sticky thought',
        instruction:
          'Put down the exact sentence or thought that keeps circling in your head right now.',
        label: 'Thought I want to examine',
        placeholder: 'For example: "They did not reply to my message, so they must be upset with me."',
        example:
          '"Everyone stayed quiet when I suggested an idea today—they probably think it was silly."',
      },
      pickDistortion: {
        title: '2. Which pattern sounds closest?',
        instruction:
          'Skim through the 10 common thinking patterns and pick the one that feels closest to what you wrote.',
        unsureLabel: "I'm not sure yet",
        unsureDescription: 'Still show me a gentle reflection question to help look at it calmly.',
        example: 'Assuming what others think without checking is often "Jumping to conclusions".',
      },
      reflect: {
        title: '3. A gentle reflection prompt',
        instruction: 'Read the short note and jot down an answer to the prompt below if you like.',
        unsureExplain:
          'You do not have to name the exact pattern right away. Simply pausing to see a thought as a thought—not an automatic fact—already creates space.',
        unsureQuestion:
          'If you looked at this again after a good night of sleep, what remains an objective fact and what is only a guess?',
        noteLabel: 'Brief reflection note (optional)',
        notePlaceholder: 'For example: Everyone might just have been tired or busy taking notes...',
        example: 'Write 1–2 short sentences capturing another perspective you just noticed.',
      },
    },
  },
  thoughtReframing: {
    questions: [
      {
        id: 'evidence',
        label: 'What is the actual evidence?',
        helper: 'What concrete facts prove this thought is 100% true, versus what is anxious guesswork?',
      },
      {
        id: 'friend',
        label: 'If a close friend were in this spot, what would you say?',
        helper: 'We are often far kinder and more realistic with friends than with ourselves.',
      },
      {
        id: 'outcomes',
        label: 'What is the worst, best, and most likely outcome?',
        helper: 'Separate the most realistic outcome from the worst-case story in your head.',
      },
      {
        id: 'time-zoom',
        label: 'How might this look one or six months from now?',
        helper: 'A bit of distance helps clarify how big this moment really is.',
      },
      {
        id: 'control',
        label: 'What part is in my control right now?',
        helper: 'Focus on one small, doable step instead of carrying everything at once.',
      },
    ],
    steps: {
      thought: {
        title: '1. The thought to revisit',
        instruction:
          'Write down one thought weighing on you today and rate how strongly you feel about it right now.',
        label: 'Thought to examine',
        placeholder:
          'For example: "My family expects so much, and I am falling behind everyone else."',
        intensityLabel: 'Current emotion intensity (1–5)',
        example:
          '"My roommate speaks English effortlessly while I still stumble; maybe this major is not for me."',
      },
      pickQuestions: {
        title: '2. Choose 1–3 perspective questions',
        instruction:
          'Pick between 1 and 3 questions that feel most helpful for looking at this thought.',
        limitHint: 'Select at least 1 and at most 3 questions.',
        maxError: 'Please select up to 3 questions so it stays manageable.',
        example:
          'Many students find "What would I say to a close friend?" the easiest place to start.',
      },
      rewrite: {
        title: '3. Write a more balanced thought',
        instruction:
          'Using the questions you chose, try rephrasing the original thought into something fairer and more grounded.',
        selectedPromptsHeading: 'Questions you chose as prompts',
        label: 'More balanced thought',
        placeholder:
          'For example: "Everyone starts from a different place. Stumbling means I am still practicing, not that I do not belong here."',
        example: '"My parents ask because they care. I am still working steadily at my own pace."',
      },
      afterIntensity: {
        title: '4. Check in with your feeling now',
        instruction:
          'After writing that out, where does the intensity sit now? (It is completely okay if it has not dropped right away.)',
        label: 'Current emotion intensity (1–5)',
        example:
          'Sometimes intensity shifts just one step from 4 to 3—that small bit of breathing room still counts.',
      },
    },
  },
  emotionAwareness: {
    groups: [
      {
        id: 'calm-warm',
        label: 'Calm / Pleasant',
        description: 'Feelings of ease, warmth, relief, or quiet gratitude.',
        words: ['Peaceful', 'Relieved', 'Warm', 'Content', 'Curious', 'Grateful', 'Grounded'],
      },
      {
        id: 'anxious-tense',
        label: 'Anxious / Restless',
        description: 'Feelings of unease, nervousness, pressure, or fear of slipping up.',
        words: ['Nervous', 'Restless', 'Uneasy', 'Pressured', 'Overwhelmed', 'Self-conscious', 'On edge'],
      },
      {
        id: 'heavy-sad',
        label: 'Low / Sad',
        description: 'Feelings of disappointment, loneliness, heaviness, or low energy.',
        words: ['Disappointed', 'Lonely', 'Hurt', 'Discouraged', 'Down', 'Empty', 'Homesick'],
      },
      {
        id: 'frustrated-angry',
        label: 'Frustrated / Irritated',
        description: 'Feelings of annoyance, unfairness, helplessness, or tension.',
        words: ['Frustrated', 'Irritable', 'Helpless', 'Annoyed', 'Let down', 'Stressed'],
      },
      {
        id: 'tired-confused',
        label: 'Tired / Unsure',
        description:
          'Feelings of low battery, mental fog, uncertainty, or being pulled in many directions.',
        words: ['Drained', 'Sleepy', 'Foggy', 'Confused', 'Torn', 'Stretched thin'],
      },
    ],
    bodySensations: [
      { id: 'shoulders', label: 'Tightness in shoulders or neck' },
      { id: 'heartbeat', label: 'Fast or pounding heartbeat' },
      { id: 'chest', label: 'Heaviness or tightness in chest' },
      { id: 'stomach', label: 'Butterflies or knot in stomach' },
      { id: 'head', label: 'Heavy head or difficulty focusing' },
      { id: 'breath', label: 'Shallow or quick breathing' },
      { id: 'relaxed', label: 'Relaxed muscles, steady breathing' },
      { id: 'unsure-body', label: 'Not noticing a clear physical sensation' },
    ],
    steps: {
      group: {
        title: '1. Choose the broad emotion family',
        instruction: 'Start with a wide area before zooming in on more specific words.',
        example: 'Before a deadline, "Anxious / Restless" might feel closest.',
      },
      words: {
        title: '2. Name it more specifically',
        instruction: 'Select one or more words that best capture what is happening inside.',
        example: 'Instead of just "sad", you might realize it is closer to "disappointed" or "homesick".',
      },
      body: {
        title: '3. Notice signals in your body',
        instruction: 'Do a quick scan from head to toe to see where this feeling shows up physically.',
        example: 'Many people notice raised shoulders or shorter breaths when feeling pressured.',
      },
      context: {
        title: '4. What seems connected to this feeling?',
        instruction: 'Jot down the context or event linked to what you are noticing.',
        label: 'Connected context',
        placeholder:
          'For example: I have been studying nonstop for three classes since morning and still have readings left...',
        example:
          'Just got off a phone call about junior-year internship plans and felt pulled in several directions.',
      },
    },
    summaryTemplatePrefix: 'Right now I am feeling',
  },
};
