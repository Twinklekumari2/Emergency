import React from 'react';

const Vision = () => {
  return (
    <section className="bg-[#000000] text-stone-200 antialiased py-16 selection:bg-red-600 selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Layout Grid (Inverted alignment compared to Mission) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* ----------- LEFT SIDE: EDITORIAL TYPOGRAPHIC TEXT (4 Columns) ----------- */}
          <div className="lg:col-span-4 bg-gradient-to-tl from-red-750 to-[#111111] p-8 rounded-sm border border-stone-900 flex items-center justify-center relative overflow-hidden min-h-[150px] lg:min-h-auto order-2 lg:order-1">
            
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            
            {/* Large Asymmetrical Word Display */}
            <h1 className="text-5xl lg:text-7xl font-black text-white/5 font-sans tracking-widest uppercase lg:-rotate-90 whitespace-nowrap select-none absolute transform transition-colors duration-300 hover:text-white/10">
              VISION
            </h1>
            
            {/* Front-facing Identity Unit */}
            <div className="relative text-center z-10">
              <span className="w-8 h-[2px] bg-red-600 block mx-auto mb-2"></span>
              <p className="text-white font-mono text-xs tracking-widest font-bold uppercase">
                HORIZON 2028
              </p>
            </div>
          </div>

          {/* ----------- RIGHT SIDE: CONTENT STATEMENT CARD (8 Columns) ----------- */}
          <div className="lg:col-span-8 bg-[#111111] p-8 sm:p-12 rounded-sm border border-stone-900 shadow-2xl flex flex-col justify-between space-y-8 relative z-10 order-1 lg:order-2">
            
            {/* Top Identity Block */}
            <div className="space-y-4">
              <span className="block font-mono text-xs tracking-widest text-red-500 font-bold uppercase">
                Long-Term Outlook
              </span>
              
              {/* Vision Statement with elegant large quote layout styling */}
              <blockquote className="relative">
                <p className="text-xl sm:text-2xl font-light italic tracking-tight text-white leading-relaxed max-w-3xl text-justify">
                  "To build India’s fastest and most reliable emergency-assistance platform where every person — no matter their city, district, or village — can get immediate ambulance support, accurate location detection, and life-saving help."
                </p>
              </blockquote>
            </div>

            {/* Bottom Target Metrics Row */}
            <div className="pt-6 border-t border-stone-900 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-wider">Scope</p>
                <p className="text-sm font-bold text-white mt-0.5">Pan-India</p>
              </div>
              <div>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-wider">Metrics</p>
                <p className="text-sm font-bold text-red-500 mt-0.5">Zero Delay</p>
              </div>
              <div>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-wider">Target</p>
                <p className="text-sm font-bold text-white mt-0.5">Every Citizen</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Vision;