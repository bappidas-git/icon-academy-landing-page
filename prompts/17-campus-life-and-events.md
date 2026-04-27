# 17 — Campus Life & Events Section

## Objective
Showcase the student-life dimension of Icon Commerce College: the Annual College Week, ICON Shield (cricket — in memory of Rupam Patgiri), ICON Trophy (cricket — in memory of Jadav Dutta), Inter-College Cooking Competition 2026, debates, quizzes, art and literature competitions, and seminars/workshops. The goal is to make a parent/student feel the college is alive beyond academics.

## Scope
- Create `src/components/sections/CampusLifeSection/CampusLifeSection.jsx`
- Create `src/components/sections/CampusLifeSection/CampusLifeSection.module.css`
- Create `src/components/sections/CampusLifeSection/EventCard.jsx`
- Create `src/components/sections/CampusLifeSection/EventCard.module.css`
- Create `src/components/sections/CampusLifeSection/index.js`
- Create `src/data/campusLifeData.js`

## Out of Scope
- Real event photography (placeholders)
- Event registration / RSVP forms
- Student blogs

## Requirements

### `src/data/campusLifeData.js`
```js
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
  { id: 'seminars', icon: 'mdi:presentation', title: 'Seminars & Workshops', body: 'Held at regular intervals to lift the academic horizon of students and faculty alike.' },
  { id: 'topical-discussions', icon: 'mdi:newspaper-variant-outline', title: 'Topical Discussions', body: 'Discussions on emerging topics — General Budget, Rail Budget, current affairs — actively involving students.' },
  { id: 'mentor-groups', icon: 'mdi:account-group-outline', title: 'Faculty Mentor Groups', body: 'Each faculty member maintains a development record for an allotted group of students throughout the year.' },
];
```

### `EventCard.jsx`
- Card with full-width image (16:9 ratio), 20 px radius, content overlay at bottom-left in a frosted glass treatment (white at 0.92 opacity with backdrop-blur)
- Saffron `badge` chip top-right of image
- Title, subtitle, body in the overlay
- Hover: image zoom (`transform: scale(1.05)` over 400 ms)

### `CampusLifeSection.jsx`
- Section header:
  - Eyebrow: `CAMPUS LIFE & EVENTS`
  - H2: `Beyond the Books — A College Life Worth Remembering`
  - Subhead: `Sports, debate, quiz, art, literature, food — and lifelong friendships. Every year, our students live more than just lectures.`
- **Flagship events row:** 3 EventCards in a desktop 3-up grid (carousel on mobile via existing Swiper dependency)
- **Annual College Week:** subhead `What happens during College Week` + a 6-up icon strip (icon + label) using `COLLEGE_WEEK_HIGHLIGHTS`
- **Academic Life:** 3-column grid using `ACADEMIC_LIFE` (icon + title + body)
- Bottom CTA strip: `Curious about our annual events? Talk to a counsellor.` → drawer with `source: 'campus_life_counsellor'`

### Anchor
- Section root: `id="campus-life"`

## Out of Scope
- Photo carousels with real photos
- Calendar / date pickers for upcoming events

## Content / Copy
All canonical content in `campusLifeData.js`. Headers as specified. Do NOT speculate event dates.

## Design Notes
- Section background: `var(--ic-bg-cream)` for warmth
- College Week icon strip: each item is a 96 × 96 cream-tinted circular tile with a 28 px saffron icon and a Plus Jakarta Sans 13 px label below
- Academic Life cards: white surface, 16 px radius, 24 px padding, hairline border
- Flagship event cards: large, immersive imagery, frosted overlay text

## Placeholder Image Specs
- ICON Shield: `https://placehold.co/900x600?text=ICON+Shield+Cricket`
- ICON Trophy: `https://placehold.co/900x600?text=ICON+Trophy+Cricket`
- Cooking Competition: `https://placehold.co/900x600?text=Inter-College+Cooking+Competition`

## Acceptance Criteria
- [ ] 3 flagship event cards render with the correct memorial/host text
- [ ] 6-icon College Week strip renders horizontally (wraps gracefully on mobile)
- [ ] 3 Academic Life cards render below
- [ ] CTA opens drawer with `source === 'campus_life_counsellor'`
- [ ] Section anchor `#campus-life` available
- [ ] Memorial mentions exactly: "Rupam Patgiri" for ICON Shield and "Jadav Dutta" for ICON Trophy — these names must NOT be paraphrased (matter of respect)
- [ ] No Anvil / solar / kW strings

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 16-infrastructure-and-facilities.md
