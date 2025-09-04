import AnimatedPookalam from "@/components/animated-pookalam"
import PookalamInfo from "@/components/pookalam-info"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-center py-16 px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-ombre mb-8 tracking-wider font-bungee-shade">
          CODE-A-POOKALAM
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Experience the traditional art of Kerala's flower carpet through digital animation
        </p>
      </header>

      {/* Main Pookalam Section */}
      <main className="container mx-auto px-4 pb-16">
        <AnimatedPookalam />
        <PookalamInfo />
      </main>
    </div>
  )
}
