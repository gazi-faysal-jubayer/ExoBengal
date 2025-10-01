import { Metadata } from 'next'
import { getModuleBySlug } from '@/lib/learn-modules'
import { generateArticleSchema, generateBreadcrumbListSchema, jsonLdScriptProps } from '@/lib/structured-data'

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const module = getModuleBySlug(params.slug)
  
  if (module) {
    const topics = module.topics.join(', ')
    return {
      title: `${module.title} | Learn | ExoBengal`,
      description: `${module.description} Learn about ${topics} through interactive lessons, videos, and comprehensive explanations.`,
      keywords: [
        ...module.topics,
        module.difficulty.toLowerCase(),
        'exoplanet education',
        'astronomy lessons',
        'space science',
        'planetary science',
        'astrophysics'
      ],
      openGraph: {
        title: `${module.title} | Learn | ExoBengal`,
        description: `${module.description} Learn about ${topics} through interactive lessons, videos, and comprehensive explanations.`,
        url: `https://exo-bengal.vercel.app/learn/${params.slug}`,
        type: 'article',
        images: [
          {
            url: 'https://exo-bengal.vercel.app/exobengal.png',
            width: 1200,
            height: 630,
            alt: `${module.title} - ExoBengal Learning Module`
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: `${module.title} | Learn | ExoBengal`,
        description: `${module.description} Learn about ${topics} through interactive lessons, videos, and comprehensive explanations.`,
        images: ['https://exo-bengal.vercel.app/exobengal.png']
      },
      alternates: {
        canonical: `https://exo-bengal.vercel.app/learn/${params.slug}`
      }
    }
  }
  
  return {
    title: 'Learning Module | ExoBengal',
    description: 'Explore comprehensive learning modules about exoplanets, detection methods, space missions, and habitability.',
    openGraph: {
      title: 'Learning Module | ExoBengal',
      description: 'Explore comprehensive learning modules about exoplanets, detection methods, space missions, and habitability.',
      url: `https://exo-bengal.vercel.app/learn/${params.slug}`,
      type: 'article'
    }
  }
}

export default async function ModuleLayout({ children, params }: Props) {
  const module = getModuleBySlug(params.slug)
  
  if (module) {
    const articleSchema = generateArticleSchema({
      headline: module.title,
      description: module.description,
      url: `https://exo-bengal.vercel.app/learn/${params.slug}`,
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0]
    })
    
    const breadcrumbSchema = generateBreadcrumbListSchema([
      { name: 'Home', url: 'https://exo-bengal.vercel.app/' },
      { name: 'Learn', url: 'https://exo-bengal.vercel.app/learn' },
      { name: module.title, url: `https://exo-bengal.vercel.app/learn/${params.slug}` }
    ])
    
    return (
      <>
        <script
          {...jsonLdScriptProps(articleSchema)}
          type="application/ld+json"
        />
        <script
          {...jsonLdScriptProps(breadcrumbSchema)}
          type="application/ld+json"
        />
        {children}
      </>
    )
  }
  
  return <>{children}</>
}