import TargetCursorDemo from '@/components/ui/target-cursor-demo'

export const metadata = {
  title: 'Demo | ExoBengal',
  description: 'Interactive demonstrations of ExoBengal features.',
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            ExoBengal Demo
          </h1>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Explore interactive demonstrations of our features
          </p>
        </div>

        <div className="grid gap-8">
          {/* NASA Visualizations Section */}
          <section>
            <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
              NASA Exoplanet Visualizations
            </h2>
            <div className="relative h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
              <iframe
                src="https://eyes.nasa.gov/apps/exo/#/planet/HIP_65426_b"
                title="NASA Eyes on Exoplanets - HIP 65426 b"
                className="w-full h-full border-0"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </section>

          {/* Target Cursor Demo */}
          <section>
            <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
              Interactive Components
            </h2>
            <TargetCursorDemo />
          </section>
        </div>
      </div>
    </div>
  )
}
