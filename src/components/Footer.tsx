import { Leaf, Github, Instagram, Linkedin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-card border-t border-border mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="p-2 bg-gradient-to-br from-primary to-emerald-600 rounded-xl shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                AgroAid
              </span>
            </Link>
            <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
              Empowering plant lovers with smart technology. Monitor, nurture, and watch your garden thrive with our automated care solutions.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Linkedin, href: "https://linkedin.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/50 dark:bg-secondary/10 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 group"
                >
                  <social.icon className="h-5 w-5 text-foreground/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Explore</h3>
            <ul className="space-y-4">
              {[
                { name: "Dashboard", path: "/dashboard" },
                { name: "Plant Care Guide", path: "/guide" },
                { name: "About Us", path: "/about" },
                { name: "Contact Support", path: "/contact" }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest plant care tips and feature updates directly to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 AgroAid. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>for plants everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
