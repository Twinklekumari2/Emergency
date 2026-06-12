import React from 'react';

const Mission = () => {
  return (
    <section className="bg-[#000000] text-stone-200 antialiased py-16 selection:bg-red-600 selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* ----------- LEFT SIDE: CONTENT CORE (8 Columns) ----------- */}
          <div className="lg:col-span-8 bg-[#111111] p-6 sm:p-10 rounded-sm border border-stone-900 shadow-2xl flex flex-col justify-between space-y-8 relative z-10">
            
            {/* Top Bar Accent */}
            <div className="space-y-4">
              <span className="block font-mono text-xs tracking-widest text-red-500 font-bold uppercase">
                Operational Mandate
              </span>
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-relaxed max-w-3xl">
                To save lives by delivering instant access to emergency support and reliable ambulance services, ensuring help reaches people at the right time, at the right place.
              </h2>
            </div>

            {/* Middle Feature Highlights List */}
            <div className="space-y-3">
              <p className="text-stone-400 font-mono text-xs tracking-wider uppercase font-semibold">
                System Deliverables:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Real-time location tracking', 'Nearby ambulance availability', 'Fastest route guidance', 'One-tap emergency support'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-stone-300">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-sm flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Statement Callout */}
            <div className="pt-6 border-t border-stone-900">
              <p className="text-xs uppercase font-mono tracking-widest text-stone-500 mb-1">
                Our Core Value
              </p>
              <p className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Life first. <span className="text-red-500 italic font-black">Every second matters.</span>
              </p>
            </div>

          </div>

          {/* ----------- RIGHT SIDE: EDITORIAL TYPOGRAPHIC TEXT (4 Columns) ----------- */}
          <div className="lg:col-span-4 bg-gradient-to-br from-red-750 to-[#111111] p-8 rounded-sm border border-stone-900 flex items-center justify-center relative overflow-hidden min-h-[150px] lg:min-h-auto">
            
            {/* Background Texture Element */}
            <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            
            {/* Large Asymmetrical Word Display */}
            <h1 className="text-5xl lg:text-7xl font-black text-white/5 font-sans tracking-widest uppercase lg:rotate-90 whitespace-nowrap select-none absolute transform transition-colors duration-300 hover:text-white/10">
              MISSION
            </h1>
            
            {/* Front-facing Indicator */}
            <div className="relative text-center z-10">
              <span className="w-8 h-[2px] bg-red-600 block mx-auto mb-2"></span>
              <p className="text-white font-mono text-xs tracking-widest font-bold uppercase">
                OBJECTIVE 01
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Mission;