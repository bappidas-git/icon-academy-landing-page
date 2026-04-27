/* ============================================
   Campus Life Data — Icon Commerce College
   Flagship events (ICON Shield, ICON Trophy,
   Inter-College Cooking Competition), Annual
   College Week highlights, and academic life
   activities surfaced in CampusLifeSection.
   Memorial names ("Rupam Patgiri", "Jadav Dutta")
   are canonical and must not be paraphrased.
   ============================================ */

export const FLAGSHIP_EVENTS = [
  {
    id: 'icon-shield',
    icon: 'mdi:cricket',
    badge: 'Annual',
    title: 'ICON Shield',
    subtitle: 'Inter-College Cricket Tournament',
    body: 'Hosted yearly by the ICON group in memory of Rupam Patgiri — a celebration of sportsmanship that brings together teams from across Guwahati colleges.',
    image: 'https://placehold.co/900x600?text=ICON+Shield+Cricket',
  },
  {
    id: 'icon-trophy',
    icon: 'mdi:trophy-variant',
    badge: 'Annual',
    title: 'ICON Trophy',
    subtitle: 'Cricket Tournament',
    body: 'Held in memory of Jadav Dutta — another annual cricket fixture organised by the ICON group, fostering competitive spirit and team building.',
    image: 'https://placehold.co/900x600?text=ICON+Trophy+Cricket',
  },
  {
    id: 'cooking-comp',
    icon: 'mdi:silverware-clean',
    badge: '2026',
    title: 'Inter-College Cooking Competition',
    subtitle: 'Hosted by Icon Commerce College',
    body: 'Bringing together students from neighbouring colleges to celebrate creativity, culture, and culinary skill in a friendly competition.',
    image: 'https://placehold.co/900x600?text=Inter-College+Cooking+Competition',
  },
];

export const COLLEGE_WEEK_HIGHLIGHTS = [
  { id: 'indoor-games', icon: 'mdi:chess-knight', label: 'Indoor Games' },
  { id: 'outdoor-games', icon: 'mdi:soccer', label: 'Outdoor Games' },
  { id: 'quiz', icon: 'mdi:lightbulb-on-outline', label: 'Quiz Competitions' },
  { id: 'debate', icon: 'mdi:account-voice', label: 'Debate Competitions' },
  { id: 'art', icon: 'mdi:palette', label: 'Art Competitions' },
  { id: 'literature', icon: 'mdi:fountain-pen-tip', label: 'Literature Competitions' },
];

export const ACADEMIC_LIFE = [
  {
    id: 'seminars',
    icon: 'mdi:presentation',
    title: 'Seminars & Workshops',
    body: 'Held at regular intervals to lift the academic horizon of students and faculty alike.',
  },
  {
    id: 'topical-discussions',
    icon: 'mdi:newspaper-variant-outline',
    title: 'Topical Discussions',
    body: 'Discussions on emerging topics — General Budget, Rail Budget, current affairs — actively involving students.',
  },
  {
    id: 'mentor-groups',
    icon: 'mdi:account-group-outline',
    title: 'Faculty Mentor Groups',
    body: 'Each faculty member maintains a development record for an allotted group of students throughout the year.',
  },
];
