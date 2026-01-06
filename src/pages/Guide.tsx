import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Droplets, Sun, Thermometer, Cpu, Zap, Settings, Cable } from "lucide-react";
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
  difficulty: "Easy" | "Medium" | "Hard";
  humidity: string;
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
      humidity: "30-50%",
      difficulty: "Easy",
      funFact: "Aloe gel has healing properties for burns and skin irritations!",
    },
    {
      id: 2,
      name: "Money Plant",
      image: moneyImage,
      water: "Water when soil is dry",
      light: "Low to bright indirect light",
      temp: "18-30°C",
      humidity: "40-60%",
      difficulty: "Easy",
      funFact: "Known to bring good luck and prosperity in many cultures!",
    },
    {
      id: 3,
      name: "Cactus",
      image: cactusImage,
      water: "Water every 3-4 weeks",
      light: "Full sun to bright light",
      temp: "20-30°C",
      humidity: "10-30%",
      difficulty: "Easy",
      funFact: "Cacti can live for over 200 years and store water in their stems!",
    },
    {
      id: 4,
      name: "Peace Lily",
      image: peaceImage,
      water: "Keep soil moist",
      light: "Low to medium light",
      temp: "18-24°C",
      humidity: "50-60%",
      difficulty: "Medium",
      funFact: "NASA found peace lilies can filter harmful toxins from the air!",
    },
    {
      id: 5,
      name: "Snake Plant",
      image: aloeImage,
      water: "Water every 2-6 weeks",
      light: "Low to bright indirect",
      temp: "15-27°C",
      humidity: "30-50%",
      difficulty: "Easy",
      funFact: "Releases oxygen at night, making it perfect for bedrooms!",
    },
    {
      id: 6,
      name: "Spider Plant",
      image: moneyImage,
      water: "Water weekly",
      light: "Bright, indirect light",
      temp: "13-27°C",
      humidity: "40-60%",
      difficulty: "Easy",
      funFact: "Produces baby plantlets that can be propagated easily!",
    },
    {
      id: 7,
      name: "Rubber Plant",
      image: cactusImage,
      water: "Water every 1-2 weeks",
      light: "Medium to bright indirect",
      temp: "16-24°C",
      humidity: "40-60%",
      difficulty: "Medium",
      funFact: "Its sap was once used to make rubber before synthetic alternatives!",
    },
    {
      id: 8,
      name: "Pothos",
      image: peaceImage,
      water: "Water when top soil dry",
      light: "Low to bright indirect",
      temp: "18-30°C",
      humidity: "50-70%",
      difficulty: "Easy",
      funFact: "Can grow over 10 feet long and purifies indoor air!",
    },
    {
      id: 9,
      name: "Fiddle Leaf Fig",
      image: aloeImage,
      water: "Water every 1-2 weeks",
      light: "Bright, indirect light",
      temp: "18-24°C",
      humidity: "30-65%",
      difficulty: "Hard",
      funFact: "Native to West African rainforests and can grow 50 feet tall!",
    },
    {
      id: 10,
      name: "ZZ Plant",
      image: moneyImage,
      water: "Water every 2-3 weeks",
      light: "Low to bright indirect",
      temp: "18-26°C",
      humidity: "40-50%",
      difficulty: "Easy",
      funFact: "Can survive months without water due to its rhizome roots!",
    },
    {
      id: 11,
      name: "Boston Fern",
      image: cactusImage,
      water: "Keep consistently moist",
      light: "Indirect light, no direct sun",
      temp: "16-24°C",
      humidity: "50-80%",
      difficulty: "Medium",
      funFact: "Excellent air humidifier and removes formaldehyde from air!",
    },
    {
      id: 12,
      name: "Jade Plant",
      image: peaceImage,
      water: "Water every 2-3 weeks",
      light: "Bright light, some direct sun",
      temp: "18-24°C",
      humidity: "30-50%",
      difficulty: "Easy",
      funFact: "Symbolizes good luck and can live for over 100 years!",
    },
  ];

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "Medium": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "Hard": return "bg-red-500/20 text-red-700 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plant Care <span className="text-primary">Guide</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Discover care instructions, fun facts, and IoT integration for smart plant monitoring
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="plants" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="plants">🌱 Plant Library</TabsTrigger>
            <TabsTrigger value="hardware">🔧 Hardware Setup</TabsTrigger>
          </TabsList>

          {/* Plants Tab */}
          <TabsContent value="plants" className="animate-fade-in">
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-12">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a plant..."
                className="pl-10 shadow-soft"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Plants Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPlants.map((plant, index) => (
                <Card
                  key={plant.id}
                  className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Plant Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className={`absolute top-3 right-3 ${getDifficultyColor(plant.difficulty)}`}>
                      {plant.difficulty}
                    </Badge>
                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                      {plant.name}
                    </h3>
                  </div>

                  {/* Plant Info */}
                  <div className="p-5 space-y-3">
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
                      <span className="text-muted-foreground">{plant.temp} • {plant.humidity} humidity</span>
                    </div>

                    {/* Fun Fact */}
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs font-semibold text-primary mb-1">💡 Fun Fact</p>
                      <p className="text-xs text-muted-foreground">{plant.funFact}</p>
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
          </TabsContent>

          {/* Hardware Tab */}
          <TabsContent value="hardware" className="animate-fade-in space-y-8">
            {/* ESP32 Section */}
            <Card className="p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">ESP32 Microcontroller</h2>
                  <p className="text-muted-foreground">The brain of your smart plant system</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Key Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Dual-core processor up to 240MHz</li>
                    <li>• Built-in WiFi & Bluetooth</li>
                    <li>• Multiple GPIO pins for sensors</li>
                    <li>• Low power consumption</li>
                    <li>• ADC for analog sensor readings</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Pin Connections</h3>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-xs">
                    <p>Moisture Sensor → GPIO34 (ADC)</p>
                    <p>Water Pump → GPIO25 (PWM)</p>
                    <p>VCC → 3.3V / 5V</p>
                    <p>GND → Ground</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Capacitive Moisture Sensor */}
            <Card className="p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-status-moisture/20">
                  <Droplets className="h-8 w-8 text-status-moisture" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Capacitive Soil Moisture Sensor</h2>
                  <p className="text-muted-foreground">Corrosion-resistant moisture detection</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Specifications</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-medium">Operating Voltage:</span> 3.3V ~ 5.5V DC</li>
                    <li><span className="font-medium">Output Voltage:</span> 0V ~ 3.0V DC</li>
                    <li><span className="font-medium">Interface:</span> PH2.54-3P</li>
                    <li><span className="font-medium">Output Type:</span> Analog signal</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Pin Configuration</h3>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">AOUT</Badge>
                    <span className="text-sm text-muted-foreground">Analog Signal Output</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">GND</Badge>
                    <span className="text-sm text-muted-foreground">Ground</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">VCC</Badge>
                    <span className="text-sm text-muted-foreground">Power (3.3V-5.5V)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Calibration Values</h3>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p className="text-muted-foreground"><span className="font-medium">Dry Soil:</span> ~3.0V (high)</p>
                    <p className="text-muted-foreground"><span className="font-medium">Wet Soil:</span> ~1.0V (low)</p>
                    <p className="text-muted-foreground mt-2 text-xs">Note: Calibrate based on your soil type</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Mini Water Pump */}
            <Card className="p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Zap className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Mini Water Pump</h2>
                  <p className="text-muted-foreground">Submersible DC pump for auto-watering</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Specifications</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-medium">Rated Voltage:</span> DC 3V or 4.5V</li>
                    <li><span className="font-medium">Rated Current:</span> 0.18A (load)</li>
                    <li><span className="font-medium">Flow Rate:</span> 100L/H (no load)</li>
                    <li><span className="font-medium">Type:</span> Submersible</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Power Requirements</h3>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
                    <p className="text-muted-foreground"><span className="font-medium">Power:</span> ~0.54W - 0.81W</p>
                    <p className="text-muted-foreground"><span className="font-medium">Driver:</span> Use transistor/relay</p>
                    <p className="text-yellow-600 text-xs mt-2">⚠️ Do not connect directly to ESP32 GPIO!</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Wiring with Driver</h3>
                  <div className="font-mono text-xs bg-muted/50 rounded-lg p-4">
                    <p>ESP32 GPIO25 → Transistor Base</p>
                    <p>Transistor Collector → Pump (-)</p>
                    <p>External 3V/4.5V → Pump (+)</p>
                    <p>Transistor Emitter → GND</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Wiring Diagram */}
            <Card className="p-8 shadow-card border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Cable className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Complete Wiring Setup</h2>
                  <p className="text-muted-foreground">Connect all components together</p>
                </div>
              </div>
              <div className="bg-muted/30 rounded-xl p-6">
                <pre className="text-xs md:text-sm font-mono text-muted-foreground overflow-x-auto">
{`┌─────────────────────────────────────────────────────────────┐
│                        ESP32 WIRING                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐         ┌──────────────────────┐         │
│   │   ESP32     │         │  Capacitive Sensor   │         │
│   │             │         │                      │         │
│   │   GPIO34 ◄──┼─────────┼── AOUT (Analog Out)  │         │
│   │   3.3V ─────┼─────────┼── VCC                │         │
│   │   GND ──────┼─────────┼── GND                │         │
│   │             │         └──────────────────────┘         │
│   │             │                                          │
│   │             │         ┌──────────────────────┐         │
│   │             │         │   NPN Transistor     │         │
│   │   GPIO25 ───┼─────────┼── Base (1kΩ resistor)│         │
│   │             │         │   Collector ─────────┼── Pump -│
│   │   GND ──────┼─────────┼── Emitter            │         │
│   └─────────────┘         └──────────────────────┘         │
│                                                             │
│   External Power (3V-4.5V) ─────────────────────── Pump +  │
│                                                             │
└─────────────────────────────────────────────────────────────┘`}
                </pre>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Safety Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Always use a transistor/relay for the pump</li>
                    <li>• Add a flyback diode across the pump</li>
                    <li>• Keep water away from electronics</li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">📋 Required Components</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 1x ESP32 Dev Board</li>
                    <li>• 1x Capacitive Moisture Sensor</li>
                    <li>• 1x Mini Water Pump (DC 3V/4.5V)</li>
                    <li>• 1x NPN Transistor (2N2222/BC547)</li>
                    <li>• 1x 1kΩ Resistor</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Sample Code */}
            <Card className="p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <Settings className="h-8 w-8 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Sample Arduino Code</h2>
                  <p className="text-muted-foreground">Basic ESP32 code for moisture monitoring & auto-watering</p>
                </div>
              </div>
              <div className="bg-zinc-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-xs md:text-sm font-mono text-green-400">
{`#define MOISTURE_PIN 34    // Analog input for sensor
#define PUMP_PIN 25        // PWM output for pump
#define DRY_THRESHOLD 2800 // Adjust based on calibration
#define WET_THRESHOLD 1200 // Adjust based on calibration

void setup() {
  Serial.begin(115200);
  pinMode(PUMP_PIN, OUTPUT);
  digitalWrite(PUMP_PIN, LOW);
}

void loop() {
  int moistureValue = analogRead(MOISTURE_PIN);
  int moisturePercent = map(moistureValue, DRY_THRESHOLD, 
                            WET_THRESHOLD, 0, 100);
  moisturePercent = constrain(moisturePercent, 0, 100);
  
  Serial.print("Moisture: ");
  Serial.print(moisturePercent);
  Serial.println("%");
  
  // Auto-water if soil is too dry
  if (moisturePercent < 30) {
    digitalWrite(PUMP_PIN, HIGH);
    delay(2000);  // Water for 2 seconds
    digitalWrite(PUMP_PIN, LOW);
    delay(30000); // Wait 30s before checking again
  }
  
  delay(1000);
}`}
                </pre>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Guide;
