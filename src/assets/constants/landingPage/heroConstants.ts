export type HeroSlide = {
  id: string;
  imageUrl: string;
  alt: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    alt: "City skyline at dusk with lights reflecting on water",
    heading: "Discover places you’ll love",
    subheading:
      "Find curated locations, events, and experiences tailored for you.",
    ctaText: "Get Started",
    ctaHref: "#get-started",
  },
  {
    id: "slide-2",
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    alt: "Mountain landscape with a winding road",
    heading: "Plan your next adventure",
    subheading:
      "Explore top-rated destinations and hidden gems around the world.",
    ctaText: "Explore Now",
    ctaHref: "#explore",
  },
  {
    id: "slide-3",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    alt: "Beach at sunset with vibrant sky",
    heading: "Save your favorites",
    subheading: "Build collections and share them with friends.",
    ctaText: "Save Locations",
    ctaHref: "#favorites",
  },
];

export const AUTO_INTERVAL_MS = 5000;
