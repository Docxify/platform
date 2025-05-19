'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Features: React.FC = () => {
  return (

    <section className="">
    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Docs Builder</h2>
            <p className="mb-6 text-lg leading-8 text-white aos-init aos-animate">Write, edit, and publish documentation directly from your browser. Collaborate with your team in real time, streamline feedback loops, and optionally sync with Git for full version control when needed. Not much setup, no friction—just fast, intuitive docs.</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a href="#" className="text-white bg-blue-800 hover:text-white border border-blue-700  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    Sign Up
                </a>
                <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Watch Demo
            </button>
            </div>
        </div>
    </div>
</section>

  );
};

export default Features;
