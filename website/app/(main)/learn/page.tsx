'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BookOpen, 
  Telescope, 
  Lightbulb, 
  GraduationCap, 
  ArrowRight, 
  Play, 
  Globe,
  Orbit,
  Zap,
  Atom,
  Target,
  Satellite,
  LifeBuoy,
  Earth,
  ExternalLink
} from 'lucide-react'

// Video embed component
const VideoEmbed = ({ videoId, title }: { videoId: string; title: string }) => (
  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
    />
  </div>
)

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
            Learn About Exoplanets
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Discover the fascinating world of planets beyond our solar system through comprehensive lessons 
            covering the fundamentals, detection methods, space missions, and habitability science.
          </p>
        </motion.div>

        {/* Exoplanet Basics Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              <Globe className="inline-block mr-3 text-primary-dark-blue" />
              Exoplanet Basics
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  What are exoplanets?
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  An exoplanet (extrasolar planet) is any planet that orbits a star outside our solar system. 
                  These worlds come in many forms — some may resemble Earth, while others are completely alien, 
                  with extreme temperatures, strange compositions, or unusual orbits.
                </p>
              </div>
            </div>
            <div>
              <VideoEmbed videoId="0ZOhJe_7GrE" title="What are Exoplanets?" />
            </div>
          </div>

          {/* Planet Types */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-8 text-center">
              Planet Types
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Gas Giants",
                  description: "Large planets like Jupiter and Saturn, mostly hydrogen and helium.",
                  color: "bg-orange-500"
                },
                {
                  icon: Atom,
                  title: "Neptunian Planets",
                  description: "Similar to Neptune or Uranus, with thick atmospheres and icy cores.",
                  color: "bg-blue-500"
                },
                {
                  icon: Earth,
                  title: "Super-Earths",
                  description: "Bigger than Earth but smaller than Neptune, possibly rocky and potentially habitable.",
                  color: "bg-green-500"
                },
                {
                  icon: Globe,
                  title: "Terrestrial Planets",
                  description: "Rocky worlds like Earth or Mars, sometimes found in the 'habitable zone.'",
                  color: "bg-red-500"
                }
              ].map((type, index) => (
              <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="card p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className={`p-3 ${type.color} rounded-full w-fit mx-auto mb-4`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    {type.title}
                  </h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {type.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Size Comparisons & Orbital Mechanics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                Size Comparisons
              </h3>
              <ul className="space-y-3 text-light-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-dark-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Some are smaller than Mercury, barely detectable.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-dark-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Others are "Hot Jupiters," so large and close to their stars that they dwarf Earth many times over.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-dark-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Scientists often use Earth-radius (R⊕) and Jupiter-radius (R♃) units to compare sizes and understand their nature.
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                <Orbit className="inline-block mr-2" />
                Orbital Mechanics
              </h3>
              <div className="space-y-3 text-light-text-secondary dark:text-dark-text-secondary">
                <p><strong>Orbital Period (P):</strong> How long it takes to complete one revolution.</p>
                <p><strong>Semi-Major Axis (a):</strong> Average distance from the star.</p>
                <p><strong>Eccentricity (e):</strong> How circular or stretched the orbit is.</p>
                <p><strong>Inclination (i):</strong> Tilt of the orbit as seen from Earth.</p>
                <p className="text-sm mt-4 italic">
                  These orbital properties are crucial for detecting exoplanets and predicting whether a planet could sustain life.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Detection Methods Section */}
        <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              <Telescope className="inline-block mr-3 text-primary-dark-blue" />
              Detection Methods
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue mx-auto"></div>
          </div>

          <div className="space-y-16">
            {/* Transit Photometry */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  <Target className="inline-block mr-2 text-orange-500" />
                  Transit Photometry
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  This is the most widely used method. When a planet passes in front of its host star (as seen from Earth), 
                  it blocks a tiny fraction of the star's light. This creates a small, regular dip in brightness called a transit.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  By carefully measuring these dips, astronomers can determine the planet's size, orbital period, 
                  and even hints about its atmosphere. NASA's Kepler and TESS missions primarily use this method.
                </p>
              </div>
              <VideoEmbed videoId="vka0W8tn4EU" title="Transit Photometry Explained" />
                      </div>

            {/* Radial Velocity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <VideoEmbed videoId="rN7uuqLKv0I" title="Radial Velocity Method" />
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  <Zap className="inline-block mr-2 text-blue-500" />
                  Radial Velocity (Doppler Spectroscopy)
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  As a planet orbits its star, the star itself also wobbles slightly due to gravitational pull. 
                  This wobble causes the star's light spectrum to shift — towards blue when it moves toward us, 
                  and towards red when it moves away.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  This effect is called the Doppler shift. By studying these shifts, scientists can estimate 
                  the planet's mass and orbital characteristics. This method confirmed some of the very first exoplanets.
                        </p>
                      </div>
                    </div>

            {/* Direct Imaging */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  <Globe className="inline-block mr-2 text-green-500" />
                  Direct Imaging
                    </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  Normally, stars are millions of times brighter than their planets, making planets invisible. 
                  But with advanced telescopes and special instruments that block starlight, astronomers can 
                  sometimes directly capture images of exoplanets.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  This method works best for large planets far from their stars, and it allows scientists to study 
                  the atmospheres, colors, and even weather patterns of those worlds.
                </p>
              </div>
              <VideoEmbed videoId="dcuxxeEfuOA" title="Direct Imaging of Exoplanets" />
            </div>

            {/* Gravitational Microlensing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <VideoEmbed videoId="_aZZt8dM-_0" title="Gravitational Microlensing" />
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  <Lightbulb className="inline-block mr-2 text-purple-500" />
                  Gravitational Microlensing
                </h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  When a planet and its host star pass in front of a distant background star, their gravity bends 
                  and magnifies the background star's light — like a natural cosmic magnifying glass.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  If a planet is present, it creates a small but detectable extra signal in the magnification pattern. 
                  This method can find planets that are too far away or too small for other techniques, 
                  even those thousands of light-years from Earth.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Space Missions Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              <Satellite className="inline-block mr-3 text-primary-dark-blue" />
              Space Missions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue mx-auto"></div>
          </div>

          <div className="space-y-16">
            {/* Kepler Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  Kepler Mission (2009–2018)
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Kepler was NASA's first dedicated planet-hunting telescope. It monitored over 150,000 stars continuously 
                  and looked for tiny dips in brightness caused by transiting planets. Kepler alone confirmed more than 
                  2,600 exoplanets and showed that planets are common in our galaxy.
                </p>
              </div>
              <VideoEmbed videoId="G_zcEgx1IgQ" title="Kepler Mission Overview" />
            </div>

            {/* TESS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <VideoEmbed videoId="L837XwH4nqE" title="TESS Mission" />
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  TESS – Transiting Exoplanet Survey Satellite (2018–Present)
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  TESS is Kepler's successor. Instead of staring at one patch of sky, TESS surveys the entire sky, 
                  focusing on the brightest and nearest stars. It discovers planets that are close enough for detailed 
                  follow-up studies with larger telescopes. TESS has already identified thousands of candidates and continues to expand our catalog.
                </p>
                      </div>
                    </div>

            {/* James Webb */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  James Webb Space Telescope (JWST, 2021–Present)
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  JWST is not just a discovery machine but a characterization powerhouse. It studies exoplanet atmospheres 
                  by analyzing starlight passing through them during transits. With its infrared vision, JWST can detect 
                  molecules like water vapor, carbon dioxide, methane, and search for signs of habitability on distant worlds.
                </p>
              </div>
              <VideoEmbed videoId="6VqG3Jazrfs" title="James Webb Space Telescope and Exoplanets" />
            </div>

            {/* Future Missions */}
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6 text-center">
                Future Missions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-4 bg-blue-500/10 rounded-lg mb-4">
                    <Satellite className="h-8 w-8 text-blue-500 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Nancy Grace Roman Space Telescope
                  </h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    NASA, 2027+ → Will use microlensing to find planets, including free-floating ones.
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-4 bg-green-500/10 rounded-lg mb-4">
                    <Telescope className="h-8 w-8 text-green-500 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    ARIEL
                  </h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    ESA, 2029 → Dedicated to studying exoplanet atmospheres in detail.
                  </p>
                    </div>
                <div className="text-center">
                  <div className="p-4 bg-purple-500/10 rounded-lg mb-4">
                    <Globe className="h-8 w-8 text-purple-500 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    PLATO
                  </h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    ESA, 2026 → Will focus on finding Earth-like planets in the habitable zone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Habitability Section */}
        <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              <LifeBuoy className="inline-block mr-3 text-primary-dark-blue" />
              Habitability
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-dark-blue to-primary-light-blue mx-auto"></div>
          </div>

          <div className="space-y-16">
            {/* Habitable Zone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  <Target className="inline-block mr-2 text-green-500" />
                  Habitable Zone
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  The habitable zone, often called the "Goldilocks Zone," is the distance from a star where conditions 
                  may allow liquid water to exist on the surface of a planet. Water is essential for life as we know it, 
                  so planets in this zone are considered prime candidates for habitability.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  The exact size of a star's habitable zone depends on the star's temperature and brightness — 
                  small, cool stars have much tighter zones, while larger, hotter stars have zones much farther out.
                </p>
              </div>
              <VideoEmbed videoId="J04YN9azln8" title="Habitable Zone Explained" />
            </div>

            {/* Atmosphere */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <VideoEmbed videoId="WSDxtH0o7zk" title="Planetary Atmospheres" />
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  <Atom className="inline-block mr-2 text-blue-500" />
                  Atmosphere
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  A planet's atmosphere is its protective blanket of gases, and it plays a critical role in determining 
                  whether life can survive there. Atmospheres regulate temperature by trapping heat (the greenhouse effect), 
                  shield surfaces from harmful radiation, and create conditions for weather and climate.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Scientists look for atmospheric compositions through techniques like transit spectroscopy — 
                  analyzing starlight that passes through a planet's atmosphere. Detecting gases such as oxygen, 
                  methane, or water vapor could be important clues to life-supporting conditions.
                </p>
              </div>
            </div>

            {/* Biosignatures */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="card p-6">
                <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                  <Lightbulb className="inline-block mr-2 text-orange-500" />
                  Biosignatures
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  Biosignatures are scientific clues that point toward the possibility of life. They can be chemical, 
                  such as unusual levels of oxygen, methane, or ozone in an atmosphere; physical, like patterns in surface 
                  reflectivity; or even indirect, such as seasonal changes in gas levels.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  What makes biosignatures powerful is that they cannot easily be explained by non-living processes. 
                  However, care must be taken — some geological processes can mimic biosignatures, so astronomers look 
                  for multiple overlapping signs to strengthen the case.
                </p>
              </div>
              <VideoEmbed videoId="QlvzCGR90_Q" title="Biosignatures and the Search for Life" />
            </div>

            {/* Earth Analog */}
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6 text-center">
                <Earth className="inline-block mr-2 text-green-500" />
                Earth Analog
                    </h3>
              <div className="max-w-4xl mx-auto">
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-center mb-6">
                  An Earth analog is an exoplanet that is strikingly similar to Earth in size, mass, temperature, 
                  and orbital distance from its star. These are the planets most often highlighted in the media as "second Earths."
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-center mb-6">
                  To measure this, astronomers use tools like the Earth Similarity Index (ESI), which compares exoplanets 
                  to Earth on parameters such as radius, density, and surface temperature. Earth analogs are particularly 
                  exciting because they offer the best chance of hosting life as we know it.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-center">
                  Famous examples include Kepler-452b and Proxima Centauri b. While no perfect twin of Earth has been 
                  confirmed yet, the ongoing search continues to bring us closer to finding a true Earth-like world.
                    </p>
                  </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
              Ready to Explore Real Data?
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Put your knowledge to work by exploring actual exoplanet discoveries from NASA&apos;s archive.
            </p>
            <Link
              href="/explorer"
              className="btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
            >
              <Telescope className="h-5 w-5" />
              Start Exploring
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
