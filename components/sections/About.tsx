import { owner } from "@/lib/data";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            {owner.bio}
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Based in <span className="font-semibold">{owner.location}</span>, I specialize in creating responsive, user-friendly interfaces and robust backend systems.
          </p>
        </div>
        <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-xl font-bold">Profile Photo Placeholder</span>
          {/* Use next/image here later */}
        </div>
      </div>
    </section>
  );
};

export default About;
