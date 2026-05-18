"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experience } from "@/lib/data";
import Image from 'next/image';

import { motion } from 'framer-motion';
import { textVariant, staggerContainer } from '@/lib/motion';

const ExperienceCard = ({ exp }: { exp: any }) => (
  <VerticalTimelineElement
      dateClassName="text-gray-800 dark:text-gray-200 font-semibold text-[14px]"
    contentStyle={{
      background: '#eaeaec',
      color: '#292929',
      boxShadow:
        'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    }}
    contentArrowStyle={{
      borderRight: '7px solid  #232631',
    }}
    date={exp.date}
    iconStyle={{ background: exp.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <Image
          src={exp.icon}
          alt={exp.company_name}
          width={40}
          height={40}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }>
    <div>
      <h3 className="text-jetLight text-[24px] font-bold font-beckman tracking-[2px]">
        {exp.title}
      </h3>
      <p
        className="text-taupe text-[22px] font-semibold font-overcame-bold tracking-[1px]"
        style={{ margin: 0 }}>
        {exp.company_name}
      </p>
    </div>
  </VerticalTimelineElement>
);

const Experience = () => {
  return (
    <section id="work" className="py-20">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={textVariant()}>
          <p className="sm:text-[18px] text-[16px] text-taupe uppercase tracking-wider font-semibold sm:pl-16 pl-[2rem]">
            What I've done so far
          </p>
          <h2 className="text-eerieBlack dark:text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] sm:pl-16 pl-[2rem] font-poppins">
            Work Experience.
          </h2>
        </motion.div>

        <div className="mt-20 flex flex-col">
          <VerticalTimeline className="vertical-timeline-custom-line">
            {experience.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} />
            ))}
          </VerticalTimeline>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
