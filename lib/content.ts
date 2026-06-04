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
  author: string;
  publisher: string;
  year: string;
};

export const publications: Publication[] = [
  { title: "From City to Detail", author: "Wilfried Wang", publisher: "The Architecture Foundation", year: "1998" },
  { title: "Beyond Modernity", author: "Samantha Turner", publisher: "GreenBuild Publications", year: "1999" },
  { title: "Sustainable Heights", author: "Michael Thompson", publisher: "Heritage Architecture Books", year: "2001" },
  { title: "Reviving History", author: "Emily Collins", publisher: "FuturArch Publishing", year: "2004" },
  { title: "Techno-Visions", author: "Alexander Hughes", publisher: "LandArch Books", year: "2005" },
  { title: "Harmony in Design", author: "Olivia Turner", publisher: "GreenCity Press", year: "2007" },
  { title: "Eco-Urbanism", author: "Ethan Reed", publisher: "Universal Design Publications", year: "2009" },
  { title: "Inclusive Spaces", author: "Sophia Davis", publisher: "Modern Architecture Magazine", year: "2012" },
  { title: "Suburban Revamp", author: "Max Fischer", publisher: "Suburban Architecture Review", year: "2015" },
  { title: "Materiality Unleashed", author: "Emma Reynolds", publisher: "Materiality Books", year: "2017" },
  { title: "Computational Design", author: "Jacob Bennett", publisher: "Roma Publications", year: "2019" },
  { title: "Cultural Convergence", author: "Ava Campbell", publisher: "World Architecture Journal", year: "2021" },
  { title: "Industrial Heritage", author: "Liam Mitchell", publisher: "Industrial Architecture Press", year: "2023" },
  { title: "The Facade Catalogue", author: "Henry Franklin", publisher: "Self-Published", year: "2023" },
];

export const intro = {
  eyebrow: "Hi, I'm Ian",
  body: "I'm an Interior Architect & Designer focused on creating meaningful spaces that balance functionality, emotion, and aesthetics. My work explores how thoughtful design can shape the way people experience and interact with their environments. With a strong attention to detail and a passion for materiality, form, and human centred design, I develop interiors that are both purposeful and memorable. From residential and hospitality spaces to conceptual explorations, each project is approached with curiosity, creativity, and a commitment to crafting experiences that feel authentic and enduring.",
};
