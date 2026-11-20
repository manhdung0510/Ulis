import type { CheckinContent } from '@/content/vi/checkin';
import { checkinContentVi } from '@/content/vi/checkin';

export const checkinContentEn: CheckinContent = {
  status: 'draft-needs-review',
  emotionOrder: checkinContentVi.emotionOrder,
  warmResponses: {
    peaceful:
      'Moments of calm are worth noticing. You might jot down one small thing helping you feel grounded right now.',
    joyful:
      'It is nice to have something lift your day. If you like, name the nuance behind this feeling so you can remember it later.',
    anxious:
      'Anxiety often shows up when something ahead matters to you. Putting the thought into words can make it easier to examine.',
    stressed:
      'When deadlines and tasks pile up, tension builds fast. Slowing down to sort one thought at a time can create breathing room.',
    sad:
      'Sadness is a natural response when things feel heavy or disappointing. You do not have to rush past it right away.',
    angry:
      'Anger often points to a boundary or expectation that felt crossed. Naming what happened clearly can help steady your next step.',
    tired:
      'Your mind and body may simply be asking for rest. You do not need to solve everything in one sitting today.',
    confused:
      'Feeling unsure where to start is completely normal when a lot is happening at once. Separating one piece at a time helps.',
  },
  moodToExercises: checkinContentVi.moodToExercises,
};
