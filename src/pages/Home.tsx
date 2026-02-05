import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Thermometer, Sun, Sprout, Wind, Activity } from "lucide-react";
import heroImage from "@/assets/hero-plant.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-70 animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] opacity-70 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] opacity-40 mix-blend-multiply dark:mix-blend-overlay" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-2xl animate-pulse" />

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-full text-sm font-medium text-primary border border-primary/10 shadow-sm animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Smart Plant Care Assistant
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
                <span className="block text-foreground drop-shadow-sm">Thrive</span>
                <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Naturally.
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Experience the future of gardening with AgroAid. We combine advanced IoT sensors with intuitive design to help your plants flourish effortlessly.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/dashboard">
                  <Button size="lg" className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 text-base">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/guide">
                  <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-2 hover:bg-secondary/50 hover:text-primary transition-all duration-300 text-base">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Stats/Features Row */}
              <div className="grid grid-cols-3 gap-6 pt-12 border-t border-primary/10">
                {[
                  { label: "Active Users", value: "2K+" },
                  { label: "Plants Saved", value: "15K+" },
                  { label: "Sensor Accuracy", value: "99%" },
                ].map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image / Visual */}
            <div className="relative animate-slide-up lg:h-[600px] flex items-center justify-center">
              {/* Main Image Holder */}
              <div className="relative w-full max-w-lg aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white/30 dark:border-black/30 backdrop-blur-sm z-20">
                <img
                  src={heroImage}
                  alt="Smart plant in IoT pot"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Floating In-Image Interface */}
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-2xl border-white/20">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-1">Status</p>
                      <h3 className="text-white text-xl font-bold flex items-center gap-2">
                        <Activity className="h-5 w-5 text-emerald-400" />
                        Optimal Growth
                      </h3>
                    </div>
                    <div className="text-white/90 font-mono text-sm bg-black/20 px-3 py-1 rounded-full">
                      24°C / 65%
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements Behind */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-mint rounded-full blur-2xl animate-float opacity-60" />
              <div className="absolute -bottom-5 -left-10 w-40 h-40 bg-emerald/20 rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: '3s' }} />

              {/* Floating Feature Cards */}
              <div className="absolute top-20 -right-8 glass-card p-4 rounded-2xl shadow-xl animate-float z-30 hidden lg:block" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Moisture</p>
                    <p className="text-sm font-bold">Perfect (45%)</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-40 -left-12 glass-card p-4 rounded-2xl shadow-xl animate-float z-30 hidden lg:block" style={{ animationDelay: "2.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
                    <Sun className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Light</p>
                    <p className="text-sm font-bold">High Exposure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Why Choose <span className="text-primary italic">AgroAid</span>?
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              We've reimagined plant care by combining cutting-edge technology with the fundamental needs of nature.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line decoration */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10 hidden md:block" />

            {[
              {
                icon: Activity,
                title: "Smart Monitoring",
                description: "Real-time accuracy for soil moisture, temperature, and light conditions.",
                bg: "bg-blue-50 dark:bg-blue-900/10",
                text: "text-blue-600 dark:text-blue-400"
              },
              {
                icon: Droplets,
                title: "Auto Watering",
                description: "Precision watering system that adapts to your plant's specific hydration needs.",
                bg: "bg-emerald-50 dark:bg-emerald-900/10",
                text: "text-emerald-600 dark:text-emerald-400"
              },
              {
                icon: Sprout,
                title: "Intuitive Dashboard",
                description: "Visualize growth trends and receive actionable insights instantly.",
                bg: "bg-purple-50 dark:bg-purple-900/10",
                text: "text-purple-600 dark:text-purple-400"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-[2rem] bg-white dark:bg-card border border-border/50 shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`mb-6 p-4 rounded-2xl w-fit ${feature.bg} ${feature.text} group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/90 clip-path-slant" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-800 opacity-90" />

        {/* Animated Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Ready to Transform Your <br /> Plant Care Routine?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of happy plant parents who trust AgroAid for their automated gardening needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
