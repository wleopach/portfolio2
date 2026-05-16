import { owner } from "@/lib/data";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Hi, I'm <span className="text-primary">{owner.name}</span>
        </h1>
        <p className="text-xl sm:text-2xl text-foreground/70 mb-8">
          {owner.title}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-foreground/20 rounded-full font-medium hover:bg-foreground/5 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
