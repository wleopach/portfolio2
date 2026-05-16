"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from "@/lib/data";
import Image from 'next/image';

const ProjectCard = ({
  id,
  name,
  description,
  image,
  repo,
  demo,
  index,
  active,
  handleClick,
}: any) => {
  return (
    <motion.div
      className={`relative ${
        active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[170px] 
      h-[420px] cursor-pointer transition-all duration-[0.75s] ease-out-flex`}
      onClick={() => handleClick(id)}>
      <div
        className="absolute top-0 left-0 z-10 bg-jetLight 
      h-full w-full opacity-[0.5] rounded-[24px]"></div>

      <Image
        src={image}
        alt={name}
        fill
        className="absolute w-full h-full object-cover rounded-[24px]"
      />

      {active !== id ? (
        <div className="flex items-center justify-start pr-[4.5rem]">
          <h3
            className="font-extrabold font-beckman uppercase w-[200px] h-[30px] 
        whitespace-nowrap sm:text-[27px] text-[18px] text-timberWolf tracking-[1px]
        absolute z-0 lg:bottom-[7rem] lg:rotate-[-90deg] lg:origin-[0,0]
        leading-none z-20">
            {name}
          </h3>
        </div>
      ) : (
        <div
          className="absolute bottom-0 p-8 justify-start w-full 
          flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px] z-20">
          <div className="absolute inset-0 flex justify-end m-3">
            <div
              onClick={(e) => { e.stopPropagation(); window.open(repo, '_blank'); }}
              className="bg-eerieBlack sm:w-11 sm:h-11 w-10 h-10 rounded-full 
                flex justify-center items-center cursor-pointer
                sm:opacity-[0.9] opacity-[0.8]">
              <Image
                src="/assets/icons/github.png"
                alt="source code"
                width={24}
                height={24}
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
          </div>

          <h2
            className="font-bold sm:text-[32px] text-[24px] 
            text-timberWolf uppercase font-beckman sm:mt-0 -mt-[1rem]">
            {name}
          </h2>
          <p
            className="text-silver sm:text-[14px] text-[12px] 
            max-w-3xl sm:leading-[24px] leading-[18px]
            font-poppins tracking-[1px]">
            {description}
          </p>
          <button
            className="live-demo flex justify-between 
            sm:text-[16px] text-[14px] text-timberWolf 
            font-bold font-beckman items-center py-5 pl-2 pr-3 
            whitespace-nowrap gap-1 sm:w-[138px] sm:h-[50px] 
            w-[125px] h-[46px] rounded-[10px] bg-jetLight
            sm:mt-[22px] mt-[16px] hover:bg-taupe 
            hover:text-eerieBlack transition duration-[0.2s] 
            ease-in-out"
            onClick={(e) => { e.stopPropagation(); window.open(demo, '_blank'); }}>
            <Image
              src="/assets/icons/pineapple.png"
              alt="pineapple"
              width={34}
              height={34}
              className="btn-icon sm:w-[34px] sm:h-[34px] 
                w-[30px] h-[30px] object-contain"
            />
            LIVE DEMO
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const [active, setActive] = useState('project-2');

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div>
        <p className="sm:text-[18px] text-[16px] text-taupe uppercase tracking-wider font-semibold">Case Studies</p>
        <h2 className="text-eerieBlack dark:text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px]">Projects.</h2>
      </div>

      <div className="w-full flex">
        <p className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
          These projects demonstrate my expertise with practical examples of
          some of my work, including brief descriptions and links to code
          repositories and live demos. They showcase my ability to tackle
          intricate challenges, adapt to various technologies, and efficiently
          oversee projects.
        </p>
      </div>

      <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            index={index}
            {...project}
            active={active}
            handleClick={setActive}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
