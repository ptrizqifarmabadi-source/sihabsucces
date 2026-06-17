import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  BookOpen,
  Heart,
  GraduationCap,
  Briefcase,
  Activity,
  ClipboardCheck,
  Calendar,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Send,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  Award,
  CheckCircle,
  HelpCircle,
  HeartHandshake
} from 'lucide-react';
import {
  WEEKDAY_SCHEDULE,
  SATURDAY_SCHEDULE,
  SUNDAY_SCHEDULE,
  GOLDEN_RULES,
  CLOSING_MESSAGE,
  CATEGORY_STYLES,
  ScheduleItem
} from './data/schedules';

// Helper to format date to YYYY-MM-DD local string
const toLocalDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Indonesian date formatter
const formatIndonesianDate = (date: Date): string => {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function App() {
  // --- States ---
  const [currentDateState, setCurrentDateState] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [scheduleOverride, setScheduleOverride] = useState<'auto' | 'weekday' | 'saturday' | 'sunday'>('auto');
  
  // Storage states
  const [checkedItems, setCheckedItems] = useState<{ [dateKey: string]: string[] }>({});
  const [reflections, setReflections] = useState<{ [dateKey: string]: string }>({});
  const [weeklyEvaluations, setWeeklyEvaluations] = useState<{
    [dateKey: string]: {
      bestHabit: string;
      improveHabit: string;
      targetNextWeek: string;
    }
  }>({});
  
  // Active Tab for panels
  const [activeTab, setActiveTab] = useState<'planner' | 'rules' | 'history'>('planner');
  
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Real-time Clock effect ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateState(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Initialize storage on mount ---
  useEffect(() => {
    try {
      const storedChecked = localStorage.getItem('sihab_checked_items');
      const storedReflections = localStorage.getItem('sihab_reflections');
      const storedWeeklyEvaluations = localStorage.getItem('sihab_weekly_evaluations');
      
      if (storedChecked) setCheckedItems(JSON.parse(storedChecked));
      if (storedReflections) setReflections(JSON.parse(storedReflections));
      if (storedWeeklyEvaluations) setWeeklyEvaluations(JSON.parse(storedWeeklyEvaluations));
    } catch (e) {
      console.error("Gagal memuat data dari localStorage", e);
    }
  }, []);

  // --- Sync storage triggers ---
  const saveCheckedState = (newChecked: { [dateKey: string]: string[] }) => {
    setCheckedItems(newChecked);
    localStorage.setItem('sihab_checked_items', JSON.stringify(newChecked));
  };

  const saveReflectionState = (dateKey: string, text: string) => {
    const updated = { ...reflections, [dateKey]: text };
    setReflections(updated);
    localStorage.setItem('sihab_reflections', JSON.stringify(updated));
    showToast('Evaluasi harian disimpan!');
  };

  const saveWeeklyEvaluationState = (
    dateKey: string,
    evalData: { bestHabit: string; improveHabit: string; targetNextWeek: string }
  ) => {
    const updated = { ...weeklyEvaluations, [dateKey]: evalData };
    setWeeklyEvaluations(updated);
    localStorage.setItem('sihab_weekly_evaluations', JSON.stringify(updated));
    showToast('Evaluasi mingguan disimpan!');
  };

  // Toast trigger helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // --- Calendar state helpers ---
  const currentSelectedDateKey = useMemo(() => {
    return toLocalDateKey(selectedDate);
  }, [selectedDate]);

  // Determine actual schedule type for the selected calendar date
  const selectedDateDayType = useMemo(() => {
    const day = selectedDate.getDay(); // 0 is Sunday, 6 is Saturday
    if (day === 0) return 'sunday';
    if (day === 6) return 'saturday';
    return 'weekday';
  }, [selectedDate]);

  // Resolves currently viewed schedule list
  const activeScheduleType = useMemo(() => {
    if (scheduleOverride !== 'auto') {
      return scheduleOverride;
    }
    return selectedDateDayType;
  }, [scheduleOverride, selectedDateDayType]);

  const activeScheduleItems = useMemo<ScheduleItem[]>(() => {
    if (activeScheduleType === 'saturday') return SATURDAY_SCHEDULE;
    if (activeScheduleType === 'sunday') return SUNDAY_SCHEDULE;
    return WEEKDAY_SCHEDULE;
  }, [activeScheduleType]);

  // Filtered items based on category tabs
  const filteredScheduleItems = useMemo(() => {
    if (selectedCategory === 'all') return activeScheduleItems;
    return activeScheduleItems.filter(item => item.category === selectedCategory);
  }, [activeScheduleItems, selectedCategory]);

  // Active checked items for selectedDate
  const currentChecked = useMemo(() => {
    return checkedItems[currentSelectedDateKey] || [];
  }, [checkedItems, currentSelectedDateKey]);

  // Progress metrics calculation
  const progressPercent = useMemo(() => {
    const total = activeScheduleItems.length;
    if (total === 0) return 0;
    const completed = activeScheduleItems.filter(item => currentChecked.includes(item.id)).length;
    return Math.round((completed / total) * 100);
  }, [activeScheduleItems, currentChecked]);

  // Golden threshold marker (70% based on Aturan Emas)
  const isGoldenTargetMet = useMemo(() => {
    return progressPercent >= 70;
  }, [progressPercent]);

  // Date list for the horizontal strip: centered on selectedDate, showing 7 days
  const weekDays = useMemo(() => {
    const arr = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date(selectedDate);
      d.setDate(selectedDate.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [selectedDate]);

  // Go to today's date
  const handleJumpToToday = () => {
    setSelectedDate(new Date());
    setScheduleOverride('auto');
    showToast('Kembali ke hari ini');
  };

  const handleDayOffset = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(selectedDate.getDate() + offset);
    setSelectedDate(d);
  };

  // --- Checklist toggle handler ---
  const handleToggleCheck = (itemId: string) => {
    const exists = currentChecked.includes(itemId);
    let newCheckedList: string[];
    
    if (exists) {
      newCheckedList = currentChecked.filter(id => id !== itemId);
    } else {
      newCheckedList = [...currentChecked, itemId];
    }
    
    const updatedChecked = {
      ...checkedItems,
      [currentSelectedDateKey]: newCheckedList
    };
    
    saveCheckedState(updatedChecked);
  };

  // Reset current day checklist
  const handleResetCurrentDay = () => {
    if (window.confirm('Apakah Anda yakin ingin mengosongkan semua ceklis untuk hari ini?')) {
      const updatedChecked = {
        ...checkedItems,
        [currentSelectedDateKey]: []
      };
      saveCheckedState(updatedChecked);
      showToast('Ceklis hari ini direset.');
    }
  };

  // Check all items to simulate or fill easily
  const handleCheckAllCurrentDay = () => {
    const allIds = activeScheduleItems.map(item => item.id);
    const updatedChecked = {
      ...checkedItems,
      [currentSelectedDateKey]: allIds
    };
    saveCheckedState(updatedChecked);
    showToast('Semua aktivitas berhasil diceklis!');
  };

  // --- Streak Tracker Calculations ---
  // A streak is counted backwards from yesterday or today, as long as consecutive days have progressPercent >= 70%
  const statistics = useMemo(() => {
    let totalCompletedAllTime = 0;
    Object.keys(checkedItems).forEach(key => {
      const list = checkedItems[key];
      if (list) {
        totalCompletedAllTime += list.length;
      }
    });

    // Let's count streak of days meeting 70% target
    // We sort recorded dates
    const datesWithData = Object.keys(checkedItems).sort();
    if (datesWithData.length === 0) {
      return { streak: 0, goldDays: 0, totalCompleted: 0 };
    }

    let goldDaysCount = 0;
    const progressByDate: { [date: string]: number } = {};

    Object.keys(checkedItems).forEach(dateKey => {
      // Determine what schedule type that date had
      const dParts = dateKey.split('-');
      const dateVal = new Date(Number(dParts[0]), Number(dParts[1]) - 1, Number(dParts[2]));
      const day = dateVal.getDay();
      const schedLen = (day === 0) ? SUNDAY_SCHEDULE.length : (day === 6) ? SATURDAY_SCHEDULE.length : WEEKDAY_SCHEDULE.length;
      const checkedLen = checkedItems[dateKey]?.length || 0;
      const pct = schedLen > 0 ? (checkedLen / schedLen) * 100 : 0;
      progressByDate[dateKey] = pct;
      if (pct >= 70) {
        goldDaysCount++;
      }
    });

    // Calculate current streak of days >= 70% ending today or yesterday
    let currentStreak = 0;
    let checkDate = new Date(); // Start with today
    let continueScanning = true;

    // We scan back up to 60 days
    for (let i = 0; i < 60 && continueScanning; i++) {
      const key = toLocalDateKey(checkDate);
      const isToday = i === 0;
      const progress = progressByDate[key] || 0;

      if (progress >= 70) {
        currentStreak++;
      } else {
        // If today is < 70% but has some checks, we don't break yet if we want to give them till end of day.
        // But if today is completely empty or < 70% and we are scanning back, we allow a bypass on today itself.
        if (isToday) {
          // Just skip today without breaking, check yesterday
        } else {
          continueScanning = false;
        }
      }
      // Subtract 1 day
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return {
      streak: currentStreak,
      goldDays: goldDaysCount,
      totalCompleted: totalCompletedAllTime
    };
  }, [checkedItems]);

  // --- Dynamic WhatsApp Share Text Generator ---
  const handleShareToWife = () => {
    const formattedDate = formatIndonesianDate(selectedDate);
    const dayName = selectedDate.toLocaleDateString('id-ID', { weekday: 'long' });
    const progressMsg = `Target Ceklis: ${progressPercent}%\n${isGoldenTargetMet ? "✅ Target Emas 70% Tercapai!" : "📈 Sedang berproses mencapai target!"}`;
    
    const introText = `Assalamu'alaikum warahmatullah istriku tercinta, bidadari surgaku ❤️\n\nIni adalah ikhtiar saya untuk terus istiqomah menjadi suami, ayah, dan pendidik yang lebih baik demi keluarga kita tercinta (Sihab Success Under 40 tahun).\n\n📅 Progress Laporan Hari *${dayName}* (${currentSelectedDateKey}):\n📊 ${progressMsg}\n\n`;
    
    // Core summary of selected activities completed/remaining
    const checkedActivities = activeScheduleItems
      .filter(item => currentChecked.includes(item.id))
      .map(item => `✓ [${item.time}] ${item.activity.substring(0, 50)}...`)
      .slice(0, 5) // Limit to top 5 to avoid too long messages
      .join('\n');

    const remainingCount = activeScheduleItems.length - currentChecked.length;

    const bodyText = checkedActivities.length > 0 
      ? `Beberapa ikhtiar yang sudah tercapai hari ini:\n${checkedActivities}\n${remainingCount > 0 ? `...dan ${remainingCount} agenda lainnya sedang diselesaikan dengan komitmen tinggi.` : 'Alhamdulillah seluruh agenda tuntas!'}`
      : `Agenda hari ini siap dikerjakan secara konsisten.`;
    
    const goldenRulesRemind = `\n\n📌 *Aturan Emas Pasangan*\n"Cara saya ingin jadi imam terbaik adalah dengan dukunganmu. Mohon ingatkan, doakan, dan temani perjuangan saya menuju ridha Allah dan keberkahan usia 40 tahun."\n\n"Sebaik-baik manusia adalah yang paling bermanfaat..." (HR. Ahmad) 🌙`;

    const fullShareText = encodeURIComponent(introText + bodyText + goldenRulesRemind);
    window.open(`https://api.whatsapp.com/send?text=${fullShareText}`, '_blank');
  };

  // --- Backup / Restore Functions ---
  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify({
        checked: checkedItems,
        reflections: reflections,
        evaluations: weeklyEvaluations
      }, null, 2);
      
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sihab_success_backup_${currentSelectedDateKey}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Cadangan data berhasil diunduh!');
    } catch (e) {
      alert('Gagal mengekspor data');
    }
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && (parsed.checked || parsed.reflections || parsed.evaluations)) {
            if (parsed.checked) {
              setCheckedItems(parsed.checked);
              localStorage.setItem('sihab_checked_items', JSON.stringify(parsed.checked));
            }
            if (parsed.reflections) {
              setReflections(parsed.reflections);
              localStorage.setItem('sihab_reflections', JSON.stringify(parsed.reflections));
            }
            if (parsed.evaluations) {
              setWeeklyEvaluations(parsed.evaluations);
              localStorage.setItem('sihab_weekly_evaluations', JSON.stringify(parsed.evaluations));
            }
            showToast('Cadangan data berhasil diimpor!');
          } else {
            alert('Format file cadangan tidak valid.');
          }
        } catch (err) {
          alert('Gagal mengurai file JSON cadangan.');
        }
      };
    }
  };

  // --- Reflection State per Day ---
  const currentReflectionText = reflections[currentSelectedDateKey] || '';
  const [tempReflection, setTempReflection] = useState('');

  // Keep temporary string in sync with date changes
  useEffect(() => {
    setTempReflection(reflections[currentSelectedDateKey] || '');
  }, [currentSelectedDateKey, reflections]);

  // --- Sunday Weekly Evaluation state ---
  const currentWeeklyEval = weeklyEvaluations[currentSelectedDateKey] || {
    bestHabit: '',
    improveHabit: '',
    targetNextWeek: ''
  };

  const [tempWeeklyEval, setTempWeeklyEval] = useState({
    bestHabit: '',
    improveHabit: '',
    targetNextWeek: ''
  });

  useEffect(() => {
    setTempWeeklyEval(weeklyEvaluations[currentSelectedDateKey] || {
      bestHabit: '',
      improveHabit: '',
      targetNextWeek: ''
    });
  }, [currentSelectedDateKey, weeklyEvaluations]);

  // --- High Density Dashboard Metrics ---
  const upcomingItem = useMemo(() => {
    return activeScheduleItems.find(item => !currentChecked.includes(item.id));
  }, [activeScheduleItems, currentChecked]);

  const familyMetrics = useMemo(() => {
    const items = activeScheduleItems.filter(item => item.category === 'keluarga');
    const done = items.filter(item => currentChecked.includes(item.id));
    return {
      total: items.length,
      done: done.length,
      percent: items.length > 0 ? Math.round((done.length / items.length) * 100) : 100
    };
  }, [activeScheduleItems, currentChecked]);

  const [resellerCount, setResellerCount] = useState<number>(() => {
    return Number(localStorage.getItem('sihab_reseller_count') || '0');
  });

  const handleIncrementReseller = () => {
    const next = resellerCount + 1;
    setResellerCount(next);
    localStorage.setItem('sihab_reseller_count', String(next));
  };

  const handleDecrementReseller = () => {
    const next = Math.max(0, resellerCount - 1);
    setResellerCount(next);
    localStorage.setItem('sihab_reseller_count', String(next));
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, { total: number; done: number }> = {};
    activeScheduleItems.forEach(item => {
      const cat = item.category || 'other';
      if (!counts[cat]) counts[cat] = { total: 0, done: 0 };
      counts[cat].total++;
      if (currentChecked.includes(item.id)) {
        counts[cat].done++;
      }
    });
    return counts;
  }, [activeScheduleItems, currentChecked]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased h-screen lg:overflow-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-12 right-6 z-50 bg-slate-900 text-slate-100 px-4 py-3 rounded-lg shadow-lg border border-slate-800 flex items-center space-x-2 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ================================= SIDEBAR AREA (Desktop fixed, Mobile collapsible space) ================================= */}
      <aside className="hidden lg:flex w-full lg:w-64 bg-slate-900 text-slate-100 flex-col shrink-0 border-r border-slate-800 pt-5 lg:overflow-y-auto justify-between">
        <div className="px-5">
          {/* Main Logo block */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <span className="bg-amber-400 text-slate-950 font-mono font-bold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase">
                SIHAB TARGET
              </span>
              <span className="text-[10px] font-mono text-slate-500">ID: 773b0a8d</span>
            </div>
            <h1 className="text-xl font-display font-extrabold tracking-tight text-white mt-1.5 flex items-center gap-1.5">
              SIHAB SUCCESS
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-mono font-normal px-2 py-0.5 rounded">
                &lt;40
              </span>
            </h1>
            <p className="text-[10px] font-mono text-slate-400 uppercase mt-1 tracking-widest border-b border-slate-800 pb-3">
              Performance Control Box
            </p>
          </div>

          {/* Slogan */}
          <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg mb-5">
            <p className="text-[11px] text-slate-300 font-serif leading-relaxed italic">
              &quot;Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.&quot;
            </p>
          </div>

          {/* Navigation link area */}
          <nav className="space-y-1">
            <button
              id="tab-btn-planner"
              onClick={() => setActiveTab('planner')}
              className={`w-full px-3 py-2 rounded-lg text-xs transition duration-150 flex items-center justify-between font-medium ${
                activeTab === 'planner'
                  ? 'bg-slate-800 text-amber-400 font-bold border-l-4 border-amber-400 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ClipboardCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Agenda Ceklis Harian</span>
              </div>
              <span className="font-mono text-[10px] font-bold bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
                {currentChecked.length}/{activeScheduleItems.length}
              </span>
            </button>

            <button
              id="tab-btn-rules"
              onClick={() => setActiveTab('rules')}
              className={`w-full px-3 py-2 rounded-lg text-xs transition duration-150 flex items-center justify-between font-medium ${
                activeTab === 'rules'
                  ? 'bg-slate-800 text-amber-400 font-bold border-l-4 border-amber-400 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 shrink-0 text-amber-400" />
                <span>3 Aturan Emas Sihab</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 px-1.5 rounded">
                70%
              </span>
            </button>

            <button
              id="tab-btn-history"
              onClick={() => setActiveTab('history')}
              className={`w-full px-3 py-2 rounded-lg text-xs transition duration-150 flex items-center justify-between font-medium ${
                activeTab === 'history'
                  ? 'bg-slate-800 text-amber-400 font-bold border-l-4 border-amber-400 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>Sejarah & Cadangan</span>
              </div>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-1 py-0.2 rounded font-bold">
                DATA
              </span>
            </button>
          </nav>

          {/* Quick Real-Time Streak Indicator widget */}
          <div className="mt-5 border-t border-slate-800/80 pt-4">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
              STREAK KONSISTENSI &ge; 70%
            </span>
            <div className="bg-slate-850/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Hari Aktif</span>
                <span className="text-xl font-mono font-extrabold text-amber-400">
                  {statistics.streak} <span className="text-xs font-sans text-slate-300 font-normal">Hari</span>
                </span>
              </div>
              <div className="bg-amber-400/10 p-2 rounded-lg border border-amber-400/20">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="mt-2 text-[9.5px] text-slate-400 leading-relaxed font-serif">
              Tercapai {statistics.goldDays} Hari Emas dari seluruh pencatatan diredhai Allah.
            </div>
          </div>
        </div>

        {/* Bottom Profile details & Share Box */}
        <div className="bg-slate-950 p-4 border-t border-slate-850 mt-4">
          <div className="mb-3">
            <button
              onClick={handleShareToWife}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] py-1.5 px-3 rounded transition duration-150 flex items-center justify-center space-x-1 shadow-sm"
              title="Kirim laporan harian real-time via WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Sinergi Laporan Istri</span>
            </button>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono text-slate-950 shadow-md">
              PT
            </div>
            <div className="min-w-0">
              <span className="text-xs text-white block truncate font-medium">
                ptrizqifarmabadi@gmail.com
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                Lead Teacher & Planner
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ================================= MAIN WORKSPACE AREA ================================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Dynamic header row containing quick dates & widgets */}
        <header className="bg-white border-b border-slate-200/80 shrink-0">
          {/* Main top bar */}
          <div className="h-14 lg:h-16 px-3 md:px-6 flex items-center justify-between">
            
            {/* Left: Mobile Title (hidden on desktop because sidebar has it) or Brand Status */}
            <div className="flex items-center space-x-2">
              <div className="lg:hidden">
                <div className="flex items-center space-x-1">
                  <span className="bg-amber-400 text-slate-950 font-mono font-extrabold text-[9px] px-1.5 py-0.5 rounded tracking-wide uppercase">
                    SIHAB SUCCESS
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1 py-0.5 rounded shrink-0">⭐ {statistics.streak}d</span>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center space-x-2.5">
                <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded border border-slate-200 font-mono">
                  {activeScheduleType === 'weekday' ? 'HARI MENGAJAR' : activeScheduleType === 'saturday' ? 'HARI KONTEN' : 'HARI MANDIRI'}
                </span>
                <div className="h-4 w-px bg-slate-200" />
                <h2 className="text-xs font-mono font-bold text-slate-500 tracking-wider">
                  {activeTab === 'planner' ? 'DAILY PLANNER MATRIX' : activeTab === 'rules' ? 'GOLDEN COMPASS' : 'HISTORICAL METRICS'}
                </h2>
              </div>
            </div>

            {/* Middle: Quick calendar days navigation */}
            <div className="flex items-center space-x-1 text-xs">
              <button
                onClick={() => handleDayOffset(-1)}
                className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition touch-manipulation"
                title="Kembali"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <span className="font-display font-semibold text-slate-900 px-1 min-w-[90px] sm:min-w-[120px] text-center text-xs sm:text-sm">
                {selectedDate.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
              </span>
              <button
                onClick={() => handleDayOffset(1)}
                className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition touch-manipulation"
                title="Lanjut"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={handleJumpToToday}
                className="ml-1 sm:ml-2 font-mono font-bold text-[9px] sm:text-[10px] bg-amber-400 hover:bg-amber-500 text-slate-950 px-2 py-1 rounded transition whitespace-nowrap shadow-xs touch-manipulation"
              >
                HARI INI
              </button>
            </div>

            {/* Right: Quick clock & action buttons on mobile */}
            <div className="flex items-center space-x-1.5">
              {/* WhatsApp Quick Sync action button, highly accessible on mobile */}
              <button
                onClick={handleShareToWife}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-md transition shadow-xs flex items-center space-x-1 shrink-0 lg:hidden touch-manipulation"
                title="Lapor Istri"
              >
                <Share2 className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xs:inline">Lapor</span>
              </button>

              {/* Clock widget for desktop */}
              <div className="hidden md:flex items-center space-x-1.5 bg-slate-900 text-emerald-400 px-2.5 py-1 rounded text-xs font-mono font-bold shadow-inner flex-shrink-0">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{currentDateState.toLocaleTimeString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Quick Informational / Warning banner for mobile underneath head */}
          <div className="lg:hidden bg-slate-50 border-t border-slate-150 px-3 py-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="truncate">
              Tipe Hari: <strong className="text-slate-800 uppercase">{activeScheduleType === 'weekday' ? 'Mengajar' : activeScheduleType === 'saturday' ? 'Konten' : 'Mandiri'}</strong>
            </span>
            <span className="text-emerald-650 font-bold shrink-0 ml-2">
              Progress: {currentChecked.length}/{activeScheduleItems.length} ({progressPercent}%)
            </span>
          </div>
        </header>

        {/* ================================= CONTENT MATRIX PANEL ================================= */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          {/* ================================= PLANNER INDEX VIEW ================================= */}
          {activeTab === 'planner' && (
            <div className="grid grid-cols-12 gap-5">
              
              {/* Grid 1: The Main Schedule checklist box (Left Column) */}
              <div className="col-span-12 lg:col-span-8 flex flex-col space-y-4">
                
                {/* Mobile Welcome Panel - only visible on small screens (Android optimization) */}
                <div className="lg:hidden bg-slate-900 text-white rounded-xl p-3 sm:p-4 border border-slate-800 shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[9px] font-mono text-amber-400 tracking-wider uppercase font-bold">INFO PROFIL PERJUANGAN</p>
                      <h3 className="text-xs font-bold text-white mt-0.5 truncate max-w-[210px]">ptrizqifarmabadi@gmail.com</h3>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Lead Teacher &amp; Planner Control Box</p>
                    </div>
                    <div className="bg-slate-800 text-center px-2.5 py-1 rounded-lg border border-slate-700 shadow-sm shrink-0">
                      <span className="text-[8px] font-mono text-slate-300 block uppercase">STREAK</span>
                      <span className="text-sm font-mono font-extrabold text-amber-400">{statistics.streak} HARI</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/40 border border-slate-800/80 p-2.5 rounded-lg mt-3 text-[11px] text-slate-300 italic font-serif leading-relaxed">
                    &quot;Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.&quot;
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 text-[10px] font-medium text-slate-300">
                      🏅 {statistics.goldDays} Hari Emas Tercapai
                    </span>
                    <button
                      onClick={handleShareToWife}
                      className="text-emerald-400 hover:text-emerald-300 font-extrabold flex items-center gap-1 text-[10.5px] bg-slate-950 px-2 py-1 rounded border border-slate-800 active:scale-95 transition"
                    >
                      <Share2 className="w-3 h-3 text-emerald-400" />
                      <span>Sync Istri</span>
                    </button>
                  </div>
                </div>

                {/* 7-Days Quick Selection Date Slider (High density visualization) */}
                <div id="date-slider-container" className="bg-white rounded-xl border border-slate-200 shadow-xs p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      NAVIGASI CEKLIS BULANAN (&plusmn;3 Hari Terdekat)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Cahaya hijau menandakan aktivitas tercatat
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 px-1">
                    {weekDays.map((targetDate, idx) => {
                      const dateStringKey = toLocalDateKey(targetDate);
                      const isCurSelected = currentSelectedDateKey === dateStringKey;
                      const dayNameShort = targetDate.toLocaleDateString('id-ID', { weekday: 'short' });
                      const dayNumber = targetDate.getDate();
                      const storedChecks = checkedItems[dateStringKey] || [];
                      const isDayDone = storedChecks.length > 0;
                      const dNumber = targetDate.getDay();
                      const isWeekend = dNumber === 0 || dNumber === 6;

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedDate(targetDate);
                            setScheduleOverride('auto');
                          }}
                          className={`py-2 px-1 rounded-lg flex flex-col items-center transition relative ${
                            isCurSelected
                              ? 'bg-slate-900 text-white shadow ring-2 ring-amber-400'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="text-[9px] uppercase font-mono tracking-wider mb-0.5 opacity-80">
                            {dayNameShort}
                          </span>
                          <span className={`text-base font-mono font-bold tracking-tight ${isWeekend && !isCurSelected ? 'text-rose-500' : ''}`}>
                            {dayNumber}
                          </span>
                          {/* Colored dot representation */}
                          <div className="mt-1">
                            {isDayDone ? (
                              <div className={`h-1.5 w-1.5 rounded-full ${isCurSelected ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual Calendar System Override tool */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2">
                    <span className="flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      Override Penjadwalan Manual:
                    </span>
                    <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200/50 self-start sm:self-auto font-mono text-[10px]">
                      <button
                        onClick={() => setScheduleOverride('auto')}
                        className={`px-2 py-0.5 rounded transition ${
                          scheduleOverride === 'auto' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Otomatis
                      </button>
                      <button
                        onClick={() => setScheduleOverride('weekday')}
                        className={`px-2 py-0.5 rounded transition ${
                          scheduleOverride === 'weekday' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Senin-Jumat
                      </button>
                      <button
                        onClick={() => setScheduleOverride('saturday')}
                        className={`px-2 py-0.5 rounded transition ${
                          scheduleOverride === 'saturday' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Sabtu
                      </button>
                      <button
                        onClick={() => setScheduleOverride('sunday')}
                        className={`px-2 py-0.5 rounded transition ${
                          scheduleOverride === 'sunday' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Minggu
                      </button>
                    </div>
                  </div>
                </div>

                {/* Primary Daily Checklist Container Box */}
                <div id="checklist-core-container" className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                  
                  {/* Dense Section Header bar */}
                  <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-amber-400 font-bold uppercase block">
                        JADWAL SIHAB SUCES: ACTIVE TABLE
                      </span>
                      <h3 className="text-xs font-display font-bold text-white mt-0.5 flex items-center gap-1.5">
                        {activeScheduleType === 'weekday' 
                          ? '📅 CEKLIS SENIN – JUMAT (Hari Mengajar)' 
                          : activeScheduleType === 'saturday' 
                            ? '📅 CEKLIS SABTU (Catch-Up & Konten)' 
                            : '📅 CEKLIS MINGGU (Quality Time & Finansial)'}
                      </h3>
                    </div>

                    <div className="flex gap-1.5 text-[10px]">
                      <button
                        onClick={handleCheckAllCurrentDay}
                        className="px-2 py-1 bg-emerald-700 hover:bg-emerald-600 font-medium text-white rounded transition cursor-pointer"
                      >
                        Centang Semua
                      </button>
                      <button
                        onClick={handleResetCurrentDay}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 font-medium text-slate-300 rounded transition cursor-pointer"
                      >
                        Kosongkan Hari Ini
                      </button>
                    </div>
                  </div>

                  {/* High Density Filter categories strip */}
                  <div className="px-4 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center space-x-1 overflow-x-auto text-[10.5px]">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase mr-2.5 shrink-0">
                      FILTER KATEGORI:
                    </span>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-2 py-0.5 rounded font-mono font-semibold transition ${
                        selectedCategory === 'all'
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      Semua ({activeScheduleItems.length})
                    </button>
                    {Object.keys(CATEGORY_STYLES).map(catKey => {
                      const style = CATEGORY_STYLES[catKey];
                      const count = activeScheduleItems.filter(item => item.category === catKey).length;
                      if (count === 0) return null;
                      return (
                        <button
                          key={catKey}
                          onClick={() => setSelectedCategory(catKey)}
                          className={`px-2 py-0.5 rounded font-mono font-semibold transition ${
                            selectedCategory === catKey
                              ? `${style.bg} border border-slate-300 font-bold`
                              : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                          }`}
                        >
                          {style.label} ({count})
                        </button>
                      );
                    })}
                  </div>

                  {/* Dense Task Rows */}
                  {filteredScheduleItems.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-mono text-xs">
                      Tidak ada agenda kategori ini untuk hari terkait.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {filteredScheduleItems.map((item) => {
                        const isChecked = currentChecked.includes(item.id);
                        const catStyle = item.category ? CATEGORY_STYLES[item.category] : null;

                        return (
                          <div
                            key={item.id}
                            onClick={() => handleToggleCheck(item.id)}
                            className={`group flex items-start p-3 transition duration-100 cursor-pointer select-none ${
                              isChecked 
                                ? 'bg-emerald-50/10 text-slate-500' 
                                : 'hover:bg-slate-50/60'
                            }`}
                          >
                            {/* Checkbox box indicator */}
                            <div className="mt-0.5 shrink-0 mr-3 flex items-center justify-center">
                              <div 
                                className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                                  isChecked 
                                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                                    : 'border-slate-300 bg-white group-hover:border-slate-400'
                                }`}
                              >
                                {isChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                              </div>
                            </div>

                            {/* Time Col */}
                            <div className="w-16 shrink-0 font-mono text-[11px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors mt-0.5">
                              {item.time}
                            </div>

                            {/* Main Title content */}
                            <div className="flex-1 min-w-0 pr-3">
                              <div className="flex items-start flex-wrap gap-1.5">
                                <span className={`text-xs leading-relaxed font-medium block ${
                                  isChecked ? 'line-through text-slate-400' : 'text-slate-900'
                                }`}>
                                  {item.activity}
                                </span>
                                
                                {catStyle && (
                                  <span className={`inline-block text-[8px] uppercase tracking-wider font-extrabold px-1 rounded font-mono ${catStyle.bg}`}>
                                    {catStyle.label}
                                  </span>
                                )}
                              </div>

                              {/* Prophetic descriptions - only show subtly or indented */}
                              <div className={`text-[10.5px] font-serif leading-relaxed mt-1 border-l-2 pl-2 ${
                                isChecked ? 'border-emerald-300/30 text-slate-400 italic' : 'border-amber-400/50 text-slate-500'
                              }`}>
                                {item.description}
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </div>

              {/* Grid 2: High Density Widgets & Metrics (Right Column) */}
              <div className="col-span-12 lg:col-span-4 flex flex-col space-y-4">
                
                {/* 1. Interactive Completion Percentage Summary Widget */}
                <div id="stat-progress-card" className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3.5">
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle
                        cx="28"
                        cy="28"
                        r="23"
                        className="text-slate-100"
                        strokeWidth="5.5"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="23"
                        className="transition-all duration-355 ease-out text-emerald-600"
                        strokeWidth="5.5"
                        strokeDasharray={2 * Math.PI * 23}
                        strokeDashoffset={2 * Math.PI * 23 * (1 - progressPercent / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute text-xs font-mono font-bold text-slate-900">{progressPercent}%</span>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono tracking-wider text-slate-400 font-bold uppercase">PROGRES CEKLIS</h4>
                    <p className="text-sm font-bold text-slate-900 mt-0.5 leading-none">
                      {currentChecked.length} dari {activeScheduleItems.length} Selesai
                    </p>
                    <div className="mt-1">
                      {isGoldenTargetMet ? (
                        <span className="inline-block text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded font-sans uppercase">
                          🏅 Target Emas &ge;70%
                        </span>
                      ) : (
                        <span className="inline-block text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded font-sans uppercase">
                          📈 Butuh {Math.max(0, Math.ceil(activeScheduleItems.length * 0.7) - currentChecked.length)} lagi
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. ZONA BISNIS & FINANSIAL (Persistent incremental reseller tracker) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center space-x-1.5">
                      <Briefcase className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-display font-bold text-slate-900">
                        Zona Bisnis &amp; Finansial
                      </h4>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded font-bold">
                      ACTIVE DATA
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                      KEMITRAAN / RESELLER TERJARING BULAN INI
                    </span>
                    <div className="flex items-center justify-between mt-2 bg-slate-55 bg-slate-100/60 p-2 rounded-lg border border-slate-150">
                      <div>
                        <span className="text-xl font-mono font-extrabold text-slate-900">
                          {resellerCount} <span className="text-[10px] font-normal font-sans text-slate-500">Klien</span>
                        </span>
                        <span className="text-[9.5px] block text-slate-500 font-serif italic mt-0.5">
                          Target: 30 Reseller/Bulan
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={handleDecrementReseller}
                          className="w-7 h-7 bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                          title="Kurangi 1 Reseller"
                        >
                          -
                        </button>
                        <button
                          onClick={handleIncrementReseller}
                          className="w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                          title="Tambahkan 1 Reseller Baru"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Business items checklist progress */}
                  <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                    <span>Progres Bisnis Hari Ini:</span>
                    <span className="font-bold text-slate-800">
                      {categoryCounts['bisnis']?.done || 0} / {categoryCounts['bisnis']?.total || 0} Selesai
                    </span>
                  </div>
                </div>

                {/* 3. FAMILY QUALITY PULSE (Live calculation on checked family items) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center space-x-1.5">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <h4 className="text-xs font-display font-bold text-slate-900">
                        Family Quality Pulse
                      </h4>
                    </div>
                    <span className="text-[9px] font-mono text-rose-500 bg-rose-50 px-1 py-0.2 rounded font-bold">
                      SINERGI ISTRI
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-mono uppercase">
                      <span>KONTRIBUSI KELUARGA HARI INI:</span>
                      <span className="font-bold text-rose-600">{familyMetrics.percent}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-100 h-2 rounded overflow-hidden mb-2">
                      <div 
                        className="bg-rose-500 h-full transition-all duration-355" 
                        style={{ width: `${familyMetrics.percent}%` }}
                      />
                    </div>

                    <div className="text-[10px] text-slate-600 leading-snug font-serif bg-rose-50/50 p-2 rounded border border-rose-100/50 italic">
                      &quot;Dilarang pulang ke rumah dengan raut lelah yang meresahkan. Sambutlah istri dan anak Anda dengan wajah ceria laksana Rasulullah.&quot;
                    </div>
                  </div>
                </div>

                {/* 4. EVALUASI & JURNAL SIHAB INPUT BLOCK */}
                <div id="evaluation-inputs-section" className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col space-y-3">
                  
                  <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                    <div className="flex items-center space-x-1.5">
                      <Bookmark className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-display font-bold text-slate-950">
                        Evaluasi &amp; Jurnal Catatan Harian
                      </h4>
                    </div>
                    <span className="text-[9.5px] text-slate-500 font-mono font-bold">
                      {activeScheduleType === 'sunday' ? 'MINGGUAN' : 'HARIAN'}
                    </span>
                  </div>

                  {activeScheduleType === 'sunday' ? (
                    <div className="space-y-3">
                      <div className="bg-amber-50/40 p-2.5 rounded border border-amber-100 text-[10.5px] text-amber-800 leading-relaxed font-serif">
                        <strong className="block font-bold">Duduk tenang bersanding dengan istri:</strong>
                        Evaluasi 1 minggu ke depan dan tentukan target baru agar terjalin harmoni dakwah.
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            🏆 1 Kebiasaan Terbaik Minggu Ini
                          </label>
                          <textarea
                            value={tempWeeklyEval.bestHabit}
                            onChange={(e) => setTempWeeklyEval({ ...tempWeeklyEval, bestHabit: e.target.value })}
                            placeholder="Contoh: Mengatur waktu qailulah tepat 15 menit..."
                            className="w-full text-xs p-2 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 min-h-[50px] font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            🔧 Kebiasaan yang akan Diperbaiki
                          </label>
                          <textarea
                            value={tempWeeklyEval.improveHabit}
                            onChange={(e) => setTempWeeklyEval({ ...tempWeeklyEval, improveHabit: e.target.value })}
                            placeholder="Contoh: Mengurangi main HP di teras..."
                            className="w-full text-xs p-2 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 min-h-[50px] font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            🎯 Rencana Konkrit Minggu Depan
                          </label>
                          <input
                            type="text"
                            value={tempWeeklyEval.targetNextWeek}
                            onChange={(e) => setTempWeeklyEval({ ...tempWeeklyEval, targetNextWeek: e.target.value })}
                            placeholder="Contoh: Membeli buku biologi Cambridge terbaru..."
                            className="w-full text-xs p-2 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 font-sans"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => saveWeeklyEvaluationState(currentSelectedDateKey, tempWeeklyEval)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10.5px] py-1.5 rounded transition duration-100 flex items-center justify-center space-x-1 shadow"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Simpan Evaluasi Bersama Istri</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <HeartHandshake className="w-4 h-4 text-rose-500" />
                            Kontribusi nyata untuk istri &amp; anak hari ini?
                          </span>
                        </label>
                        <textarea
                          value={tempReflection}
                          onChange={(e) => setTempReflection(e.target.value)}
                          placeholder="Tulis kontribusi pencerah atau pelukan hangat untuk istri/anak hari ini..."
                          className="w-full text-xs p-2 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 min-h-[70px] font-sans"
                        />
                      </div>

                      <button
                        onClick={() => saveReflectionState(currentSelectedDateKey, tempReflection)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10.5px] py-1.5 rounded transition duration-100 flex items-center justify-center space-x-1 shadow"
                      >
                        <Send className="w-3.5 h-3.5 text-slate-400" />
                        <span>Simpan Jurnal Harian</span>
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* ================================= TAB 2: RULES AND SENSES ================================= */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              
              {/* Header Box of Rules */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-855 to-slate-900 text-white rounded-xl p-6 border border-slate-800 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                  <span className="bg-amber-400/20 text-amber-300 font-mono font-bold text-[10px] px-2.5 py-0.5 rounded tracking-widest uppercase mb-1.5 inline-block">
                    SIHAB GOLDEN COMPASS
                  </span>
                  <h2 className="text-2xl font-display font-extrabold tracking-tight text-white">
                    🎯 3 Aturan Emas Sukses Di Bawah 40 Tahun
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed font-serif italic mt-1.5">
                    &quot;Allah tidak menuntut kita menyelesaikan seluruh mimpi besar kita sekaligus, melainkan menginginkan kesungguhan kecil yang dijaga dengan istiqomah harian.&quot;
                  </p>
                </div>
              </div>

              {/* The 3 Golden Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {GOLDEN_RULES.map((rule, idx) => {
                  return (
                    <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="w-7 h-7 bg-amber-400 font-mono font-bold text-slate-900 rounded-full flex items-center justify-center text-xs mb-3 shadow-sm border border-amber-300">
                          0{idx + 1}
                        </div>
                        <h3 className="text-xs font-display font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                          {rule.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-serif italic">
                          &quot;{rule.text}&quot;
                        </p>
                      </div>

                      {idx === 1 && (
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <button
                            onClick={handleShareToWife}
                            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-[10.5px] py-1.5 px-3 rounded transition flex items-center justify-center space-x-1.5 border border-slate-200"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Kirim Laporan &amp; Berdoa Bersama</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Prophet Closing Reminders */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs text-center max-w-2xl mx-auto relative overflow-hidden">
                <span className="text-slate-150 font-serif text-8xl absolute left-2 top-0 leading-none select-none select-none-opacity">“</span>
                <div className="relative z-10 space-y-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block">
                    PESAN RASULULLAH ﷺ UNTUK MEMBIMBING USAHA SIHAB
                  </span>
                  
                  <p className="text-lg font-serif italic font-medium text-slate-900 leading-relaxed px-4">
                    {CLOSING_MESSAGE.hadits}
                  </p>

                  <div className="h-px bg-slate-200 w-16 mx-auto" />

                  <p className="text-xs text-slate-500 italic">
                    Saat Anda merasa jenuh, letih, atau lelah berjuang di titik-titik di bawah ini:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left pt-2">
                    {CLOSING_MESSAGE.reminders.map((reminder, idx) => {
                      return (
                        <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200 text-xs">
                          <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block mb-0.5">
                            KONDISIONAL LELAH
                          </span>
                          <h4 className="font-display font-bold text-slate-900 leading-snug">
                            {reminder.context}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-normal font-serif italic">
                            {reminder.purpose}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 bg-slate-900 text-white p-4 rounded text-xs font-serif italic uppercase tracking-wider text-center border border-slate-800">
                    {CLOSING_MESSAGE.footer}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================================= TAB 3: STATS & DATA BACKUP ================================= */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              
              {/* Stats bento group */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                  <div className="bg-emerald-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-emerald-600 border border-emerald-100">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-slate-400 text-[10px] font-mono tracking-wider font-bold uppercase mb-0.5">TOTAL AKTIVITAS SELESAI</h4>
                  <p className="text-3xl font-mono font-extrabold text-slate-900">{statistics.totalCompleted}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Pencatatan kumulatif di database lokal</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                  <div className="bg-indigo-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-indigo-600 border border-indigo-100">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="text-slate-400 text-[10px] font-mono tracking-wider font-bold uppercase mb-0.5">TARGET EMAS TERCAPAI</h4>
                  <p className="text-3xl font-mono font-extrabold text-slate-900">{statistics.goldDays}</p>
                  <p className="text-[10px] text-emerald-600 mt-0.5 font-bold leading-none uppercase">Kategori Hari Sukses (&ge;70%)</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                  <div className="bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2.5 text-amber-600 border border-amber-100">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="text-slate-400 text-[10px] font-mono tracking-wider font-bold uppercase mb-0.5">STREAK KONSISTEN AKTIF</h4>
                  <p className="text-3xl font-mono font-extrabold text-slate-900">{statistics.streak}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Hari beruntun dengan capaian &ge;70%</p>
                </div>

              </div>

              {/* Export & Import settings panel */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5 mb-3">
                  <Download className="w-4 h-4 text-slate-700" />
                  <h3 className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider">
                    Cadangan &amp; Keamanan Data Kamar / Storage
                  </h3>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Data perjuangan harian Anda disimpan di komputer ini sendiri secara luring menggunakan standard client-side data storage. Agar kemajuan tidak hilang saat berganti komputer atau membersihkan cache penjelajahan, ekspor secara berkala berkas cadangan harian di bawah ini:
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportData}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded transition flex items-center space-x-1 shadow cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-300" />
                    <span>Ekspor Berkas Cadangan (.json)</span>
                  </button>

                  <div className="relative">
                    <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded cursor-pointer transition flex items-center space-x-1.5 border border-slate-300">
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>Impor Berkas Cadangan (.json)</span>
                      <input
                        type="file"
                        id="data-import-input"
                        accept=".json"
                        onChange={handleImportData}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Scrollable journal logs of past entries */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5 mb-3.5">
                  <BookOpen className="w-4 h-4 text-rose-500" />
                  <h3 className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider">
                    Sejarah Jurnal Kontribusi Keluarga &amp; Evaluasi Mingguan
                  </h3>
                </div>

                {Object.keys(reflections).length === 0 && Object.keys(weeklyEvaluations).length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 font-mono bg-slate-50 rounded border border-slate-150">
                    Belum ada rekaman sejarah harian atau jurnal tersimpan dalam memori luring.
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {Array.from(new Set([...Object.keys(reflections), ...Object.keys(weeklyEvaluations)]))
                      .sort((a, b) => b.localeCompare(a))
                      .slice(0, 8)
                      .map(dateKey => {
                        const dailyReflectStr = reflections[dateKey];
                        const weeklyEvalItem = weeklyEvaluations[dateKey];
                        const pParts = dateKey.split('-');
                        const dVal = new Date(Number(pParts[0]), Number(pParts[1]) - 1, Number(pParts[2]));
                        const dayName = dVal.toLocaleDateString('id-ID', { weekday: 'long' });

                        return (
                          <div key={dateKey} className="bg-slate-50 p-3.5 rounded border border-slate-200 leading-relaxed text-xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono font-bold text-slate-700 bg-slate-250 px-2 py-0.5 rounded border border-slate-300">
                                📅 {dayName}, {dateKey}
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                Laporan Historis
                              </span>
                            </div>

                            {dailyReflectStr && (
                              <div className="mb-2 pl-2.5 border-l-2 border-rose-500">
                                <span className="text-[8.5px] uppercase font-mono font-extrabold text-rose-600 block mb-0.5">
                                  KONTRIBUSI NYATA KELUARGA:
                                </span>
                                <p className="text-slate-600 font-serif italic">&quot;{dailyReflectStr}&quot;</p>
                              </div>
                            )}

                            {weeklyEvalItem && (
                              <div className="mt-2.5 pt-2.5 border-t border-slate-200 space-y-2">
                                <span className="text-[8.5px] uppercase font-mono font-extrabold text-indigo-600 block">
                                  EVALUASI MINGGUAN PASANGAN:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  <div className="bg-white p-2 rounded border border-slate-150">
                                    <span className="text-[8px] uppercase font-mono font-bold text-emerald-800 block">
                                      Terbaik Minggu Ini:
                                    </span>
                                    <span className="text-slate-600 block text-[11px] mt-0.5">{weeklyEvalItem.bestHabit || '-'}</span>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-slate-150">
                                    <span className="text-[8px] uppercase font-mono font-bold text-amber-800 block">
                                      Perbaikan Rencana:
                                    </span>
                                    <span className="text-slate-600 block text-[11px] mt-0.5">{weeklyEvalItem.improveHabit || '-'}</span>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-slate-150">
                                    <span className="text-[8px] uppercase font-mono font-bold text-indigo-800 block">
                                      Target Berikutnya:
                                    </span>
                                    <span className="text-slate-600 block text-[11px] mt-0.5">{weeklyEvalItem.targetNextWeek || '-'}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* ================================= FOOTER ACTIVITY REMINDER STREAM BAR ================================= */}
        <footer className="h-9 bg-slate-900 border-t border-slate-800 text-slate-400 text-[10.5px] px-4 md:px-6 flex items-center justify-between shrink-0 font-mono">
          <div className="flex items-center space-x-2 truncate">
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.2 rounded text-[9.5px]">
              UPCOMING
            </span>
            {upcomingItem ? (
              <span className="truncate">
                Berikutnya: [{upcomingItem.time}] {upcomingItem.activity}
              </span>
            ) : (
              <span className="text-slate-500">Misi hari ini telah tuntas! Alhamdulillah.</span>
            )}
          </div>
          <div className="hidden sm:block text-[9.5px] text-slate-500 font-sans italic">
            Sihab Success Under 40 Tahun © {new Date().getFullYear()}
          </div>
        </footer>

        {/* ================================= MOBILE BOTTOM NAVIGATION BAR (Android optimization) ================================= */}
        <nav className="lg:hidden h-16 bg-slate-900 border-t border-slate-800 px-2 flex items-center justify-around shrink-0 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition relative touch-manipulation ${
              activeTab === 'planner' 
                ? 'text-amber-400 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ClipboardCheck className={`w-5.5 h-5.5 mb-1 transition-transform ${activeTab === 'planner' ? 'scale-110 text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[10.5px] tracking-tight">Agenda</span>
            {activeTab === 'planner' && (
              <div className="absolute bottom-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition relative touch-manipulation ${
              activeTab === 'rules' 
                ? 'text-amber-400 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className={`w-5.5 h-5.5 mb-1 transition-transform ${activeTab === 'rules' ? 'scale-110 text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[10.5px] tracking-tight">Aturan Emas</span>
            {activeTab === 'rules' && (
              <div className="absolute bottom-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition relative touch-manipulation ${
              activeTab === 'history' 
                ? 'text-amber-400 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className={`w-5.5 h-5.5 mb-1 transition-transform ${activeTab === 'history' ? 'scale-110 text-indigo-400' : 'text-slate-400'}`} />
            <span className="text-[10.5px] tracking-tight">Sejarah</span>
            {activeTab === 'history' && (
              <div className="absolute bottom-1 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
            )}
          </button>
        </nav>

      </div>

    </div>
  );
}
