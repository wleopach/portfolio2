"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { basePath } from "@/lib/data";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", title: "About" },
    { id: "projects", title: "Projects" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <nav className={`sm:px-16 px-6 w-full flex items-center py-2 fixed top-0 z-20 bg-eerieBlack sm:opacity-[0.97] xxs:h-[12vh] transition-all duration-300`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <Image
            src={`${basePath}/assets/logo/logo-black.png`}
            alt="logo"
            width={50}
            height={50}
            className="sm:w-[50px] sm:h-[50px] w-[45px] h-[45px] object-contain brightness-0 invert mix-blend-screen"
            priority
          />
          <Image
            src={`${basePath}/assets/logo/logo-text-black.png`}
            alt="logo text"
            width={90}
            height={90}
            className="sm:w-[90px] sm:h-[90px] w-[85px] h-[85px] -ml-[0.6rem] object-contain brightness-0 invert mix-blend-screen"
            priority
          />
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-14 mt-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-taupe" : "text-flashWhite"
              } hover:text-taupe text-[21px] font-medium font-mova uppercase tracking-[3px] cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}>
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center"
          >
            <Image
              src={isOpen ? `${basePath}/assets/icons/close.png` : `${basePath}/assets/icons/menu.png`}
              alt="menu"
              width={34}
              height={34}
              className="w-[34px] h-[34px] object-contain cursor-pointer brightness-0 invert"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="p-6 bg-eerieBlack absolute top-0 left-0 w-screen h-[100vh] z-10 flex flex-col">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)}>
              <Image
                src={`${basePath}/assets/icons/close.png`}
                alt="close"
                width={22}
                height={22}
                className="w-[22px] h-[22px] object-contain brightness-0 invert"
              />
            </button>
          </div>
          <ul className="list-none flex flex-col items-start justify-center flex-1">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-taupe" : "text-flashWhite"
                } text-[45px] font-bold font-arenq uppercase tracking-[1px] cursor-pointer`}
                onClick={() => {
                  setIsOpen(false);
                  setActive(nav.title);
                }}>
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
