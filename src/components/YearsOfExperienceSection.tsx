'use client';

import { useState, useEffect } from 'react';

const YearsOfExperienceSection = () => {
  const [counts, setCounts] = useState({
    years: 0,
    multimedia: 0,
    experts: 0,
    stories: 0,
    community: 0
  });

  useEffect(() => {
    const finalCounts = {
      years: 4,
      multimedia: 2000,
      experts: 40,
      stories: 12,
      community: 160
    };

    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setCounts(prevCounts => {
        const newCounts = { ...prevCounts };
        let allComplete = true;

        Object.keys(finalCounts).forEach(key => {
          const finalCount = finalCounts[key as keyof typeof finalCounts];
          const currentCount = prevCounts[key as keyof typeof prevCounts];
          const increment = Math.ceil(finalCount / steps);
          
          if (currentCount < finalCount) {
            newCounts[key as keyof typeof newCounts] = Math.min(currentCount + increment, finalCount);
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newCounts;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section section-sm bg-default py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Years Counter */}
          <div className="text-center">
            <div className="relative">
              {/* Particle effect background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
              </div>
              <div className="relative text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-blue-100 bg-clip-text drop-shadow-2xl mb-4 animate-pulse">
                {counts.years}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Years of Experience</h3>
            <p className="text-gray-200 max-w-sm mx-auto mb-6 text-lg leading-relaxed font-medium drop-shadow-md">
              ProComm Media has positioned itself as a partner for those seeking to navigate the complexities of modern communication and adapt to a rapidly changing world
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Get in touch
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 max-w-md">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {counts.multimedia >= 1000 ? `${Math.floor(counts.multimedia / 1000)}k` : counts.multimedia}
              </div>
              <h6 className="text-gray-700 font-medium">Multimedia Rich Content</h6>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {counts.experts}
              </div>
              <h6 className="text-gray-700 font-medium">Expert Voices and Insights</h6>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {counts.stories}
              </div>
              <h6 className="text-gray-700 font-medium">Inspiring Success Stories</h6>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {counts.community}
              </div>
              <h6 className="text-gray-700 font-medium">Community Members</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YearsOfExperienceSection;