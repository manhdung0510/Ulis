import type { SupportContent } from '@/content/vi/support';

export const supportContentEn: SupportContent = {
  status: 'draft-needs-review',
  resources: [
    {
      id: '115',
      title: 'Medical Emergency 115',
      description: 'Call immediately if you or someone nearby needs urgent medical assistance.',
      phone: '115',
      hours: '24/7',
      status: 'draft-needs-review',
    },
    {
      id: '111',
      title: 'National Child Protection Helpline 111',
      description:
        'Free, confidential listening and protection support for individuals under 18 in Vietnam.',
      phone: '111',
      hours: '24/7',
      status: 'draft-needs-review',
    },
    {
      id: 'ulis-counseling',
      title: 'ULIS Counseling Contact (placeholder)',
      description:
        'Reserved for the team to add official office room, email, and hours for counseling support at VNU University of Languages and International Studies.',
      status: 'placeholder',
    },
  ],
};
