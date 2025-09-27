'use client'
import { AnimatedTestimonials } from "../../../components/ui/animated-testimonials";
import { Github, Linkedin } from "lucide-react";
  
const testimonials = [
  {
    quote:
      "ExoBengal has revolutionized how we approach exoplanet research. The intuitive interface and comprehensive data visualization tools have significantly accelerated our discovery process.",
    name: "Gazi Faysal Jubayer",
    designation: "Lead Developer & Astrophysics Researcher",
    src: "/gazi.webp",
    github: "https://github.com/gazi-faysal-jubayer",
    linkedin: "https://www.linkedin.com/in/gazi-faysal-jubayer",
  },
  {
    quote:
      "The platform's machine learning algorithms and data processing capabilities have transformed our ability to identify potentially habitable exoplanets from NASA's vast datasets.",
    name: "ZHRifat",
    designation: "Data Science Engineer & ML Specialist",
    src: "/rifat.webp",
    github: "https://github.com/zhrifat",
    linkedin: "https://www.linkedin.com/in/zhrifat",
  },
  {
    quote:
      "As an educator, ExoBengal has become an invaluable resource for teaching astronomy. The interactive visualizations make complex concepts accessible to students at all levels.",
    name: "Shihab Ahemed",
    designation: "Backend Developer & Astronomy Education Specialist",
    src: "/shihab.webp",
    github: "https://github.com/shihab-ahemed",
    linkedin: "https://www.linkedin.com/in/shihab-ahemed",
  },
  {
    quote:
      "The real-time data integration and advanced analytics features have enabled our research team to process and analyze exoplanet data with unprecedented efficiency and accuracy.",
    name: "KM ShariatUllah",
    designation: "Full Stack Developer & Research Scientist",
    src: "/shariat.webp",
    github: "https://github.com/km-shariatullah",
    linkedin: "https://www.linkedin.com/in/km-shariatullah",
  },
  {
    quote:
      "ExoBengal's collaborative features and open-source approach have fostered a vibrant community of researchers, making astronomical discoveries more accessible to the global scientific community.",
    name: "Sauda Fatima",
    designation: "Frontend Developer & UI/UX Designer",
    src: "/sauda.webp",
    github: "https://github.com/sauda-fatima",
    linkedin: "https://www.linkedin.com/in/sauda-fatima",
  },
  {
    quote:
      "The platform's robust infrastructure and scalable architecture ensure reliable access to mission-critical astronomical data, supporting breakthrough research in exoplanet science.",
    name: "Shabiq", 
    designation: "DevOps Engineer & System Architect",
    src: "/sabiq.webp",
    github: "https://github.com/shabiq",
    linkedin: "https://www.linkedin.com/in/shabiq",
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
