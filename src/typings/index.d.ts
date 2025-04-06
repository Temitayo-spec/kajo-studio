interface IProjects {
  name: string;
  image: StaticImageData;
  year: string;
}

interface IServices {
  title: string[];
  description: string;
  details: {
    title: string;
    services: string[];
  };
  image: StaticImageData;
}

interface ITestimonials {
  testimonial: string;
  extra_comment: string;
  avatar: StaticImageData;
  name: string;
  company: string;
}
