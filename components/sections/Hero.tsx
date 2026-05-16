"use client";

import { motion } from 'framer-motion';
import { owner } from "@/lib/data";
import Image from 'next/image';
import { basePath } from '@/lib/data';

const Hero = () => {
  return (
    <>
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <Image
          src={`${basePath}/assets/backgrounds/bw-map.jpeg`}
          alt="world map"
          fill
          className="w-full h-full sm:block hidden object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <Image
          src={`${basePath}/assets/backgrounds/world-map.png`}
          alt="world map"
          fill
          className="w-full h-full sm:hidden block object-cover"
        />
      </div>
      <section
        className="relative flex sm:flex-row flex-col w-full h-screen mx-auto 
        overflow-hidden">
        <div
          className="absolute inset-0 sm:top-[250px] top-[150px] 
          lg:top-[150px] xl:top-[250px] sm:px-16 px-6 
          max-w-7xl mx-auto flex flex-row items-start
          justify-between gap-3">
          
          <div className="flex flex-col justify-center items-center mt-5 ml-3">
            <div className="w-5 h-5 rounded-full bg-[#0a0a0a] sm:hidden" />
            <div className="w-1 sm:h-80 h-40 bw-gradient sm:hidden" />
          </div>

          <div className="z-10">
            <h1 className="font-black text-eerieBlack lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[90px] mt-2 font-poppins uppercase">
              Hi, I'm{' '}
              <span className="sm:text-taupe sm:text-[90px] text-eerieBlack text-[50px] font-mova font-extrabold uppercase">
                {owner.name}
              </span>
            </h1>
            <p className="text-eerieBlack font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2">
              Data scientist, <br className="sm:block hidden" />
              Driven by a Passion for Machine Learning, AI, and Mathematics
            </p>
          </div>
        </div>

        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-taupe flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full bg-taupe mb-1"
              />
            </div>
          </a>
        </div>

        <div>
          <Image
            className="absolute bottom-0 right-0 h-[90vh] w-auto object-contain"
            src={`${basePath}/assets/personal/yo2.png`}
            alt="Leonardo"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
