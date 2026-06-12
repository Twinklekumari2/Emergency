import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-stone-400 antialiased border-t border-stone-900 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-900">
          
          {/* ----------- LEFT BLOCK: LOGO & META (4 Columns) ----------- */}
          <div className="md:col-span-4 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start cursor-pointer">
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white font-sans uppercase flex items-center">
                EMER
                <span className="text-2xl sm:text-3xl text-red-600 font-mono animate-pulse inline-block mx-[1px] -translate-y-[2px]">
                  G
                </span>
                ENCY
              </h1>
            </div>
            <p className="text-xs font-mono tracking-wider uppercase text-stone-500 leading-relaxed max-w-xs mx-auto md:mx-0">
              India’s First Instant Emergency & Ambulance Help Platform. Delivering help when seconds count.
            </p>
          </div>

          {/* ----------- RIGHT BLOCK: LINK CATEGORIES (8 Columns) ----------- */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Box 1: Quick Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                {['Home', 'Nearby Hospitals', 'Ambulance Services', 'About Us', 'Contact'].map((item, idx) => (
                  <li key={idx} className="hover:text-red-500 cursor-pointer transition-colors duration-150">{item}</li>
                ))}
              </ul>
            </div>

            {/* Box 2: Emergency Helplines */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
                Emergency Lines
              </h3>
              <ul className="space-y-2 text-sm font-mono text-stone-300">
                <li className="flex justify-between border-b border-stone-950 pb-1"><span className="text-stone-500">Ambulance</span> <span>108</span></li>
                <li className="flex justify-between border-b border-stone-950 pb-1"><span className="text-stone-500">Police</span> <span>100</span></li>
                <li className="flex justify-between border-b border-stone-950 pb-1"><span className="text-stone-500">Fire</span> <span>101</span></li>
                <li className="flex justify-between border-b border-stone-950 pb-1"><span className="text-stone-500">Disaster</span> <span>112</span></li>
              </ul>
            </div>

            {/* Box 3: Core Services */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                Services
              </h3>
              <ul className="space-y-2 text-sm">
                {['Location Detection', 'Hospital Locator', 'Instant Dispatch', 'One-Tap SOS'].map((item, idx) => (
                  <li key={idx} className="hover:text-red-500 cursor-pointer transition-colors duration-150">{item}</li>
                ))}
              </ul>
            </div>

            {/* Box 4: Editorial Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                Platform
              </h3>
              <ul className="space-y-2 text-sm">
                {['Our Mission', 'Our Vision', 'Why We Exist', 'Life First Directive'].map((item, idx) => (
                  <li key={idx} className="hover:text-red-500 cursor-pointer transition-colors duration-150">{item}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* ----------- BOTTOM RUNNER: LEGAL & COPYRIGHT ----------- */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] font-mono tracking-wider text-stone-600 uppercase">
            © 2026 EMERGENCY INDIA — RESPONSE ARCHITECTURE. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-mono text-red-600/60 uppercase tracking-widest">
            Critical Systems Operational
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;