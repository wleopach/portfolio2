import { projects } from "@/lib/data";

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.name}
            className="group bg-foreground/5 rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary transition-all duration-300"
          >
            <div className="aspect-video bg-foreground/10 relative overflow-hidden">
              {/* Project image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-medium">
                {project.name} Preview
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-foreground/70 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-foreground/5 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    GitHub →
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold hover:text-primary transition-colors"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
