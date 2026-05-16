import { owner } from "@/lib/data";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-foreground/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} {owner.name}. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href={owner.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href={owner.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${owner.email}`}
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
