import React from 'react';

const About = () => {
  return (
    <div className="min-h-[60vh] bg-[#000000] text-stone-200 antialiased pt-[12vh] flex items-center selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Container for editorial, left-aligned layout */}
        <div className="max-w-5xl space-y-4 border-l border-stone-900 pl-4 sm:pl-6">
          
          {/* Small Section Header */}
          <span className="block font-mono text-xs tracking-widest text-stone-500 uppercase font-bold">
            The Mission
          </span>

          {/* Main Massive Impact Header */}
          <h1 className="font-sans font-black tracking-tight uppercase leading-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
            
            <span className="block text-stone-400 font-light">
              India’s First Instant -
            </span>
            
            <span className="block my-2 text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-red-500 italic font-black tracking-tighter">
              Emergency & Ambulance
            </span>
            
            <span className="block text-white">
              Help Platform
            </span>

          </h1>

          {/* Visual bottom subtle divider accent to fit the timeline/editorial look */}
          <div className="w-12 h-[2px] bg-red-600 mt-8"></div>
          
        </div>

      </div>
    </div>
  );
};

export default About;