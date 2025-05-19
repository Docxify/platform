"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import KnowledgeBase from "@/components/KnowledgeBase";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";
import Frequent from "@/components/Frequent";
import Footer from "@/components/Footer";

const rotatingWords = ["That Scale.", "Seamlessly.", "Collaboratively."];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const word = rotatingWords[currentWordIndex];
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const type = () => {
      if (charIndex <= word.length) {
        setDisplayedText(word.substring(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(type, 100);
      } else {
        // Wait before deleting
        setTimeout(() => {
          intervalId = setInterval(() => {
            if (charIndex >= 0) {
              setDisplayedText(word.substring(0, charIndex));
              charIndex--;
            } else {
              clearInterval(intervalId);
              setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
            }
          }, 50);
        }, 1800);
      }
    };

    type();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [currentWordIndex]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] to-[#0a0f1e] overflow-hidden">
      {/* Primary large glow - this creates the main blue center effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[700px] glow-effect-subtle"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.05) 40%, rgba(29,78,216,0) 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />
      
      {/* Secondary smaller and brighter glow for intensity in the center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-3xl h-[400px] glow-effect"
        style={{
          background: 'radial-gradient(circle at center, rgba(59,130,246,0.25) 0%, rgba(37,99,235,0.1) 50%, transparent 80%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      />
      
      {/* Your content */}
      <div className="relative z-10 grid grid-rows-[20px_1fr_auto] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <Header />
        <main className="flex mt-20 flex-col gap-[1px] row-start-2 items-center text-center p-8 sm:p-20">
          <span className="self-center rounded-full bg-blue-600/20 px-3 py-1 text-sm font-semibold leading-6 text-blue-400 ring-1 ring-inset ring-blue-600/20">
            Live Demo 🚀
          </span>
          <h1
            className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Build Developer Docs
            <br />
            <span className="text-blue-500">
              {displayedText}
              <span className="inline-block w-[1px] h-[1em] bg-blue-500 animate-blink align-middle ml-[1px]" />
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-white aos-init aos-animate" data-aos="fade-up" data-aos-delay="300" data-astro-cid-j7pv25f6="">
            All-in-one toolkit for building, managing, and scaling developer documentation.
          </p>
          <div className="flex mt-10 space-x-4">
            <button
              type="button"
              className="text-white hover:text-white bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get Started
            </button>
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Pricing
            </button>
          </div>
        </main>
        
        <div className="row-start-3 w-full">
          <KnowledgeBase />
        </div>
      
      </div>
      <Features />
      <Pricing />
    <Frequent />
    <Footer />
    </div>
  );
}