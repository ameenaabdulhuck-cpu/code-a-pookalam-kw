import { Card } from "@/components/ui/card"

export default function PookalamInfo() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">The Beauty and Significance of Pookalam</h2>
      </div>

      <Card className="bg-card p-8 space-y-6">
        <p className="text-card-foreground leading-relaxed text-center">
          Pookalam is a traditional floral carpet art form from Kerala, India, created during the Onam festival. The
          word "pookalam" comes from two Malayalam words - "poo" (flower) and "kalam" (design or art).
        </p>

        <p className="text-card-foreground leading-relaxed text-center">
          These intricate arrangements welcome King Mahabali, the legendary ruler who returns to visit his people during
          Onam. Each flower carries deep symbolic significance - marigolds represent courage and strength, lotus
          symbolizes purity and divinity, jasmine denotes hope and prosperity, and roses express love and devotion.
        </p>

        <p className="text-card-foreground leading-relaxed text-center">
          The traditional creation process starts from the center and works outward in concentric circles, with new
          layers added daily during the 10-day festival period. This gradual building represents the growing
          anticipation and joy as the festival approaches its climax.
        </p>

        <p className="text-card-foreground leading-relaxed text-center">
          Beyond its aesthetic beauty, Pookalam serves as a symbol of unity, bringing families and communities together
          in celebration. It represents the harmony between nature and human creativity, embodying the spirit of Onam -
          a time of homecoming, abundance, and cultural pride.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <span className="px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
            Traditional Art
          </span>
          <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
            Cultural Heritage
          </span>
          <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">Onam Festival</span>
          <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium">
            Kerala Tradition
          </span>
        </div>
      </Card>
    </div>
  )
}
