export interface Technology {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  repo: string;
  demo: string;
}

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
}

export interface Service {
  title: string;
  icon: string;
}

export interface OwnerInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
}

export const owner: OwnerInfo = {
  name: "Leonardo Pacheco",
  title: "Full Stack Developer",
  bio: "Welcome to my portfolio website! I am a versatile Data Scientist with a strong foundation in Mathematics, backed by expertise in database management, web development, and operations research. Through my journey, I have honed the ability to unravel complex insights from data, transforming them into actionable strategies. My proficiency in handling databases empowers me to organize and extract meaningful information, while my skills in web development allow me to craft interactive and user-centric data-driven applications. With a keen interest in operations research, I am dedicated to optimizing processes and making informed decisions. Explore my projects and experiences to discover how I blend these diverse skills to derive valuable solutions in the realm of data science and beyond.",
  location: "Portugal",
  email: "leonardo@example.com",
  github: "https://github.com/wleopach",
  linkedin: "https://linkedin.com/in/wleopach",
};

export const services: Service[] = [
  {
    title: 'Data Science',
    icon: '/assets/icons/frontend.png',
  },
  {
    title: 'ML',
    icon: '/assets/icons/backend.png',
  },
  {
    title: 'Web development',
    icon: '/assets/icons/ux.png',
  },
  {
    title: 'Operations research',
    icon: '/assets/icons/prototyping.png',
  },
];

export const technologies: Technology[] = [
  {
    name: 'python',
    icon: '/assets/tech/python.png',
  },
  {
    name: 'tensorflow',
    icon: '/assets/tech/tensorflow.png',
  },
  {
    name: 'pytorch',
    icon: '/assets/tech/pytorch.png',
  },
  {
    name: 'r',
    icon: '/assets/tech/r.png',
  },
  {
    name: 'aws',
    icon: '/assets/tech/aws.png',
  },
  {
    name: 'HTML 5',
    icon: '/assets/tech/html.png',
  },
  {
    name: 'CSS 3',
    icon: '/assets/tech/css.png',
  },
  {
    name: 'JavaScript',
    icon: '/assets/tech/javascript.png',
  },
  {
    name: 'React JS',
    icon: '/assets/tech/reactjs.png',
  },
  {
    name: 'Node JS',
    icon: '/assets/tech/nodejs.png',
  },
  {
    name: 'postgresql',
    icon: '/assets/tech/postgresql.png',
  },
  {
    name: 'git',
    icon: '/assets/tech/git.png',
  },
  {
    name: 'docker',
    icon: '/assets/tech/docker.png',
  },
  {
    name: 'latex',
    icon: '/assets/tech/latex.png',
  },
  {
    name: 'gurobi',
    icon: '/assets/tech/gurobi.png',
  },
  {
    name: 'voximpant',
    icon: '/assets/tech/voximplant.png',
  },
];

export const experience: Experience[] = [
  {
    title: 'Senior Consultant OR',
    company_name: 'Melius ID',
    icon: '/assets/company/coverhunt.png', // Placeholder icon
    iconBg: '#333333',
    date: 'Aug 2016 - Feb 2019',
  },
  {
    title: 'AI Consultant',
    company_name: 'Laguna AI',
    icon: '/assets/company/microverse.png', // Placeholder icon
    iconBg: '#333333',
    date: 'May 2021 - Oct 2022',
  },
  {
    title: 'AI Consultant',
    company_name: 'Updata',
    icon: '/assets/company/kelhel.png', // Placeholder icon
    iconBg: '#333333',
    date: 'Mar 2022 - Dec 2022',
  },
  {
    title: 'Data Scientist',
    company_name: 'Tulipan',
    icon: '/assets/company/dcc.png', // Placeholder icon
    iconBg: '#333333',
    date: 'April 2023 - Present',
  },
  {
    title: 'Data Scientist and Scheduling optimization Engineer',
    company_name: 'Applaudo',
    icon: '/assets/company/kelhel.png', // Placeholder icon
    iconBg: '#333333',
    date: 'Jan 2024 - Present',
  },
];

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'payment platform',
    description: 'A web application written in Django that proccess bus tickets sells',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: '/assets/projects/pagos.png',
    repo: 'https://github.com/wleopach/pagos/',
    demo: 'https://pagos.onrender.com/',
  },
  {
    id: 'project-2',
    name: 'Staff scheduling',
    description: 'Staff scheduling using Column Generation',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: '/assets/projects/staff.png',
    repo: 'https://github.com/shaqdeff/Leaderboard',
    demo: 'https://www.gurobi.tulipan.ai/dashboard',
  },
  {
    id: 'project-3',
    name: 'Voicebot',
    description: 'This is a single-page calculator app built with React',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: '/assets/projects/math-magicians.png',
    repo: 'https://github.com/shaqdeff/Math-Magicians',
    demo: 'https://inspiring-medovik-37d3b3.netlify.app/',
  },
  {
    id: 'project-4',
    name: 'N2D segmentation',
    description: `A single-page application that allows users to search for any movie or show's ratings and its details.`,
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: '/assets/projects/movie-metro.png',
    repo: 'https://github.com/shaqdeff/Movie-Metro',
    demo: 'https://movie-metro.netlify.app/',
  },
  {
    id: 'project-5',
    name: 'this webpage',
    description: 'This is a demo concert website for a music festival called Nyeusi.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: '/assets/projects/nyeusi.png',
    repo: 'https://github.com/shaqdeff/Nyeusi-Fest-Site',
    demo: 'https://shaqdeff.github.io/Nyeusi-Fest-Site/',
  },
];
