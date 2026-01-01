import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Leaf } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent! 🌱",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
      subscribe: false,
    });
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about AgroAid? We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 shadow-hover border-2 border-primary/20 bg-gradient-card animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribe"
                  checked={formData.subscribe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, subscribe: checked as boolean })
                  }
                />
                <Label
                  htmlFor="subscribe"
                  className="text-sm font-normal cursor-pointer"
                >
                  Subscribe to plant care tips and updates
                </Label>
              </div>

              <Button type="submit" className="w-full group shadow-hover">
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="p-8 shadow-card border border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Have a question? Send us an email and we'll respond within 24 hours.
                  </p>
                  <a
                    href="mailto:contact@agroaid.com"
                    className="text-primary hover:underline text-sm"
                  >
                    contact@agroaid.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-card border border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Plant Care Tips</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Subscribe to our newsletter for weekly plant care tips, updates, and exclusive features.
                  </p>
                  <div className="flex gap-2">
                    <Input type="email" placeholder="Enter your email" className="text-sm" />
                    <Button size="sm">Subscribe</Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-card border-2 border-primary/20 bg-gradient-primary text-white">
              <h3 className="text-xl font-bold mb-3">Join Our Community</h3>
              <p className="text-white/90 text-sm mb-4">
                Connect with fellow plant enthusiasts, share your experiences, and learn from experts.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How does AgroAid work?",
                a: "AgroAid uses IoT sensors to monitor soil moisture, temperature, humidity, and light levels in real-time, then displays this data on an easy-to-use dashboard.",
              },
              {
                q: "Is AgroAid suitable for all plants?",
                a: "Yes! AgroAid can be configured for different plant types with varying watering and care needs.",
              },
              {
                q: "Do I need technical knowledge?",
                a: "Not at all! Our interface is designed to be user-friendly for everyone, from beginners to experienced gardeners.",
              },
              {
                q: "How accurate are the sensors?",
                a: "Our sensors are calibrated for high accuracy and provide reliable real-time data for optimal plant care.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="p-6 shadow-soft border border-border bg-card"
              >
                <h3 className="font-semibold mb-2 text-foreground">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
