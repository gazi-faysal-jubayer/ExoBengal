import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, Telescope } from 'lucide-react'
import Image from 'next/image'

const footerLinks = {
  explore: {
    title: 'Explore',
    links: [
      { name: 'Exoplanet Explorer', href: '/explorer' },
      { name: '3D Visualizations', href: '/visualizations/3d-systems' },
      { name: 'Statistics', href: '/visualizations/statistics' },
      { name: 'Sky Map', href: '/visualizations/sky-map' },
    ],
  },
  learn: {
    title: 'Learn',
    links: [
      { name: 'Getting Started', href: '/docs/getting-started' },
      { name: 'API Documentation', href: '/docs/api' },
      { name: 'Tutorials', href: '/docs/tutorials' },
      { name: 'Educational Resources', href: '/learn' },
    ],
  },
  community: {
    title: 'Community',
    links: [
      { name: 'GitHub', href: 'https://github.com/gazi-faysal-jubayer/ExoBengal' },
      { name: 'Contributing', href: '/docs/contributing' },
      { name: 'Blog', href: '/blog' },
      { name: 'Support', href: '/support' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'NASA Exoplanet Archive', href: 'https://exoplanetarchive.ipac.caltech.edu/' },
      { name: 'API Access', href: '/api-access' },
      { name: 'Status', href: '/status' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  },
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/gazi-faysal-jubayer/ExoBengal', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Email', href: 'mailto:contact@exobengal.com', icon: Mail },
]

export function Footer() {
  return (
    <footer className="bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <Image 
                            src={"/exobengal.png"}
                            alt="ExoBengal Logo"
                            width={32}
                            height={32}
                            className="h-8 w-48 shadow-sm "
                            />
            </div>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Explore the universe of exoplanets with our interactive visualization platform. 
              Powered by NASA Exoplanet Archive data.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-light-text-secondary hover:text-primary-light-blue dark:text-dark-text-secondary dark:hover:text-primary-light-blue transition-colors"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-light-text-primary dark:text-dark-text-primary">
                  {footerLinks.explore.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.explore.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-light-text-secondary hover:text-primary-light-blue dark:text-dark-text-secondary dark:hover:text-primary-light-blue transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-light-text-primary dark:text-dark-text-primary">
                  {footerLinks.learn.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.learn.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-light-text-secondary hover:text-primary-light-blue dark:text-dark-text-secondary dark:hover:text-primary-light-blue transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-light-text-primary dark:text-dark-text-primary">
                  {footerLinks.community.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.community.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-light-text-secondary hover:text-primary-light-blue dark:text-dark-text-secondary dark:hover:text-primary-light-blue transition-colors"
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-light-text-primary dark:text-dark-text-primary">
                  {footerLinks.resources.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.resources.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-light-text-secondary hover:text-primary-light-blue dark:text-dark-text-secondary dark:hover:text-primary-light-blue transition-colors"
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-light-border dark:border-dark-border pt-8">
          <p className="text-center text-xs text-light-text-secondary dark:text-dark-text-secondary">
            &copy; {new Date().getFullYear()} ExoBengal. All rights reserved. |{' '}
            <Link href="/terms" className="hover:text-primary-light-blue transition-colors">
              Terms of Service
            </Link>{' '}
            |{' '}
            <Link href="/privacy" className="hover:text-primary-light-blue transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

