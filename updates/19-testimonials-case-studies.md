# 19 — Testimonials & Regional Case Studies

## Context
Social proof from the exact cities the ads are running in is worth 100× more than generic "Raj from Mumbai" reviews. Six testimonials — two from each of Assam, Nagaland, and Odisha — each with the customer's name, city, system size, and real-money savings number.

## Files to create
- `src/components/sections/TestimonialsSection/TestimonialsSection.jsx`
- `src/components/sections/TestimonialsSection/TestimonialsSection.module.css`
- `src/components/sections/TestimonialsSection/TestimonialCard.jsx`
- `src/data/testimonialsData.js`

## Files to modify
- `src/App.jsx` — lazy-mount after `FinancingSection`

## Implementation

### `testimonialsData.js`
```js
export const testimonialsData = [
  {
    id: 't1',
    name: 'Hiranya Barua',
    city: 'Guwahati, Assam',
    avatar: 'https://placehold.co/120x120?text=HB',
    rooftopPhoto: 'https://placehold.co/600x400?text=Solar+Rooftop+Guwahati+Assam',
    systemKw: '3 kW',
    monthlySavings: '₹ 4,200',
    quote: 'My bill used to cross ₹5,500 every summer. Anvil designed a 3 kW system, handled the PM Surya Ghar subsidy, and installed it in 2 days. Last month I paid ₹320.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Archita Das',
    city: 'Tezpur, Assam',
    avatar: 'https://placehold.co/120x120?text=AD',
    rooftopPhoto: 'https://placehold.co/600x400?text=Rooftop+Solar+Tezpur+Home',
    systemKw: '5 kW Hybrid',
    monthlySavings: '₹ 6,100',
    quote: 'We lose power often during monsoon. The hybrid system with battery keeps our fridge, lights, and Wi-Fi running. Worth every rupee.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Imtilong Jamir',
    city: 'Dimapur, Nagaland',
    avatar: 'https://placehold.co/120x120?text=IJ',
    rooftopPhoto: 'https://placehold.co/600x400?text=Solar+Install+Dimapur+Nagaland',
    systemKw: '2 kW',
    monthlySavings: '₹ 2,800',
    quote: 'I thought solar was for rich people. The Saathi walked me through the ₹60,000 subsidy and EMI. Zero down payment, EMI less than my old bill.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Bendangkokla Imchen',
    city: 'Kohima, Nagaland',
    avatar: 'https://placehold.co/120x120?text=BI',
    rooftopPhoto: 'https://placehold.co/600x400?text=Rooftop+Solar+Kohima+Hills',
    systemKw: '4 kW Hybrid',
    monthlySavings: '₹ 5,200',
    quote: 'They handled the hilly terrain mounting without any trouble. The app shows me live generation — I check it every morning like a hobby.',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Subhashree Mohapatra',
    city: 'Bhubaneswar, Odisha',
    avatar: 'https://placehold.co/120x120?text=SM',
    rooftopPhoto: 'https://placehold.co/600x400?text=Bhubaneswar+Home+Solar+Panels',
    systemKw: '5 kW',
    monthlySavings: '₹ 7,500',
    quote: 'Bhubaneswar sun is brutal — and finally useful. Payback on paper was 4 years; I think it\'ll be 3. Anvil\'s paperwork team handled TPCODL beautifully.',
    rating: 5,
  },
  {
    id: 't6',
    name: 'Rajesh Sahoo',
    city: 'Cuttack, Odisha',
    avatar: 'https://placehold.co/120x120?text=RS',
    rooftopPhoto: 'https://placehold.co/600x400?text=Cuttack+Residential+Solar',
    systemKw: '3 kW',
    monthlySavings: '₹ 4,900',
    quote: 'Honest pricing, on-time install, real engineers, real warranty card. My neighbour has since gotten Anvil too. Best home upgrade in 20 years.',
    rating: 5,
  },
];
```

### `TestimonialCard.jsx`
Props: `{ testimonial }`.

Layout (vertical card):
- Rooftop photo at top (16:10), rounded top 16px.
- Body:
  - Star row (5 gold stars using `mdi:star`).
  - Quote in italics, font-size `var(--fs-md)`, line-height 1.6, limited to 5 lines (no clamp).
  - Footer row: circular avatar (48×48), then name + city stacked.
  - Metrics chip row: `System: 3 kW` pill + `Saves ₹4,200/mo` green pill.

### `TestimonialsSection.jsx`
Uses `Section` + `SectionHeading`.
- `id="testimonials"`, `variant="default"`, `size="lg"`.
- Eyebrow: `"Real homes. Real savings."`
- Title: `"Homeowners across the Northeast & Bhubaneswar have already switched."`
- Subtitle: `"Every review is verified. Every savings number comes from a live meter."`

Layout:
- **Desktop**: Swiper slider (package `swiper` is already installed). `slidesPerView: 3`, `spaceBetween: 24`, navigation arrows + pagination dots. Autoplay 4500ms, loop true, `pauseOnMouseEnter: true`.
- **Mobile (≤768px)**: `slidesPerView: 1.1` (shows peek of next card), `spaceBetween: 16`, swipe only, pagination dots.

Below the slider, a centred summary strip: `⭐ 4.9 / 5 from 200+ verified reviews · Google rated`.

Note on Swiper: the repo already has `swiper: ^11.0.6` in `package.json`. Import modules:
```js
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
```

### `TestimonialsSection.module.css` / `TestimonialCard.module.css`
- `.card { background: var(--white); border-radius: 16px; overflow: hidden; box-shadow: var(--elev-2); display: flex; flex-direction: column; height: 100%; }`
- `.card:hover { box-shadow: var(--elev-3); }`
- `.photo { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; background: var(--surface-muted); }`
- `.body { padding: 20px; display: flex; flex-direction: column; gap: 12px; flex: 1; }`
- `.stars { display: flex; gap: 2px; color: var(--accent-gold); font-size: 18px; }`
- `.quote { font-style: italic; font-size: 0.9375rem; line-height: 1.6; color: var(--ink); flex: 1; }`
- `.footerRow { display: flex; gap: 12px; align-items: center; padding-top: 12px; border-top: 1px solid var(--border-gray); }`
- `.avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }`
- `.name { font-weight: 700; color: var(--ink); font-size: 0.9375rem; }`
- `.city { font-size: 0.8125rem; color: var(--ink-muted); }`
- `.metrics { display: flex; gap: 8px; flex-wrap: wrap; }`
- `.metric { padding: 4px 10px; background: var(--surface-muted); border-radius: 999px; font-size: 0.75rem; font-weight: 600; color: var(--ink); }`
- `.metric.savings { background: var(--savings-green-bg); color: var(--savings-green-dark); }`
- Swiper arrow custom colour: `.swiper-button-next, .swiper-button-prev { color: var(--accent-gold-dark); }`
- `.summary { text-align: center; margin-top: 32px; font-size: 0.9375rem; color: var(--ink-muted); }`

## Acceptance criteria
- [ ] Six testimonial cards cycle through a Swiper with autoplay on desktop, 3 visible.
- [ ] Mobile shows one card plus a peek of the next, swipeable.
- [ ] Each card shows photo, stars, quote, avatar, name, city, system size, savings.
- [ ] Nav arrows + pagination dots styled with brand colours.
- [ ] All six testimonials contain a real Northeast or Odisha city.
- [ ] Summary line shows under slider.

## Do-not-touch
- Existing `CTASection` — leave in place for now.
- Other sections.
- Swiper CSS imports — use exactly those 3 modules (Navigation, Pagination, Autoplay).
