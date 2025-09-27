'use client'
import { AnimatedTestimonials } from "../../../components/ui/animated-testimonials";
import { Github, Linkedin } from "lucide-react";
  
const testimonials = [
  {
    quote:
      "Expert in full-stack web development, with strong skills in both frontend and backend. He built the entire website infrastructure for ExoBengal and also led the team with effective management and coordination.",
    name: "Gazi Faysal Jubayer",
    designation: "Team Lead",
    src: "/gazi.webp",
    github: "https://github.com/gazi-faysal-jubayer",
    linkedin: "https://www.linkedin.com/in/gazi-faysal-jubayer/",
  },
  {
    quote:
       "With years of experience in exoplanet research, he has led the study, resource collection, and scientific foundation of ExoBengal. He is also the creator of the project’s complete Python package.",
    name: "K M Shariat Ullah",
    designation: "Research Lead",
    src: "/shariat.webp",
    github: "https://github.com/kmshariat",
    linkedin: "https://www.linkedin.com/in/kmshariat/",
  },
  {
    quote:
     'Is a software developer. Integrated AI chatbot assistant "Cosmo". Integrated API from exobengal python package.',
    name: "Zahid Hasan Rifat", 
    designation: "Full stack developer",
    src: "/rifat.webp",
    github: "https://github.com/zh-rifat",
    linkedin: "https://www.linkedin.com/in/zh-rifat/",
  },
  {
    quote:
      "I am a skilled full-stack web developer proficient in modern web technologies like React, Node.js, and Machine Learning.",
    name: "Shihab Ahemed",
    designation: "ML Developer",
    src: "/shihab.webp",
    github: "https://github.com/Shihab221",
    linkedin: "https://www.linkedin.com/in/shihab-ahemed/",
  },
  {
    quote:
       "She generated and structured the core ideas and mission plan for ExoBengal, from defining website features to preparing the project script and voiceover. She also leads the documentation and content development for the team.",
    name: "Sauda Fatima",
    designation: "Ideation & Documentation Lead",
    src: "/sauda.webp",
    github: "https://github.com/sauda-fatima",
    linkedin: "https://www.linkedin.com/in/sauda-fatima",
  },
  {
    quote:
      "Expert in graphic design and visual storytelling, he is responsible for all creative visuals of ExoBengal. He also takes full charge of video design and production for the team.",
    name: "Shabique Islam",
    designation: "Graphic Designer",
    src: "/sabiq.webp",
    github: "https://github.com/shabiq",
    linkedin: "https://www.linkedin.com/in/shabique-islam-8b9b501b3/",
  },
];

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Meet Team ExoBengal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate researchers, developers, and educators dedicated to making exoplanet science accessible to everyone through innovative technology and open-source collaboration.
          </p>
        </div>

        {/* Animated Testimonials */}
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To democratize access to exoplanet research by providing intuitive tools for data exploration, 
              visualization, and analysis. We believe that everyone should be able to participate in the 
              exciting journey of discovering worlds beyond our solar system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
