import { PROJECTS_IMAGES, SERVICES_IMAGES } from "./images";

export const PROJECTS: IProjects[] = [
  {
    name: "Acme",
    year: "2024",
    image: PROJECTS_IMAGES[0],
  },
  {
    name: "Kanba",
    year: "2024",
    image: PROJECTS_IMAGES[2],
  },
  {
    name: "Goldline",
    year: "2024",
    image: PROJECTS_IMAGES[1],
  },
  {
    name: "Utosia",
    year: "2024",
    image: PROJECTS_IMAGES[3],
  },
];

export const SERVICES: IServices[] = [
  {
    title: ["Brand", "Strategy"],
    description:
      "Build a strong, cohesive brand identity to connect with your audience.",
    details: {
      title: "Branding Services",
      services: [
        "Brand Discovery",
        "Brand Positioning",
        "Visual Identity Design",
        "Brand Guidelines ",
      ],
    },
    image: SERVICES_IMAGES[0],
  },
  {
    title: ["Website", "Design"],
    description:
      "Create custom, responsive websites that engage users and drive conversions.",
    details: {
      title: "Website Services",
      services: [
        "Website Design",
        "Webflow Development",
        "Framer Development",
        "Website Support",
      ],
    },
    image: SERVICES_IMAGES[1],
  },
  {
    title: ["UI/UX", "Design"],
    description:
      "Enhance user experience through intuitive and user-centered design solutions.",
    details: {
      title: "UI/UX Services",
      services: [
        "User Research",
        "Usability Testing",
        "Wireframing",
        "UI/UX Audits",
      ],
    },
    image: SERVICES_IMAGES[2],
  },
];
