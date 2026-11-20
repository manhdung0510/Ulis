import type { DistortionsContent } from '@/content/vi/distortions';

export const distortionsEn: DistortionsContent = {
  status: 'draft-needs-review',
  items: [
    {
      id: 'all-or-nothing',
      name: 'All-or-nothing thinking',
      description:
        'Seeing situations in strict black-and-white terms—either complete success or total failure—with no middle ground.',
      example:
        'I stumbled twice during my English presentation, so I thought: "I ruined the whole thing."',
      promptQuestion:
        'If you rated this on a 0–10 scale instead of pass/fail, what parts still went reasonably well?',
    },
    {
      id: 'overgeneralization',
      name: 'Overgeneralization',
      description:
        'Taking one disappointing event as proof that things will always turn out this way.',
      example:
        'My midterm score was lower than I hoped, so I thought: "I will never be good at this subject."',
      promptQuestion:
        'Is this one specific moment, or is it truly guaranteed to repeat every time?',
    },
    {
      id: 'mental-filter',
      name: 'Mental filter',
      description:
        'Zooming in on a single negative detail while filtering out everything else that went fine.',
      example:
        'The lecturer praised my essay structure and noted two grammar slips; all evening I only replayed those two slips.',
      promptQuestion:
        'Besides the detail bothering you, what else was part of the full picture today?',
    },
    {
      id: 'disqualifying-positive',
      name: 'Disqualifying the positive',
      description:
        'Brushing off compliments or good outcomes as mere luck, coincidence, or nothing special.',
      example:
        'A teammate complimented my clean slides and I replied: "Not really, I just threw them together."',
      promptQuestion:
        'If a close friend achieved the same thing, would you dismiss their effort that quickly?',
    },
    {
      id: 'jumping-to-conclusions',
      name: 'Jumping to conclusions (mind reading / fortune telling)',
      description:
        'Assuming you know what others think of you or predicting a bad outcome without solid evidence.',
      example:
        'My classmate has not replied to my group-work message since noon, so I assumed: "They must find me annoying."',
      promptQuestion:
        'What ordinary, everyday explanations could also fit this situation?',
    },
    {
      id: 'magnification-catastrophizing',
      name: 'Magnification or minimization (catastrophizing)',
      description:
        'Blowing a mistake out of proportion while shrinking your own ability to handle it.',
      example:
        'I accidentally emailed a draft file to my lecturer and panicked: "I am definitely going to fail this course."',
      promptQuestion:
        'Even if a setback happened, what small practical step could you take next?',
    },
    {
      id: 'emotional-reasoning',
      name: 'Emotional reasoning',
      description:
        'Treating how you feel right now as objective proof of what is true about you or the situation.',
      example:
        'Because I feel heavy and anxious today, I conclude: "I am completely incapable."',
      promptQuestion:
        'What is this feeling trying to tell you, and do the actual facts match that conclusion?',
    },
    {
      id: 'should-statements',
      name: '"Should" and "must" statements',
      description:
        'Holding rigid rules about how you or others ought to behave, often leading to guilt or frustration.',
      example:
        'I keep telling myself: "As a second-year student, I must speak up without ever feeling nervous."',
      promptQuestion:
        'If you soften "I must" to "I would prefer" or "I am practicing", how does the pressure change?',
    },
    {
      id: 'labeling',
      name: 'Labeling',
      description:
        'Attaching a fixed negative label to yourself or someone else based on one slip or tough moment.',
      example:
        'I forgot my discussion notes once and immediately called myself "careless and unreliable".',
      promptQuestion:
        'Are you describing one specific action, or defining your entire character by a single moment?',
    },
    {
      id: 'personalization',
      name: 'Personalization',
      description:
        'Taking full blame for something outside your control, or assuming someone else’s mood is about you.',
      example:
        'Our study group seemed quiet today, so I thought: "Everyone is silent because of something I said earlier."',
      promptQuestion:
        'What other factors outside your control might be playing a part here?',
    },
  ],
};
