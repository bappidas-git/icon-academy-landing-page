# 18 — Student & Alumni Testimonials Section

## Objective
Convert hesitant visitors with authentic quotes from real graduates of Icon Commerce College — sourced verbatim from the prospectus. Display them as a swipeable, screenshot-friendly carousel that mixes alumni currently working at IDFC, SBI, IOC, IIT Guwahati, the courts, and government schools — with their stream and current role for context.

## Scope
- Refactor / repopulate `src/components/sections/TestimonialsSection/TestimonialsSection.jsx`
- Refactor / repopulate `src/components/sections/TestimonialsSection/TestimonialCard.jsx`
- Refactor `src/components/sections/TestimonialsSection/TestimonialsSection.module.css`
- Repopulate `src/data/testimonialsData.js`

## Out of Scope
- Video testimonials (no source assets)
- Real photographs (placeholders)

## Requirements

### `src/data/testimonialsData.js`
Export an array `TESTIMONIALS` derived from the prospectus alumni section. Quotes should be lightly edited for spacing/punctuation only — preserve the alumnus's voice.

```js
export const TESTIMONIALS = [
  {
    id: 'ankita',
    quote: "When I left school I was excited, nervous, and scared — but Icon Commerce College welcomed me with open arms and made me feel like family. The faculty are wonderful, very approachable, and always there to help. What I am today is somewhere because of ICC.",
    name: 'Ankita Kumari Agarwal',
    role: 'Alumnus — Department of BBA',
    rating: 5,
    img: 'https://placehold.co/120x120?text=AKA',
  },
  {
    id: 'ayushi',
    quote: "The distinct attention and dedicated care by the faculty of ICON Commerce College to each and every student is highly admirable. My faculties encouraged me to explore my talent and potential by providing an exceptional integrated learning environment.",
    name: 'Ayushi Surana',
    role: 'Alumnus — Department of BBA',
    rating: 5,
    img: 'https://placehold.co/120x120?text=AS',
  },
  {
    id: 'shahid',
    quote: "The graduation programme at Icon Commerce College helped me develop confidence and the personality to face the challenges of the business world. Motivating and helpful professors — their support and encouragement were the best of everything.",
    name: 'Shahid Ansari',
    role: 'Entrepreneur',
    rating: 5,
    img: 'https://placehold.co/120x120?text=SA',
  },
  {
    id: 'akash',
    quote: "My experience at ICON Commerce College has been truly exceptional. The college's commitment to academic excellence and holistic development prepared me for a successful future. The state-of-the-art facilities and student-centric approach made all the difference.",
    name: 'Akash Paul',
    role: 'Asst. Professor (Commerce), Biswanath College',
    rating: 5,
    img: 'https://placehold.co/120x120?text=AP',
  },
  {
    id: 'devika',
    quote: "I am very proud and blessed to be a part of this college, as it taught me many life lessons. The teachers here are the best — friendly and motivating. This is also a very good platform for learning and career development.",
    name: 'Devika Adhyapak',
    role: 'Administrative Assistant, IIT Guwahati',
    rating: 5,
    img: 'https://placehold.co/120x120?text=DA',
  },
  {
    id: 'dishangka',
    quote: "ICON Commerce College provided an excellent learning experience that equipped me with the skills and knowledge needed to succeed in the current world. The college's faculty were knowledgeable, experienced, and dedicated to student success.",
    name: 'Dishangka Jiten Pathak',
    role: 'Junior Accounts Assistant Trainee, Indian Oil Corporation Ltd.',
    rating: 5,
    img: 'https://placehold.co/120x120?text=DJP',
  },
  {
    id: 'raghav',
    quote: "Icon Commerce College has always believed in helping and guiding its students. Regular classes and continuous efforts by teachers helped us in comprehensive development. We were encouraged and guided at each step.",
    name: 'Raghav Sarma',
    role: 'Advocate, Gauhati High Court',
    rating: 5,
    img: 'https://placehold.co/120x120?text=RS',
  },
  {
    id: 'tulika',
    quote: "My experience at Icon Commerce College is great and memorable. The mentors helped us enhance our academic and interpersonal skills. I am thankful to our teachers for providing a platform to enhance my skills.",
    name: 'Tulika Devi',
    role: 'Graduate Teacher, Rangmahal High School, Kamrup',
    rating: 5,
    img: 'https://placehold.co/120x120?text=TD',
  },
  {
    id: 'pritam',
    quote: "I will be forever indebted to Icon Commerce College for blessing me with some of my fondest moments. The comprehensive classes and extracurricular activities helped me become a confident and better person.",
    name: 'Pritam Saha',
    role: 'Senior Business Development Manager, SBI General',
    rating: 5,
    img: 'https://placehold.co/120x120?text=PS',
  },
  {
    id: 'bikash',
    quote: "I was a student of ICON Commerce College from the Arts stream — nurturing many pleasant memories. I fondly remember the teaching staff and have my highest regard for them. Because of their dedication, many of us have got excellent placements.",
    name: 'Bikash Bezbaruah',
    role: 'Manager (Current Account), IDFC First Bank Ltd.',
    rating: 5,
    img: 'https://placehold.co/120x120?text=BB',
  },
  {
    id: 'banani',
    quote: "I think I have been very lucky to have graduated from this college because, through the experience I got here, I was able to step into finding my future career. What I am today, I owe a lot to my respected teachers.",
    name: 'Banani Bhagawati',
    role: 'PGT (English), Directorate of Secondary Education',
    rating: 5,
    img: 'https://placehold.co/120x120?text=BBh',
  },
];
```

