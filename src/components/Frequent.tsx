'use client';

import { useState } from 'react';

const faqData = [
  {
    question: 'What is Docxify?',
    answers: [
      "Docxify is a modern documentation generator that transforms your markdown files into beautiful, developer-friendly documentation websites; without needing to write custom frontend code."
    ],
  },
  {
    question: 'Who should use Docxify?',
    answers: ['Open-source maintainers, developer advocates, and SaaS teams who want elegant, searchable documentation with minimal setup.',
    ],
  },
  {
    question: 'Is there a theme or layout system?',
    answers: [
      'Yes, you can customize your theme, fonts, colors, navigation structure, and even inject custom components.',
    ],
  },
  {
    question: 'Where can I host my Docxify Documentation?',
    answers: [
      'Anywhere: Vercel, Netlify, GitHub Pages, Cloudflare Pages, or your own server.',
    ],
  },
  {
    question: 'Is Docxify optimized for SEO?',
    answers: [
      'Yes — metadata, Open Graph tags, clean URLs, and fast loading speeds are fixed in.',
    ],
  },
];

const Frequent: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="text-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center" data-aos="fade-up">
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </p>
        </div>

        <div
          className="mx-auto mt-16 max-w-4xl divide-y text-gray-600"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {faqData.map((item, index) => (
            <div key={index} className="group">
              <button
                onClick={() => toggleIndex(index)}
                className="flex w-full text-white items-start justify-between py-6 text-left"
              >
                <span className="text-lg font-semibold leading-7 text-white">
                  {item.question}
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <svg
                    className={`h-6 w-6 transform transition-transform duration-200 text-gray-600 ${
                      openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="pb-6 transition-all duration-300 ease-in-out">
                  <div className="space-y-2 text-white">
  {item.answers.map((answer, i) => (
    <p key={i}>{answer}</p>
  ))}
</div>

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Frequent;
