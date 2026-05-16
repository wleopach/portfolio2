import { experience } from "@/lib/data";

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">Experience</h2>
      <div className="space-y-12">
        {experience.map((item, index) => (
          <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-foreground/10">
            <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4">
              <div>
                <h3 className="text-xl font-bold">{item.role}</h3>
                <p className="text-lg text-primary/80 font-medium">{item.company}</p>
              </div>
              <p className="text-sm text-foreground/50 font-mono mt-1 md:mt-0">{item.dates}</p>
            </div>
            <ul className="space-y-3">
              {item.points.map((point, i) => (
                <li key={i} className="text-foreground/70 leading-relaxed list-disc list-inside">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
