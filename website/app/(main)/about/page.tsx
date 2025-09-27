'use client'
import { AnimatedTestimonials } from "../../../components/ui/animated-testimonials";
  
const testimonials = [
  {
    quote:
      "ExoBengal has revolutionized how we approach exoplanet research. The intuitive interface and comprehensive data visualization tools have significantly accelerated our discovery process.",
    name: "Gazi Faysal Jubayer",
    designation: "Lead Developer & Astrophysics Researcher",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The platform's machine learning algorithms and data processing capabilities have transformed our ability to identify potentially habitable exoplanets from NASA's vast datasets.",
    name: "ZHRifat",
    designation: "Data Science Engineer & ML Specialist",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "As an educator, ExoBengal has become an invaluable resource for teaching astronomy. The interactive visualizations make complex concepts accessible to students at all levels.",
    name: "Shihab Ahemed",
    designation: "Backend Developer & Astronomy Education Specialist",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The real-time data integration and advanced analytics features have enabled our research team to process and analyze exoplanet data with unprecedented efficiency and accuracy.",
    name: "KM ShariatUllah",
    designation: "Full Stack Developer & Research Scientist",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "ExoBengal's collaborative features and open-source approach have fostered a vibrant community of researchers, making astronomical discoveries more accessible to the global scientific community.",
    name: "Sauda Fatima",
    designation: "Frontend Developer & UI/UX Designer",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The platform's robust infrastructure and scalable architecture ensure reliable access to mission-critical astronomical data, supporting breakthrough research in exoplanet science.",
    name: "Hamid",
    designation: "DevOps Engineer & System Architect",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
