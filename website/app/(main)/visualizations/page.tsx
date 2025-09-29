'use client'

export default function VisualizationsPage() {
  return (
    <div className="h-screen w-full">
      <iframe
        src="https://eyes.nasa.gov/apps/exo/"
        title="NASA Eyes on Exoplanets"
        className="w-full h-full border-0"
        loading="eager"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
