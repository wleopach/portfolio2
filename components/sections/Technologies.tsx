"use client";

import { technologies, basePath } from "@/lib/data";
import BallCanvas from "../canvas/Ball";
import { motion } from "framer-motion";
import { textVariant, staggerContainer } from "@/lib/motion";

const Technologies = () => {
  const bgPath = `${basePath}/assets/backgrounds/nairobi.png`;
  
  return (
    <section 
      id="tech" 
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-none bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bgPath}')` }}
    >
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={textVariant()}>
          <p className="sm:text-[18px] text-[16px] text-taupe uppercase tracking-wider font-semibold">My Tools</p>
          <h2 className="text-eerieBlack dark:text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins">Technologies.</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-10 mt-14">
          {technologies.map((tech) => (
            <div className="w-28 h-28" key={tech.name}>
              <BallCanvas icon={tech.icon} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Technologies;