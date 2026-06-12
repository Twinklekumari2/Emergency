import React from 'react';
import flowChart from './../assets/flowchart.png';

const WhyItMatters = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 antialiased pt-[10vh] font-sans selection:bg-red-600 selection:text-white">
      
      {/* HERO SECTION: High-impact, minimal, dramatic dark theme */}
      <header className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8 text-center sm:text-left border-b border-stone-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 w-24 h-[2px] bg-red-600"></div>
        <p className="text-red-500 font-mono tracking-widest text-xs uppercase mb-3 font-semibold">Crisis & Coordination</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none max-w-3xl">
          Why an Emergency Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Must Exist</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-stone-400 font-light leading-relaxed max-w-4xl text-justify sm:text-left">
          Every second becomes precious during an emergency. Whether it’s a road accident, a fire, a medical collapse, or a crime in progress — <span className="text-red-500 font-medium">help delayed is help denied.</span> In India, thousands of people lose their lives every year not because help isn’t available… but because help doesn’t reach on time.
        </p>
      </header>

      {/* INCIDENTS SECTION: Asymmetrical Journalistic Timeline Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-xs uppercase font-mono tracking-widest text-stone-500 mb-2">The Cost of Delay</h2>
          <h3 className="text-2xl font-bold text-white tracking-tight">Real-Time Incidents (2024–2025)</h3>
        </div>

        {/* Timeline Line container */}
        <div className="relative border-l border-stone-800 pl-6 ml-2 sm:ml-4 space-y-12">
          
          {/* Incident 1 */}
          <div className="relative group">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-stone-900 border-2 border-red-600 group-hover:bg-red-600 transition-colors duration-300"></div>
            <span className="block font-mono text-xs text-red-500 font-semibold mb-1">SURAT, GUJARAT</span>
            <h4 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-red-400 transition-colors">
              Tragedy at SVNIT — 2025
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed text-justify max-w-3xl">
              On late Sunday night (around 11:15 PM), a 20-year-old third-year B.Tech student, Advait Nair, residing in the Bhabha Boys’ Hostel of SVNIT, allegedly jumped from the second floor of the hostel building. Immediately after the fall, students attempted to get help. They first went to the campus ambulance station — but found it “non-responsive.” They then called an external ambulance, which reportedly took over 30 minutes to arrive... Tragically, the student was declared dead during treatment.
            </p>
          </div>

          {/* Incident 2 */}
          <div className="relative group">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-stone-900 border-2 border-red-600 group-hover:bg-red-600 transition-colors duration-300"></div>
            <span className="block font-mono text-xs text-red-500 font-semibold mb-1">GUNA, MADHYA PRADESH</span>
            <h4 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-red-400 transition-colors">
              Jagdish Ojha — 2025
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed text-justify max-w-3xl">
              A 65-year-old man was being moved from a health centre to a district hospital because of chest pain. The ambulance en route developed a tyre puncture — and reportedly had no spare tyre. Because of that breakdown, the vehicle was stranded by the roadside for nearly an hour. During this time, the patient’s condition deteriorated and he died before reaching the hospital.
            </p>
          </div>

          {/* Incident 3 */}
          <div className="relative group">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-stone-900 border-2 border-red-600 group-hover:bg-red-600 transition-colors duration-300"></div>
            <span className="block font-mono text-xs text-red-500 font-semibold mb-1">THANE / KALYAN EAST, MAHARASHTRA</span>
            <h4 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-red-400 transition-colors">
              Savita Birajdar — 2025
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed text-justify max-w-3xl">
              She had suffered a paralytic stroke and brain haemorrhage. When her condition worsened, doctors advised urgent shifting to a better hospital. But ambulance transport was delayed — reportedly she waited for nearly five hours before an ambulance could transport her. By then, her condition was critical and she died.
            </p>
          </div>

          {/* Incident 4 */}
          <div className="relative group">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-stone-900 border-2 border-red-600 group-hover:bg-red-600 transition-colors duration-300"></div>
            <span className="block font-mono text-xs text-red-500 font-semibold mb-1">DHENKANAL, ODISHA</span>
            <h4 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-red-400 transition-colors">
              Raju Munda — 2025
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed text-justify max-w-3xl">
              A three-year-old child slipped into a canal and was rescued, but injured. The family called the 108 ambulance service to transport him to hospital. According to the family, the ambulance never arrived on time; thus, they had to take him by motorbike to the hospital. By the time they reached, the child had died.
            </p>
          </div>

          {/* Incident 5 */}
          <div className="relative group">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-stone-900 border-2 border-red-600 group-hover:bg-red-600 transition-colors duration-300"></div>
            <span className="block font-mono text-xs text-red-500 font-semibold mb-1">KOZHIKODE, KERALA</span>
            <h4 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-red-400 transition-colors">
              Two Patients — December 2024
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed text-justify max-w-3xl">
              Two critically ill patients — Sulaikha (54) and Shajil Kumar (49) — died because their ambulances got stuck in a heavy traffic jam on a highway under construction. Traffic congestion delayed the ambulance by over 30 minutes, worsening their condition fatally.
            </p>
          </div>

          {/* Incident 6 */}
          <div className="relative group">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-stone-900 border-2 border-red-600 group-hover:bg-red-600 transition-colors duration-300"></div>
            <span className="block font-mono text-xs text-red-500 font-semibold mb-1">CUTTACK, ODISHA</span>
            <h4 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-red-400 transition-colors">
              Pradyumna Panda — 2025
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed text-justify max-w-3xl">
              The patient was being transported from a community health centre to a major hospital when the ambulance broke down midway. The vehicle failed, and despite repeated attempts by the driver to resume, the ambulance remained idle for over an hour. The patient's family blamed the ambulance delay and lack of oxygen supply during breakdown as primary causes.
            </p>
          </div>

        </div>
      </main>

      {/* FUNCTIONALITY / FLOWCHART SECTION: Minimal framing */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-800">
        <div className="text-center sm:text-left mb-8">
          <h2 className="text-xs uppercase font-mono tracking-widest text-stone-500 mb-2">The Architecture</h2>
          <h3 className="text-2xl font-bold text-white tracking-tight">How This Platform Systematically Solves It</h3>
        </div>
        <div className="bg-stone-950 p-4 sm:p-8 rounded-2xl border border-stone-900 flex justify-center">
          <img 
            src={flowChart} 
            alt="Emergency Platform Workflow" 
            className="w-full max-w-3xl h-auto object-contain opacity-90 filter drop-shadow-[0_0_15px_rgba(220,38,38,0.15)]"
          />
        </div>
      </section>

    </div>
  );
};

export default WhyItMatters;