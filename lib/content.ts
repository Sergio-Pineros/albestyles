export const site = {
  name: "Albe Styles",
  handle: "@albestyles",
  tagline: "Barber in Minneapolis, 100% exceeding expectations.",
  locationLine: "North Loop · Minneapolis",
  shop: "SAVRON Barbershop & Lounge",
  address: "250 N 3rd Ave Suite #102, Minneapolis, MN 55401",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=250+N+3rd+Ave+Suite+102+Minneapolis+MN+55401",
  phone: "(312) 659-6447",
  phoneHref: "tel:+13126596447",
  email: "bookings@albestylesbarber.com",
  bookUrl: "https://albestylesbarber.com/book-final/",
  instagram: "https://www.instagram.com/albestyles/",
  facebook: "https://www.facebook.com/AlbeStyles",
  savron: "https://www.instagram.com/savron_mn/",
  announcement: "New location — I’m waiting for you.",
};

export const hours = [
  { days: "Monday – Friday", time: "11:00 AM – 7:00 PM" },
  { days: "Saturday", time: "10:00 AM – 5:30 PM" },
  { days: "Sunday", time: "VIP sessions 12:00 PM – 3:30 PM" },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Story", href: "#story" },
  { label: "Visit", href: "#visit" },
];

export const heroSlides = [
  {
    src: "/media/haircut.webp",
    alt: "Precision fade and textured crop",
    label: "Haircut",
  },
  {
    src: "/media/beard-trim.webp",
    alt: "Sharp beard lineup and skin fade",
    label: "Beard",
  },
  {
    src: "/media/long-medium.webp",
    alt: "Long and medium hair scissor work",
    label: "Scissors",
  },
  {
    src: "/media/kids.webp",
    alt: "Textured kids cut with a clean taper",
    label: "Kids",
  },
  {
    src: "/media/packs.webp",
    alt: "Albe Styles cape in the North Loop shop",
    label: "The chair",
  },
];

export const services = [
  {
    id: "haircut",
    index: "01",
    title: "Haircut",
    price: "$50",
    theme: "fade",
    image: "/media/haircut.webp",
    alt: "Modern taper fade with textured volume on top",
    summary:
      "A fresh, custom cut that brings out your style. Any fade, brush fade, taper, slicked back, or blow up.",
    detail: "Clippers + scissors. Consultation first. Built around your hair, not a template.",
  },
  {
    id: "beard",
    index: "02",
    title: "Beard Trim",
    price: "$45",
    theme: "lineup",
    image: "/media/beard-trim.webp",
    alt: "Sculpted beard with a razor-sharp cheek line",
    summary:
      "Custom beard trim, razor, hot towel, and lineup — shaped to your face, not rushed.",
    detail: "Cheek line, neck line, density. The details that make the whole head look finished.",
  },
  {
    id: "kids",
    index: "03",
    title: "Kids",
    price: "$45",
    theme: "soft",
    image: "/media/kids.webp",
    alt: "Textured kids haircut with a clean low taper",
    summary:
      "Stylish, kid-friendly cuts from 0 to 9. Haircut, styling, and small designs in a relaxed chair.",
    detail: "Patience first. A calm seat, a clean shape, and a look they actually want to wear.",
  },
  {
    id: "long",
    index: "04",
    title: "Long / Medium",
    price: "$55",
    theme: "flow",
    image: "/media/long-medium.webp",
    alt: "Swept-back medium hair with a refined taper",
    summary:
      "Scissor work for longer hair — layering, weight, texture, and a finish that still moves.",
    detail: "Sleek, textured, or event-ready. Sides can taper. The top stays yours.",
  },
  {
    id: "packs",
    index: "05",
    title: "Packs",
    price: "From $60",
    theme: "shop",
    image: "/media/packs.webp",
    alt: "Albe Styles gold logo on a black cape in the shop",
    summary:
      "The full sit-down: haircut + beard, haircut & eyebrow, razor line, and relaxing massage.",
    detail: "For the days you want the whole ritual — not just a quick cut.",
  },
] as const;

