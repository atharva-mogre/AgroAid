import { Card } from "@/components/ui/card";
import { Cpu, Zap, Cog } from "lucide-react";

const About = () => {
  const team = [
    {
      role: "Computer Science",
      icon: Cpu,
      color: "text-status-moisture",
      bgColor: "bg-status-moisture/10",
      borderColor: "border-status-moisture/20",
      description: "Software development, IoT integration, and data visualization dashboard",
      responsibilities: ["React web application", "Real-time data processing", "User interface design"],
    },
    {
      role: "Electrical Engineering",
      icon: Zap,
      color: "text-status-temp",
      bgColor: "bg-status-temp/10",
      borderColor: "border-status-temp/20",
      description: "Sensor integration, circuit design, and power management systems",
      responsibilities: ["IoT sensor setup", "Circuit design", "Power optimization"],
    },
    {
      role: "Mechanical Engineering",
      icon: Cog,
      color: "text-status-light",
      bgColor: "bg-status-light/10",
      borderColor: "border-status-light/20",
      description: "Hardware design, automated watering mechanism, and structural engineering",
      responsibilities: ["Smart pot design", "Watering mechanism", "Structural integrity"],
    },
  ];

  return (
    <div className="min-h-screen py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary">AgroAid</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            An innovative interdisciplinary project combining technology and nature to revolutionize plant care
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-8 md:p-12 shadow-hover border-2 border-primary/20 bg-gradient-card mb-16 animate-slide-up">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="text-6xl mb-6">🌿</div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AgroAid bridges the gap between technology and nature, making plant care accessible, automated, 
              and intelligent. We believe that with the right tools, anyone can become a successful plant parent.
            </p>
            <div className="pt-6">
              <blockquote className="text-2xl font-semibold text-primary italic">
                "Where Technology Meets Nature"
              </blockquote>
            </div>
          </div>
        </Card>

        {/* Team Sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
            Interdisciplinary <span className="text-primary">Team</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={member.role}
                className={`p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border-2 ${member.borderColor} ${member.bgColor} animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`inline-flex p-4 rounded-2xl ${member.bgColor} mb-6`}>
                  <member.icon className={`h-10 w-10 ${member.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{member.role}</h3>
                <p className="text-muted-foreground mb-6">{member.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground mb-2">Key Contributions:</p>
                  {member.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${member.bgColor} border ${member.borderColor}`} />
                      <span className="text-sm text-muted-foreground">{resp}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="p-8 md:p-12 shadow-card bg-gradient-card animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-12">
            Technology <span className="text-primary">Stack</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "IoT Sensors", desc: "Soil moisture, temperature, humidity, light" },
              { name: "Microcontroller", desc: "Arduino/ESP32 for data processing" },
              { name: "Web Dashboard", desc: "React + TypeScript interface" },
              { name: "Auto Watering", desc: "Servo motor controlled system" },
            ].map((tech, index) => (
              <div
                key={tech.name}
                className="p-6 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-semibold mb-2 text-foreground">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Features Highlight */}
        <div className="mt-16 text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-8">
            What Makes Us <span className="text-primary">Different</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-card rounded-2xl shadow-soft border border-border">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2 text-foreground">Precision Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Real-time data from multiple sensors provides accurate plant health insights
              </p>
            </div>
            <div className="p-6 bg-card rounded-2xl shadow-soft border border-border">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-semibold mb-2 text-foreground">Smart Automation</h3>
              <p className="text-sm text-muted-foreground">
                Automated watering responds to actual plant needs, not just schedules
              </p>
            </div>
            <div className="p-6 bg-card rounded-2xl shadow-soft border border-border">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold mb-2 text-foreground">Beautiful Interface</h3>
              <p className="text-sm text-muted-foreground">
                Intuitive dashboard makes complex data easy to understand at a glance
              </p>
            </div>
            <div className="p-6 bg-card rounded-2xl shadow-soft border border-border">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-semibold mb-2 text-foreground">Eco-Friendly</h3>
              <p className="text-sm text-muted-foreground">
                Optimizes water usage and promotes sustainable plant care practices
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
