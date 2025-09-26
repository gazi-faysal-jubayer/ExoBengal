'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, ExternalLink, Heart, Users, Database, Telescope } from 'lucide-react'
import React from "react";
import Section from "../../../components/home/Section";
import { GradientLight } from "../../../public/assets/Benefits";
import ClipPath from "../../../public/assets/ClipPath";
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Gazi Faysal Jubayer',
    role: 'Lead Developer',
    bio: 'Passionate about space exploration and data visualization',
    github: 'https://github.com/gazi-faysal-jubayer',
    backgroundUrl: "../../../assets/benefits/card-1.svg",
    imageUrl: "../../../assets/benefits/image-2.png",
  },
  {
    name: 'ZHRifat',
    role: ' Developer',
    bio: 'Passionate about space exploration and data visualization',
    github: 'https://github.com/gazi-faysal-jubayer',
    backgroundUrl: "../../../assets/benefits/card-2.svg",
    imageUrl: "../../../assets/benefits/image-2.png",
  },
  {
    name: 'Shihab Ahemed',
    role: ' Developer',
    bio: 'Passionate about space exploration and data visualization',
    github: 'https://github.com/gazi-faysal-jubayer',
    backgroundUrl: "../../../assets/benefits/card-3.svg",
    imageUrl: "../../../assets/benefits/image-2.png",
  },
  {
    name: 'KM ShariatUllah',
    role: ' Developer',
    bio: 'Passionate about space exploration and data visualization',
    github: 'https://github.com/gazi-faysal-jubayer',
    backgroundUrl: "../../../assets/benefits/card-4.svg",
    imageUrl: "../../../assets/benefits/image-2.png",
  },
  {
    name: 'Sauda Fatima',
    role: ' Developer',
    bio: 'Passionate about space exploration and data visualization',
    github: 'https://github.com/gazi-faysal-jubayer',
    backgroundUrl: "../../../assets/benefits/card-1.svg",
    imageUrl: "../../../assets/benefits/image-2.png",
  },
  {
    name: 'Hamid',
    role: ' Developer',
    bio: 'Passionate about space exploration and data visualization',
    github: 'https://github.com/gazi-faysal-jubayer',
    backgroundUrl: "../../../assets/benefits/card-2.svg",
    imageUrl: "../../../assets/benefits/image-2.png",
  },
]

const dataSources = [
  {
    name: 'NASA Exoplanet Archive',
    description: 'Primary source for confirmed exoplanet data and discoveries',
    url: 'https://exoplanetarchive.ipac.caltech.edu/',
    logo: '🚀',
  },
  {
    name: 'IPAC/Caltech',
    description: 'Infrared Processing and Analysis Center data services',
    url: 'https://www.ipac.caltech.edu/',
    logo: '🔭',
  },
  {
    name: 'NASA/JPL',
    description: 'Jet Propulsion Laboratory mission data and resources',
    url: 'https://www.jpl.nasa.gov/',
    logo: '🛰️',
  },
]

const acknowledgments = [
  'NASA Ames Research Center',
  'California Institute of Technology',
  'IPAC (Infrared Processing and Analysis Center)',
  'Kepler Mission Team',
  'TESS Mission Team',
  'Open Source Community',
]


const benefits = [
    {
      id: "0",
      title: "Ask anything",
      text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
      backgroundUrl: "../../../assets/benefits/card-1.svg",
      
      imageUrl: "../../../assets/benefits/image-2.png",
    },
    {
      id: "1",
      title: "Improve everyday",
      text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
      backgroundUrl: "../../../assets/benefits/card-2.svg",
      
      imageUrl: "../../../assets/benefits/image-2.png",
      light: true,
    },
    {
      id: "2",
      title: "Connect everywhere",
      text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
      backgroundUrl: "../../../assets/benefits/card-3.svg",
      
      imageUrl: "../../../assets/benefits/image-2.png",
    },
    {
      id: "3",
      title: "Fast responding",
      text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
      backgroundUrl: "../../../assets/benefits/card-4.svg",
      
      imageUrl: "../../../assets/benefits/image-2.png",
      light: true,
    },
    {
      id: "4",
      title: "Ask anything",
      text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
      backgroundUrl: "../../../assets/benefits/card-1.svg",
      
      imageUrl: "../../../assets/benefits/image-2.png",
    },
    {
      id: "5",
      title: "Improve everyday",
      text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
      backgroundUrl: "../../../assets/benefits/card-2.svg",
      
      imageUrl: "../../../assets/benefits/image-2.png",
    },
  ];
  
