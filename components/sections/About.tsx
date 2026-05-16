import { owner, services } from "@/lib/data";
import Image from "next/image";

const ServiceCard = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className="xs:w-[250px] w-full card-gradient p-[1px] rounded-[20px] shadow-2xl">
      <div className="bg-jetLight rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <Image
          src={icon}
          alt={title}
          width={64}
          height={64}
          className="object-contain"
        />
        <h3 className="text-taupe text-[18px] font-bold text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div>
        <p className="sm:text-[18px] text-[16px] text-taupe uppercase tracking-wider font-semibold">Introduction</p>
        <h2 className="text-eerieBlack dark:text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px]">Overview.</h2>
      </div>

      <p className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
        {owner.bio}
      </p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
};

export default About;
