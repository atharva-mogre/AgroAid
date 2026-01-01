import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Thermometer, Sun, Sprout } from "lucide-react";
import heroImage from "@/assets/hero-plant.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-mint rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-emerald rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-sage rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium text-primary border border-primary/20">
                🌱 Smart Plant Care Assistant
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-emerald bg-clip-text text-transparent">
                  Smart Plant Care,
                </span>
                <br />
                <span className="text-foreground">Simplified</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Monitor. Nurture. Thrive – Let your plants grow effortlessly with AgroAid's automated health monitoring and smart watering system.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/dashboard">
                  <Button size="lg" className="group shadow-hover">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/guide">
                  <Button size="lg" variant="outline" className="shadow-soft">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft border border-border">
                  <Droplets className="h-4 w-4 text-status-moisture" />
                  <span className="text-sm">Moisture Monitor</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft border border-border">
                  <Thermometer className="h-4 w-4 text-status-temp" />
                  <span className="text-sm">Temperature</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft border border-border">
                  <Sun className="h-4 w-4 text-status-light" />
                  <span className="text-sm">Light Tracking</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-slide-up">
              <div className="relative rounded-3xl overflow-hidden shadow-hover">
                <img
                  src={heroImage}
                  alt="Smart plant in IoT pot"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating Status Card */}
              <div className="absolute bottom-8 left-8 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-hover border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sprout className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Plant Status</div>
                    <div className="text-xs text-muted-foreground">Healthy & Thriving</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">AgroAid</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Combining cutting-edge technology with nature's needs for the perfect plant care solution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💻",
                title: "Smart Monitoring",
                description: "Real-time tracking of soil moisture, temperature, humidity, and light levels with IoT sensors",
                color: "bg-status-moisture/10 border-status-moisture/20"
              },
              {
                icon: "⚡",
                title: "Auto Watering",
                description: "Automated watering system that responds to your plant's exact needs, preventing over or under-watering",
                color: "bg-status-humidity/10 border-status-humidity/20"
              },
              {
                icon: "📱",
                title: "Easy Dashboard",
                description: "Beautiful, intuitive interface to monitor all your plants and get care recommendations instantly",
                color: "bg-primary/10 border-primary/20"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border ${feature.color} bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-grow" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-white rounded-full blur-2xl animate-grow" style={{ animationDelay: "2s" }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Plant Care?
            </h2>
            <p className="text-xl text-white/90">
              Join AgroAid today and give your plants the care they deserve with smart, automated monitoring.
            </p>
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="shadow-hover group mt-4">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