const page = () => {
  return (
    <Section id="features">
      <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            About ExoBengal
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            ExoBengal is an open-source platform dedicated to making NASA&apos;s exoplanet data 
            accessible, interactive, and educational for researchers, students, and space enthusiasts worldwide.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="card p-8 text-center">
            <Telescope className="h-16 w-16 mx-auto mb-6 text-primary-dark-blue" />
            <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-4xl mx-auto">
              To democratize access to exoplanet research by providing intuitive tools for data exploration, 
              visualization, and analysis. We believe that everyone should be able to participate in the 
              exciting journey of discovering worlds beyond our solar system.
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary text-center mb-12">
            What We Offer
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <Database className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                Real-time Data
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Direct access to NASA&apos;s Exoplanet Archive with daily updates and comprehensive planet catalogs.
              </p>
            </div>

            <div className="card p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                Educational Tools
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Interactive learning modules, simulations, and resources for students and educators.
              </p>
            </div>

            <div className="card p-6 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                Open Source
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Free, open-source software that encourages collaboration and community contributions.
              </p>
            </div>
          </div>
        </motion.section> */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary text-center mb-12">
            What We Offer
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                style={{ 
                  border: '2px solid',
                  borderImage: 'linear-gradient(to right, #62c2f9, #bbcffd) 1'
                }}>
              <Database className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                Real-time Data
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Direct access to NASA&apos;s Exoplanet Archive with daily updates and comprehensive planet catalogs.
              </p>
            </div>

            <div className="card p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                style={{ 
                  border: '2px solid',
                  borderImage: 'linear-gradient(to right, #62c2f9, #bbcffd) 1'
                }}>
              <Users className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                Educational Tools
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Interactive learning modules, simulations, and resources for students and educators.
              </p>
            </div>

            <div className="card p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                style={{ 
                  border: '2px solid',
                  borderImage: 'linear-gradient(to right, #62c2f9, #bbcffd) 1',
                  
                }}>
              <Heart className="h-12 w-12 mx-auto mb-4 text-primary-dark-blue" />
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                Open Source
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Free, open-source software that encourages collaboration and community contributions.
              </p>
            </div>
          </div>
        </motion.section>

      <div className="container relative z-2">
        {/* <Heading
          classname="md:max-w-md lg:max-w-2xl"
          title="Chat Smarter, Not Harder with Brainwave"
        /> */}

        <h4 className='text-4xl font-bold text-center mb-10'>Team ExoBengal</h4>
        <div className="flex flex-wrap gap-4 mb-10">
          
          {teamMembers.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.name}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                
                <div className='flex flex-row items-center'>
                      <Image
                      src={"/shihab.png"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-24 h-48 rounded-md object-cover mb-4"
                    />  
                    <p className="body-2 mb-6 text-n-3 px-4"> {item.bio} </p>
                  </div>
                  <h5 className="h5 mb-5 items-center font-bold text-lg bg-gradient-to-r from-sky-400 to-purple-200 bg-clip-text text-transparent text-center">{item.name}</h5>
                
                <div className="flex items-center mt-auto">
                  {/* <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  /> */}
                  <p>
                    <Link
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-dark-blue dark:text-primary-light-blue hover:underline inline-flex items-center gap-1"
                    >
                      {item.role} <ExternalLink className="h-3 w-3" />
                    </Link>
                  </p>
                  <p className="ml-auto font-code text-xs font-bold bg-gradient-to-r from-sky-400 to-purple-200 bg-clip-text text-transparent uppercase tracking-wider ">
                    Explore More
                  </p>

            
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10 cursor-pointer">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>

        {/* Data Sources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary text-center mb-12">
            Data Sources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataSources.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="card p-6"
              >
                <div className="text-4xl mb-4">{source.logo}</div>
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                  {source.name}
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  {source.description}
                </p>
                <Link
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-dark-blue dark:text-primary-light-blue hover:underline text-sm"
                >
                  Visit Site
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Acknowledgments */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <div className="card p-8 text-center">
            <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
              Acknowledgments
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              We are grateful to the following organizations and teams whose work makes ExoBengal possible:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {acknowledgments.map((org, index) => (
                <motion.div
                  key={org}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                  className="p-3 bg-light-surface dark:bg-dark-surface rounded-lg"
                >
                  <p className="text-sm text-light-text-primary dark:text-dark-text-primary">
                    {org}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contributing */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <Github className="h-16 w-16 mx-auto mb-6 text-primary-dark-blue" />
            <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              Open Source & Contributing
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              ExoBengal is open source and welcomes contributions from developers, scientists, and educators. 
              Help us improve the platform and make exoplanet research more accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/gazi-faysal-jubayer/ExoBengal"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 inline-flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Link>
              <Link
                href="/docs/contributing"
                className="btn-secondary px-6 py-3 inline-flex items-center gap-2"
              >
                Contributing Guide
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
    

      
    </Section>
  );
};
export default page;
