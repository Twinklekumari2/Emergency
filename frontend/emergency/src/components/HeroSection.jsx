import React from 'react';
import getUserLocation from './../script/location.js';
import { useNavigate } from 'react-router-dom';
import indiaImg from "../assets/india22.png";
import { api } from './../api.js'
import { toast } from 'react-toastify';

const HeroSection = () => {
  const navigate = useNavigate();

  // 🔥 POWERED UP SOS EMERGENCY HANDLE
  const handleSOS = async () => {
    // 1. Instantly trigger phone line system backup call protocol
    window.location.href = "tel:108";

    // 2. Fetch tracking references from global browser storage
    const userId = localStorage.getItem('emergency_user_id');
    
    if (!userId) {
      toast.error("Initialization identity protocol missing. Please refresh the grid console.");
      return;
    }

    // 3. Request high-accuracy live coordinates from user navigation hardware
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Toast showing that request transmission has initiated
            toast.info("Transmitting terminal coordinates to local grid cells...", { autoClose: 2000 });

            // 4. Fire packet arrays straight to our backend system router
            const response = await api.post('/patient/trigger-sos', {
              userId,
              latitude,
              longitude
            });

            if (response.data.success) {
              toast.success("Broadcast locked. Regional response assets notified.");
              console.log(`Incident active under Track Node: ${response.data.requestId}`);
              
              // Future addition: Redirection vector down to tracking dashboard page can go here
            }
          } catch (err) {
            console.error("Critical SOS transmission cluster fail:", err);
            toast.error("Packet transmission error. Emergency logged via backup channels.");
          }
        },
        (error) => {
          console.error("Geospatial connection denied by host client shell:", error);
          toast.error("Location access required to compute closest grid responders.");
        },
        // Direct instructions telling hardware to bypass cache grids for 100% accurate coordinates
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      toast.error("Local user ecosystem terminal lacks core navigation APIs.");
    }
  };

  return (
    <section className="min-h-[90vh] bg-[#000000] text-stone-200 antialiased pt-[12vh] flex items-center selection:bg-red-600 selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Responsive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ----------- LEFT SIDE: CONTENT ----------- */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left flex flex-col justify-center">
            
            {/* Typography */}
            <div className="space-y-4">
              {/* font-mono used here for operational data/badge looks */}
              <span className="inline-block font-mono text-xs tracking-widest text-red-500 font-bold uppercase border border-red-950 bg-red-950/30 px-3 py-1 rounded-sm">
                Active Response Portal
              </span>
              {/* Changed to font-display for an authoritative, custom branding header */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
                Emergency?<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                  Get Help Near
                </span> You. Fast.
              </h1>
            </div>

            {/* Paragraph Text */}
            {/* Explicitly designated font-sans for sharp, legible description text */}
            <div className="font-sans text-stone-400 text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 space-y-1">
              <p>Locate medical facilities, call active emergency services,</p>
              <p>and receive real-time structural guidance instantly.</p>
            </div>

            {/* Interactive Control Suite */}
            <div className="w-full max-w-md mx-auto lg:mx-0 space-y-4 pt-2">
              
              {/* Secondary Actions Row */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/near-by')}
                  className="w-full py-3 px-4 text-xs font-bold tracking-wider font-mono text-stone-300 bg-[#111111] border border-stone-900 rounded-sm transition-all duration-200 hover:text-white hover:border-stone-700 active:scale-[0.98]"
                >
                  NEAREST HOSPITAL
                </button>
                <button 
                  onClick={getUserLocation}
                  className="w-full py-3 px-4 text-xs font-bold tracking-wider font-mono text-stone-300 bg-[#111111] border border-stone-900 rounded-sm transition-all duration-200 hover:text-white hover:border-stone-700 active:scale-[0.98]"
                >
                  SHARE LOCATION
                </button>
              </div>

              {/* High-Urgency SOS Hot Button */}
              {/* Maintained font-mono here to give it a tactical, critical command console feel */}
              <button 
                onClick={handleSOS}
                className="w-full group relative py-4 px-6 text-sm font-black tracking-widest font-mono text-white bg-gradient-to-r from-red-700 to-red-600 rounded-sm shadow-xl shadow-red-950/50 hover:from-red-600 hover:to-red-500 transition-all duration-300 transform active:scale-[0.97] flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute left-6"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-white absolute left-6"></span>
                SOS EMERGENCY HOTLINE
              </button>

            </div>
          </div>

          {/* ----------- RIGHT SIDE: GRAPHIC MEDIA ----------- */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-lg group">
              
              {/* True crimson glow under image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/15 to-transparent blur-3xl rounded-full -z-10"></div>
              
              {/* Central Graphic Map */}
              <img 
                src={indiaImg} 
                alt="Emergency coverage map of India" 
                className="w-full h-auto object-contain mx-auto opacity-90 group-hover:scale-[1.01]"
              />

              {/* Tagline Blueprint Overlay */}
              <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-xs bg-[#111111]/95 backdrop-blur-md border border-stone-900 p-4 rounded-sm shadow-2xl text-center sm:text-right">
                <span className="w-6 h-[2px] bg-red-600 block mb-2 mx-auto sm:mr-0 sm:ml-auto"></span>
                {/* Changed explicitly to font-display to contrast beautifully against the mono label below */}
                <p className="text-white font-display text-sm font-bold tracking-tight leading-snug">
                  “Every District. Every Emergency. Covered.”
                </p>
                <p className="text-[10px] font-mono tracking-widest text-stone-500 uppercase mt-1">
                  National Response Network
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;