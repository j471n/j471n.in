import { homeProfileImage } from "@utils/utils";

export type SocialIconKey =
  | "twitter"
  | "linkedin"
  | "github"
  | "instagram"
  | "devto"
  | "codepen"
  | "facebook"
  | "mail";

export type StatIconKey = "code" | "users" | "coffee" | "award";

const siteConfig = {
  person: {
    name: "Jatin Sharma",
    profileImage: homeProfileImage,
    email: "work.j471n@gmail.com",
    location: "Based in India",
    availability: "Open to new projects",
  },

  socialLinks: [
    {
      title: "Twitter",
      icon: "twitter" as SocialIconKey,
      url: "https://twitter.com/intent/follow?screen_name=j471n_",
      featured: true,
    },
    {
      title: "LinkedIn",
      icon: "linkedin" as SocialIconKey,
      url: "https://www.linkedin.com/in/j471n/",
      featured: true,
    },
    {
      title: "Github",
      icon: "github" as SocialIconKey,
      url: "https://github.com/j471n",
      featured: true,
    },
    {
      title: "Instagram",
      icon: "instagram" as SocialIconKey,
      url: "https://www.instagram.com/j471n_",
      featured: false,
    },
    {
      title: "Dev.to",
      icon: "devto" as SocialIconKey,
      url: "https://dev.to/j471n",
      featured: false,
    },
    {
      title: "Codepen",
      icon: "codepen" as SocialIconKey,
      url: "https://codepen.io/j471n",
      featured: false,
    },
    {
      title: "Facebook",
      icon: "facebook" as SocialIconKey,
      url: "https://www.facebook.com/ja7in/",
      featured: false,
    },
    {
      title: "Mail",
      icon: "mail" as SocialIconKey,
      url: "mailto:work.j471n@gmail.com",
      featured: false,
    },
  ],

  home: {
    hero: {
      availabilityBadge: "Building Something Amazing",
      greeting: "Hi, I'm",
      nameHighlight: "Jatin Sharma",
      rolePrefix: "Tech Lead at",
      companyName: "KonnectNXT",
      companyUrl: "https://www.linkedin.com/company/konnectnxt/",
      roleSuffix: ". Turning dreams into reality with modern technologies.",
      primaryCta: {
        label: "Download Resume",
        url: "https://bit.ly/j471nCV",
      },
      secondaryCta: {
        label: "Get in Touch",
        url: "#contact",
      },
      socialLabel: "Connect:",
      experienceBadge: {
        value: "3+",
        title: "Years",
        description: "Experience",
      },
    },

    stats: [
      {
        icon: "code" as StatIconKey,
        value: "50+",
        label: "Projects Completed",
        description: "Successful deliveries",
      },
      {
        icon: "users" as StatIconKey,
        value: "20+",
        label: "Happy Clients",
        description: "Worldwide satisfaction",
      },
      {
        icon: "coffee" as StatIconKey,
        value: "1000+",
        label: "Cups of Coffee",
        description: "Fueling innovation",
      },
      {
        icon: "award" as StatIconKey,
        value: "5+",
        label: "Years Experience",
        description: "In web development",
      },
    ],

    skillsSection: {
      eyebrow: "Technical Expertise",
      title: "Skills & Technologies",
      description:
        "A comprehensive toolkit of modern technologies I work with to build exceptional digital experiences",
    },

    blogsSection: {
      eyebrow: "Latest Writing",
      title: "Featured Articles",
      description:
        "Thoughts on web development, technology trends, and software engineering best practices",
      ctaLabel: "View All",
    },
  },

  contact: {
    eyebrow: "Let's Work Together",
    title: "Get in Touch",
    description:
      "Have a project in mind or just want to chat? I'm always open to discussing new opportunities, creative ideas, or partnerships.",
    email: {
      title: "Email",
      responseTime: "Response within 24 hours",
    },
    location: {
      title: "Location",
      value: "Based in India",
    },
    availability: {
      title: "Availability",
      value: "Open to new projects",
    },
    socialTitle: "Connect",
    servicesTitle: "Services",
    services: [
      "Web Development",
      "Technical Consulting",
      "Code Review",
      "Mentorship",
    ],
    privacyNote:
      "Your information is safe and will never be shared with third parties.",
  },

  footer: {
    description:
      "Full-stack developer passionate about creating beautiful and functional web experiences.",
  },
} as const;

export const featuredSocialLinks = siteConfig.socialLinks.filter(
  (socialLink) => socialLink.featured,
);

export default siteConfig;
