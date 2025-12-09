"use client";

import React, { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`transition-all duration-300 backdrop-blur-md px-6 ${
          isScrolled
            ? "bg-black/10 shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            AI Fitness Coach
          </h1>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <li><a href="#home" className="text-white/90 hover:text-white">Home</a></li>
            <li><a href="#workouts" className="text-white/90 hover:text-white">Workouts</a></li>
            <li><a href="#nutrition" className="text-white/90 hover:text-white">Nutrition</a></li>
            <li><a href="#contact" className="text-white/90 hover:text-white">Contact</a></li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white text-2xl leading-none">
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
}