### `TestimonialCard.jsx`
- Quote (Fraunces 18 px italic, color `var(--ic-text-primary)`) — lead with a large saffron decorative quotation mark icon (`mdi:format-quote-open`) absolutely positioned top-left
- Footer row: portrait (56 × 56 circular) + name (Plus Jakarta Sans 15 px / 700) + role (Inter 13 px / 500 secondary)
- 5-star row at top-right (saffron stars from `mdi:star`)
- Card surface: `var(--ic-bg-default)`, 1 px border, 20 px radius, 32 px padding, `var(--ic-shadow-sm)`

### `TestimonialsSection.jsx`
- Section header:
  - Eyebrow: `STUDENT VOICES`
  - H2: `What Our Alumni Say`
  - Subhead: `From banking and government to teaching and entrepreneurship — Icon Commerce College graduates speak for themselves.`
- Use existing **Swiper** dependency to build a slider:
  - Desktop: 3 slides visible, peek of next
  - Tablet: 2 slides
  - Mobile: 1 slide with peek
  - Auto-advance every 6s, pause on hover; respect `prefers-reduced-motion` (disable autoplay)
  - Pagination dots in saffron; arrow controls in indigo
- Below the slider: a "share-your-story" footer with mailto link `<a href="mailto:alumni@iconcommercecollege.in">Are you an ICC alumnus? Share your story →</a>`

### Anchor
- Section root: `id="testimonials"`

## Out of Scope
- Inline video players
- Star-rating user input

## Content / Copy
Quotes are lightly edited from the prospectus only for whitespace/punctuation. Names, roles, and organisations are exact.

## Design Notes
- Background `var(--ic-bg-default)` (alternates with cream from prior section)
- Saffron decorative quote icon at 48 px, 0.18 opacity behind the quote
- Cards expand on hover by 4 px translateY with deeper shadow

## Placeholder Image Specs
- Each portrait: `https://placehold.co/120x120?text={Initials}` (already in data)

## Acceptance Criteria
- [ ] 11 testimonial cards render with correct quote / name / role
- [ ] Swiper renders responsively (3 / 2 / 1 visible by breakpoint)
- [ ] Auto-advance pauses on hover and disables under `prefers-reduced-motion`
- [ ] Section anchor `#testimonials` available
- [ ] Names and organisations exactly match prospectus spelling
- [ ] No Anvil / solar / kW strings
- [ ] Lighthouse a11y: each card is keyboard-focusable; quote text is wrapped in `<blockquote>` with appropriate `<cite>`

## Dependencies
- 04-color-palette-and-design-tokens.md
- 05-typography-system.md
- 17-campus-life-and-events.md
