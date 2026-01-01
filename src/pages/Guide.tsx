import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Droplets, Sun, Thermometer } from "lucide-react";
import aloeImage from "@/assets/plant-aloe.jpg";
import moneyImage from "@/assets/plant-money.jpg";
import cactusImage from "@/assets/plant-cactus.jpg";
import peaceImage from "@/assets/plant-peace-lily.jpg";

interface Plant {
  id: number;
  name: string;
  image: string;
  water: string;
  light: string;
  temp: string;
  funFact: string;
}

const Guide = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const plants: Plant[] = [
    {
      id: 1,
      name: "Aloe Vera",
      image: aloeImage,
      water: "Water every 2-3 weeks",
      light: "Bright, indirect sunlight",
      temp: "15-25°C",
      funFact: "Aloe gel has healing properties for burns and skin irritations!",
    },
    {
      id: 2,
      name: "Money Plant",
      image: moneyImage,
      water: "Water when soil is dry",
      light: "Low to bright indirect light",
      temp: "18-30°C",
      funFact: "Known to bring good luck and prosperity in many cultures!",
    },
    {
      id: 3,
      name: "Cactus",
      image: cactusImage,
      water: "Water every 3-4 weeks",
      light: "Full sun to bright light",
      temp: "20-30°C",
      funFact: "Cacti can live for over 200 years and store water in their stems!",
    },
    {
      id: 4,
      name: "Peace Lily",
      image: peaceImage,
      water: "Keep soil moist",
      light: "Low to medium light",
      temp: "18-24°C",
      funFact: "NASA found peace lilies can filter harmful toxins from the air!",
    },
  ];

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plant Care <span className="text-primary">Guide</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Discover care instructions and fun facts about popular houseplants
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a plant..."
              className="pl-10 shadow-soft"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Plants Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPlants.map((plant, index) => (
            <Card
              key={plant.id}
              className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Plant Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-card">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {plant.name}
                </h3>
              </div>

              {/* Plant Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Droplets className="h-4 w-4 text-status-moisture flex-shrink-0" />
                  <span className="text-muted-foreground">{plant.water}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Sun className="h-4 w-4 text-status-light flex-shrink-0" />
                  <span className="text-muted-foreground">{plant.light}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Thermometer className="h-4 w-4 text-status-temp flex-shrink-0" />
                  <span className="text-muted-foreground">{plant.temp}</span>
                </div>

                {/* Fun Fact */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-primary mb-1">💡 Fun Fact</p>
                  <p className="text-sm text-muted-foreground">{plant.funFact}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-muted-foreground text-lg">No plants found matching "{searchTerm}"</p>
          </div>
        )}

        {/* Care Tips Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Card className="p-8 shadow-card border-2 border-primary/20 bg-gradient-card animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center">
              General <span className="text-primary">Care Tips</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">🌱 Watering</h3>
                <p className="text-sm text-muted-foreground">
                  Check soil moisture before watering. Most plants prefer soil to dry slightly between waterings.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">☀️ Light</h3>
                <p className="text-sm text-muted-foreground">
                  Observe how much natural light your space gets and choose plants accordingly.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">🌡️ Temperature</h3>
                <p className="text-sm text-muted-foreground">
                  Most houseplants thrive in 18-24°C. Avoid placing near drafts or heating vents.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">💨 Humidity</h3>
                <p className="text-sm text-muted-foreground">
                  Many plants enjoy 40-60% humidity. Mist leaves or use a humidifier if needed.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Guide;