export const packages = [
  {
    name: "Haircut",
    price: "$50",
    includes: "Any fade, brush fade, taper, slicked back, blow up.",
  },
  {
    name: "Beard Trim",
    price: "$45",
    includes: "Custom beard trim, razor, hot towel, and lineup.",
  },
  {
    name: "Kids",
    price: "$45",
    includes: "Haircut, styling, small designs. Ages 0–9.",
  },
  {
    name: "Long / Medium Hair Styling",
    price: "$55",
    includes: "Long or medium hair, styling and layering.",
  },
  {
    name: "Haircut & Eyebrows",
    price: "$60",
    includes: "Any fade or taper, plus eyebrow razor cleaning.",
  },
  {
    name: "Haircut + Beard",
    price: "$70",
    includes: "Any haircut, custom beard trim, and lineup.",
  },
  {
    name: "Haircut and Hot Towel Beard",
    price: "$80",
    includes: "Any haircut, custom beard trim, razor, hot towel, and lineup.",
  },
  {
    name: "Luxury & Relaxed",
    price: "$90",
    includes:
      "Any haircut, custom beard trim, razor, hot towel and lineup, eyebrows, facial & massage.",
  },
];

export const gallery = [
  {
    src: "/media/haircut.webp",
    pos: "50% 70%",
    label: "The fade",
    note: "Skin to length, no step.",
  },
  {
    src: "/media/beard-trim.webp",
    pos: "62% 42%",
    label: "The lineup",
    note: "Cheek, temple, finish.",
  },
  {
    src: "/media/long-medium.webp",
    pos: "48% 22%",
    label: "The flow",
    note: "Weight, layer, movement.",
  },
  {
    src: "/media/kids.webp",
    pos: "58% 38%",
    label: "The taper",
    note: "Soft around the ear.",
  },
  {
    src: "/media/packs.webp",
    pos: "50% 40%",
    label: "The chair",
    note: "North Loop. New home.",
  },
];

export const reviews = [
  {
    name: "Connor Burke",
    source: "Google",
    quote:
      "Albe is hands down the best barber I’ve ever been to. Amazing attention to detail and he doesn’t rush. I can always rely on him for a great haircut.",
  },
  {
    name: "Marcos Perez",
    source: "Google",
    quote:
      "Albe always cuts my hair very well — whether it’s a longer cut with layers or a fade/taper. 10/10. Recommend for all hair types.",
  },
  {
    name: "Bill Nally",
    source: "Google",
    quote:
      "If you’re looking for a barber who really knows how to trim and shape a beard, Albe is the guy. Lines are clean, the shape fits your face, and everything looks sharp.",
  },
  {
    name: "Kevin Metras",
    source: "Google",
    quote:
      "He took his time to ask about my hair and the style I wanted, and genuinely analyzed it before beginning to cut. I left extremely satisfied.",
  },
  {
    name: "Jeremy DeLorme",
    source: "Google",
    quote:
      "Made great recommended style to my choices and gave professional advice on what I wanted.",
  },
];

export const story = {
  eyebrow: "My story",
  title: "From cook and painter to barber.",
  pull:
    "Barbering is the craft that let me use my hands, my eye, and a real conversation — all in the same hour.",
  paragraphs: [
    "I arrived in the United States more than a decade ago. A new language, a new culture, a new life. My first job was as a cook in a small restaurant — it paid the bills and taught me pace, teamwork, and how to show up every day.",
    "I had also worked as a painter. I liked the work, but I wanted a craft that mixed precision with people. That’s when I found barbering: artistry you can wear out the door.",
    "School was not easy. Theory, skin, hair, and hours of practice that tested my patience. I earned my license. Every cut since then is the same promise: listen first, then make you look sharp, balanced, and ready.",
  ],
};
