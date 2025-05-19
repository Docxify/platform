'use client';

import { useState } from 'react';
import Link from 'next/link';

const Pricing: React.FC = () => {
  return (
    <section className="">
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-5xl text-center font-bold text-white mb-4">
Pricing Plans            </h2>

            {/* Switch */}
            <div className="tabs">
          

              <div className="tabcontent mt-12">
                <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-8 lg:space-y-0">
                  {/* Free Plan */}
                  <div className="group relative flex flex-col mx-auto w-full max-w-sm text-white rounded-2xl border border-solid border-blue-800 text-center transition-all duration-300 p-6 xl:p-12 hover:border-blue-800">
                    <h3 className="font-manrope text-2xl font-bold mb-6">Basic</h3>
                    <div className="mb-20 flex flex-col">
                      <span className="font-manrope text-6xl font-semibold mb-2">
                        £0
                      </span>
                      <span className="text-xl text-white">/mo</span>
                    </div>
                    <button className="py-2.5 px-5 bg-blue-800 shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto group-hover:bg-blue-800 group-hover:text-white">
Try For Free                    </button>
                  </div>

                  {/* Advanced Plan */}
                  <div className="group relative flex flex-col mx-auto w-full max-w-sm text-gray-900 rounded-2xl text-center transition-all duration-500 p-6 xl:p-12 bg-blue-800 before:absolute before:bg-indigo-800 before:w-full before:h-full before:top-0 before:left-0 before:rounded-2xl before:opacity-0 before:transition-all before:duration-500 before:z-0">
                    <h3 className="relative flex items-center justify-center font-manrope text-2xl font-bold mb-6 text-white">
                      Pro
                      <span className="h-6 px-3 relative rounded-full border border-solid border-white text-sm ml-4">
                        Popular
                      </span>
                    </h3>
                    <div className="mb-20 flex flex-col relative">
                      <span className="font-manrope text-6xl font-semibold mb-2 text-white">
                        £10
                      </span>
                      <span className="text-xl text-gray-300">/mo</span>
                    </div>
                    <button className="relative py-2.5 px-5 bg-blue-800  border border-solid border-white shadow-sm rounded-full transition-all duration-500 text-base text-white font-semibold text-center w-fit mx-auto">
                      Purchase Plan
                    </button>
                  </div>

                </div>
              </div>

              {/* Monthly Plan Placeholder */}
              <div className="tabcontent mt-12 hidden">
                {/* You can copy the yearly cards and change the price text here */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Pricing;
