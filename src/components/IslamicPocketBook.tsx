import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  RotateCcw,
  Volume2,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Compass,
  Sparkles,
  Info
} from 'lucide-react';
import {
  NU_DZIKIR_DOA,
  RATIB_AL_HADDAD,
  MAJMU_SYARIF_KITAB,
  IslamicItem,
  IslamicSection
} from '../data/islamicData';

export default function IslamicPocketBook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubTab, setSelectedSubTab] = useState<'all' | 'nu' | 'ratib' | 'majmu'>('all');
  
  // Track active recitation counts for each item id
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('sihab_islamic_counts');
      return stored ? JSON.parse(stored) : {};
    } catch (_) {
      return {};
    }
  });

  // Track expanded cards
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'nu-istighfar': true, // Keep the first one open by default
    'rh-fatihah': true
  });

  // Save counts to localStorage when changed
  useEffect(() => {
    localStorage.setItem('sihab_islamic_counts', JSON.stringify(counts));
  }, [counts]);

  // Haptic feedback for mobile devices (Android web view)
  const triggerVibration = () => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(40); // 40ms subtle haptic tap
    }
  };

  // Sound feedback simulation (audio context beep, subtle & offline friendly)
  const [soundEnabled, setSoundEnabled] = useState(false);
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // frequency in hertz
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // low volume
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05); // 50ms beep
    } catch (_) {
      // Audio context might be blocked or unsupported
    }
  };

  // Increment item counter
  const handleIncrement = (id: string, target?: number) => {
    triggerVibration();
    playBeep();
    setCounts(prev => {
      const current = prev[id] || 0;
      const next = current + 1;
      return { ...prev, [id]: next };
    });
  };

  // Reset individual counter
  const handleResetItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerVibration();
    setCounts(prev => ({ ...prev, [id]: 0 }));
  };

  // Reset all counters
  const handleResetAll = () => {
    if (window.confirm('Apakah Anda yakin ingin mengosongkan semua hitungan tasbih dzikir saat ini?')) {
      triggerVibration();
      setCounts({});
    }
  };

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Collect and group sections based on selected tab & search term
  const sectionsToRender: { source: string; section: IslamicSection }[] = [];

  // 1. NU Dzikir & Doa
  if (selectedSubTab === 'all' || selectedSubTab === 'nu') {
    NU_DZIKIR_DOA.forEach(sec => {
      sectionsToRender.push({ source: 'tuntunan_nu', section: sec });
    });
  }

  // 2. Ratib Al-Haddad
  if (selectedSubTab === 'all' || selectedSubTab === 'ratib') {
    sectionsToRender.push({ source: 'ratib_haddad', section: RATIB_AL_HADDAD });
  }

  // 3. Majmu' Syarif
  if (selectedSubTab === 'all' || selectedSubTab === 'majmu') {
    MAJMU_SYARIF_KITAB.forEach(sec => {
      sectionsToRender.push({ source: 'majmu_syarif', section: sec });
    });
  }

  // Apply search filtering
  const filteredSections = sectionsToRender.map(entry => {
    const matchedItems = entry.section.items.filter(item => {
      const combinedText = `
        ${item.title} 
        ${item.transliteration || ''} 
        ${item.translation}
        ${item.note || ''}
      `.toLowerCase();
      return combinedText.includes(searchTerm.toLowerCase());
    });

    return {
      ...entry,
      section: {
        ...entry.section,
        items: matchedItems
      }
    };
  }).filter(entry => entry.section.items.length > 0);

  return (
    <div id="pocketbook-root" className="flex flex-col h-full bg-slate-50">
      
      {/* Quick Hero / Info Bar for Android Users */}
      <div className="bg-slate-900 text-white p-4 rounded-b-2xl border-b border-amber-400/30 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-400 p-2 rounded-xl text-slate-950 shadow-inner">
            <Compass className="w-5 h-5 animate-spin-slow text-slate-950" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display tracking-tight text-white flex items-center gap-1">
              BUKU SAKU ISLAMI
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            </h2>
            <p className="text-[10px] text-zinc-300 font-mono">NU • Ratib Al-Haddad • Majmu&apos; Syarif</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1.5">
          {/* Sound simulation toggler */}
          <button
            onClick={() => { triggerVibration(); setSoundEnabled(!soundEnabled); }}
            className={`p-1.5 rounded-lg border text-[10px] uppercase font-mono font-bold transition flex items-center gap-1 ${
              soundEnabled 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle Bunyi Beep"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{soundEnabled ? 'SUARA ON' : 'SILENT'}</span>
          </button>

          <button
            onClick={handleResetAll}
            className="bg-slate-800 text-rose-400 border border-slate-700 p-1.5 rounded-lg active:scale-95 transition"
            title="Reset semua hitungan tasbih"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Container - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        
        {/* Search & Navigation subtabs toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-2.5">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Cari doa, kata kunci, dzikir..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-sans focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          {/* Sub-tab pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Tampilkan Semua' },
              { id: 'nu', label: 'Dzikir & Doa NU' },
              { id: 'ratib', label: 'Ratib Al-Haddad' },
              { id: 'majmu', label: 'Majmu\' Syarif' }
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => { triggerVibration(); setSelectedSubTab(pill.id as any); }}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition duration-150 shrink-0 ${
                  selectedSubTab === pill.id
                    ? 'bg-amber-405 text-slate-950 font-extrabold bg-amber-400 border-amber-400'
                    : 'bg-slate-100 text-slate-605 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* List of sections & items */}
        {filteredSections.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">Tidak ada amalan doa/dzikir yang cocok</p>
            <p className="text-[10.5px] text-slate-400 mt-1">Coba gunakan kata pencarian bahasa Indonesia atau lainnya.</p>
          </div>
        ) : (
          filteredSections.map((entry, sIdx) => (
            <div key={`${entry.source}-${entry.section.id}-${sIdx}`} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              
              {/* Section Header */}
              <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800">
                <div>
                  <span className="text-[8.5px] font-mono text-amber-400 font-black tracking-wider uppercase bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                    {entry.source === 'tuntunan_nu' ? 'Tuntunan NU' : entry.source === 'ratib_haddad' ? 'Ratib Al-Haddad' : 'Majmu\' Syarif'}
                  </span>
                  <h3 className="text-xs font-extrabold mt-1 text-white">{entry.section.title}</h3>
                </div>
              </div>
              <div className="bg-slate-50/70 border-b border-slate-100 px-3.5 py-1.5">
                <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                  💡 {entry.section.description}
                </p>
              </div>

              {/* Items list */}
              <div className="divide-y divide-slate-100">
                {entry.section.items.map((item) => {
                  const isExpanded = !!expandedItems[item.id];
                  const currentCount = counts[item.id] || 0;
                  const isCompleted = item.countTarget ? currentCount >= item.countTarget : false;

                  return (
                    <div 
                      key={item.id} 
                      className={`transition duration-150 p-3.5 ${
                        isCompleted ? 'bg-emerald-500/5' : ''
                      }`}
                    >
                      {/* Item Trigger Bar */}
                      <div 
                        onClick={() => toggleExpand(item.id)}
                        className="flex items-start justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[12px] font-bold text-slate-800 flex items-center gap-1.5 leading-snug">
                            {item.title}
                            {isCompleted && (
                              <span className="bg-emerald-500 text-white rounded-full p-0.5 inline-flex items-center shrink-0">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </h4>
                          {item.note && (
                            <p className="text-[10px] text-amber-700 mt-0.5 font-medium flex items-center gap-1">
                              <Info className="w-3 h-3 text-amber-600 shrink-0" />
                              <span>{item.note}</span>
                            </p>
                          )}
                        </div>

                        {/* Right widgets: Expand icon & Counter capsule */}
                        <div className="flex items-center space-x-2 shrink-0">
                          {/* Circle interactive mini tasbih */}
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncrement(item.id, item.countTarget);
                            }}
                            className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-full border transition active:scale-90 ${
                              isCompleted
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-amber-100'
                            }`}
                          >
                            <span className="text-[10px] font-mono font-black">
                              {currentCount}{item.countTarget ? `/${item.countTarget}` : ''}x
                            </span>
                            <div className="bg-white/20 p-0.5 rounded-full">
                              <Plus className="w-3 h-3" />
                            </div>
                          </div>

                          {/* Reset Tasbih button */}
                          {currentCount > 0 && (
                            <button
                              onClick={(e) => handleResetItem(item.id, e)}
                              className="p-1 text-slate-400 hover:text-rose-500 hover:bg-slate-50 rounded"
                              title="Reset hitungan ini"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          )}

                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </div>
                      </div>

                      {/* Expandable Text (Arabic, Transliteration, Translation) */}
                      {isExpanded && (
                        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-3">
                          {/* Arabic text with beautiful ligatures, custom sized for device */}
                          <p 
                            className="text-right text-slate-900 font-serif leading-[2] sm:leading-[2.2] tracking-wide text-lg sm:text-xl font-bold bg-slate-50/50 p-3 rounded-lg border border-slate-100/50" 
                            dir="rtl"
                          >
                            {item.arabic}
                          </p>

                          {/* Phonetic Latin transliteration */}
                          {item.transliteration && (
                            <div>
                              <p className="text-[9px] font-mono text-indigo-500 uppercase tracking-widest font-semibold">Transliterasi:</p>
                              <p className="text-[11.5px] italic font-serif leading-relaxed text-slate-600 pl-2 border-l border-slate-200 mt-0.5">
                                {item.transliteration}
                              </p>
                            </div>
                          )}

                          {/* Indonesian Translation */}
                          <div>
                            <p className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest font-semibold">Artinya:</p>
                            <p className="text-[11.5px] text-slate-705 text-slate-700 leading-relaxed mt-0.5 pl-2 border-l border-slate-200">
                              {item.translation}
                            </p>
                          </div>
                          
                          {/* Large screen/focus recite zone */}
                          <div className="bg-slate-50 rounded-lg p-2.5 flex items-center justify-between text-[11px] font-mono border border-slate-100">
                            <span className="text-slate-500">Kebutuhan Target: {item.countTarget || 'Bebas'}x</span>
                            <button
                              onClick={() => handleIncrement(item.id, item.countTarget)}
                              className="text-[10px] font-bold bg-slate-900 text-amber-400 px-3 py-1.5 rounded-md hover:bg-slate-800 active:scale-95 transition flex items-center gap-1 shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5 text-amber-400" />
                              <span>Klik Tasbih (+1)</span>
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          ))
        )}

        {/* Handy Guidance Panel */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start space-x-2.5">
          <BookOpen className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-[11px] font-extrabold text-emerald-900 font-mono tracking-wide uppercase">TUNTUNAN & FADHILAH AMALAN</h5>
            <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
              Aplikasi pendamping ini disiapkan khusus untuk harian guru dan santri, mencakup dzikir tuntas sesudah Sholat Fardhu, Ratib pelindung yang tangguh Al-Haddad, serta kumpulan mutiara Majmu&apos; Syarif (Shalawat Nariyah &amp; Munjiyat, Al-Mulk, dll). Tap counter di kanan amalan untuk menggunakannya secara interaktif.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
