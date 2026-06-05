// Centralized content for the Facade architecture portfolio clone.

export type Project = {
  title: string;
  location: string;
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "Lakehouse",
    location: "Auckland, New Zealand",
    image: "/images/project-lakehouse.jpg",
    href: "/projects/lakehouse",
  },
  {
    title: "Sandstone Residence",
    location: "California, USA",
    image: "/images/project-sandstone.jpg",
    href: "/projects/sandstone-residence",
  },
  {
    title: "Coast Retreat",
    location: "Andalusia, Spain",
    image: "/images/project-coast.jpg",
    href: "/projects/coast-retreat",
  },
  {
    title: "Midnight Haven",
    location: "Lofoten Islands, Norway",
    image: "/images/project-midnight.jpg",
    href: "/projects/midnight-haven",
  },
];

export type Publication = {
  title: string;
  year: string;
};

export const publications: Publication[] = [
  { title: "From City to Detail", year: "1998" },
  { title: "Beyond Modernity", year: "1999" },
  { title: "Sustainable Heights", year: "2001" },
  { title: "Reviving History", year: "2004" },
  { title: "Techno-Visions", year: "2005" },
  { title: "Harmony in Design", year: "2007" },
  { title: "Eco-Urbanism", year: "2009" },
];

export const intro = {
  label: "About",
  cta: "Explore Projects",
  image: "/images/ian-portrait.jpg",
  paragraphs: [
    "I'm an Interior Architect & Designer focused on creating meaningful spaces that balance functionality, emotion, and aesthetics. My work explores how thoughtful design can shape the way people experience and interact with their environments.",
    "With a strong attention to detail and a passion for materiality, form, and human centred design, I develop interiors that are both purposeful and memorable. From residential and hospitality spaces to conceptual explorations, each project is approached with curiosity, creativity, and a commitment to crafting experiences that feel authentic and enduring.",
  ],
};
