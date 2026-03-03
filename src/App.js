import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './config';
import { 
  User, Settings, FileText, Image as ImageIcon, Activity, 
  LogOut, LogIn, Shield, Plus, Trash2, Edit3, CheckCircle,
  Cpu, Server, Database, Menu, X, ExternalLink, Layers,
  LayoutDashboard, Users, Megaphone, Star, MonitorPlay, Code, Github,
  CalendarDays, MapPin, Clock, Briefcase, Instagram, MessageSquare, Link as LinkIcon,
  Gamepad2, Monitor, Apple, Terminal, Download, ChevronLeft, ChevronRight,
  GraduationCap
} from 'lucide-react';

// ==========================================
// STYLE GLOBALNE (Tailwind classes)
// ==========================================
const glassStyle = "backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl";
const buttonStyle = "px-4 py-2 rounded-xl transition-all active:scale-95 flex items-center gap-2 font-medium";
const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-400 transition-colors";

// ==========================================
// NAWIGACJA
// ==========================================
const Navbar = ({ user, setView, activeView, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (viewName) => {
    setView(viewName);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-50 md:w-[95%] max-w-6xl ${glassStyle} px-4 md:px-6 py-3 md:py-4 flex items-center justify-between`}>
        
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
            <Cpu size={20} className="text-white md:w-6 md:h-6" />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            SKNI
          </span>
        </div>

        {/* MENU DESKTOPOWE */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => setView('home')} className={`${activeView === 'home' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors`}>Start</button>
          <button onClick={() => setView('about')} className={`${activeView === 'about' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors`}>O nas</button>
          <button onClick={() => setView('blog')} className={`${activeView === 'blog' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors`}>Blog</button>
          <button onClick={() => setView('events')} className={`${activeView === 'events' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors`}>Wydarzenia</button>
          <button onClick={() => setView('projects')} className={`${activeView === 'projects' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors`}>Projekty</button>
          <button onClick={() => setView('gallery')} className={`${activeView === 'gallery' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors`}>Galeria</button>
          
          {user && (
            <button onClick={() => setView('hub')} className={`${activeView === 'hub' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors flex items-center gap-1`}>
              <Layers size={16} /> Hub
            </button>
          )}
          
          {(user?.role === 'admin' || user?.role === 'editor') && (
            <button onClick={() => setView('editor')} className={`${activeView === 'editor' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors flex items-center gap-1`}>
              <Edit3 size={16} /> Panel
            </button>
          )}
          
          {user?.role === 'admin' && (
            <button onClick={() => setView('admin')} className={`${activeView === 'admin' ? 'text-cyan-400' : 'text-gray-300'} hover:text-white transition-colors flex items-center gap-1`}>
              <Activity size={16} /> Admin
            </button>
          )}
        </div>

        {/* PRAWA STRONA NAWIGACJI */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <span className="hidden sm:block text-xs text-cyan-400 font-bold uppercase">{user.username}</span>
              <button onClick={handleLogout} className="p-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button onClick={() => handleNavClick('login')} className={`${buttonStyle} justify-center bg-cyan-500 text-white hover:bg-cyan-400 text-sm px-3 py-2 hidden sm:flex`}>
              <LogIn size={16} /> <span className="hidden sm:inline">Zaloguj</span>
            </button>
          )}

          {/* HAMBURGER MOBILNY */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* MENU MOBILNE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl md:hidden pt-28 px-6 animate-in slide-in-from-top-10 duration-300 flex flex-col">
          <div className="flex flex-col gap-4 text-center text-lg font-bold">
            <button onClick={() => handleNavClick('home')} className="py-3 border-b border-white/5 hover:text-cyan-400">Start</button>
            <button onClick={() => handleNavClick('about')} className="py-3 border-b border-white/5 hover:text-cyan-400">O nas</button>
            <button onClick={() => handleNavClick('events')} className="py-3 border-b border-white/5 hover:text-cyan-400">Wydarzenia</button>
            <button onClick={() => handleNavClick('projects')} className="py-3 border-b border-white/5 hover:text-cyan-400">Projekty</button>
            <button onClick={() => handleNavClick('blog')} className="py-3 border-b border-white/5 hover:text-cyan-400">Blog</button>
            <button onClick={() => handleNavClick('gallery')} className="py-3 border-b border-white/5 hover:text-cyan-400">Galeria</button>
            
            {user && (
              <button onClick={() => handleNavClick('hub')} className="py-3 border-b border-white/5 hover:text-cyan-400 text-cyan-400 flex items-center justify-center gap-2">
                <Layers size={20} /> Hub
              </button>
            )}
            
            {!user && (
              <button onClick={() => handleNavClick('login')} className="py-3 border-b border-white/5 text-cyan-400 flex items-center justify-center gap-2">
                <LogIn size={20} /> Zaloguj do panelu
              </button>
            )}
            
            {(user?.role === 'admin' || user?.role === 'editor') && (
               <button onClick={() => handleNavClick('editor')} className="py-3 border-b border-white/5 hover:text-cyan-400 text-cyan-200">Panel Treści</button>
            )}
            
            {user?.role === 'admin' && (
               <button onClick={() => handleNavClick('admin')} className="py-3 border-b border-white/5 hover:text-cyan-400 text-purple-300">Admin</button>
            )}
            
            <button onClick={() => setIsMobileMenuOpen(false)} className="mt-6 p-4 text-gray-500 bg-white/5 rounded-2xl text-sm uppercase tracking-widest w-full hover:bg-white/10 transition-colors">
              Zamknij Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ==========================================
// GŁÓWNY KOMPONENT APLIKACJI
// ==========================================
export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [posts, setPosts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePostId, setActivePostId] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  
  const [globalSettings, setGlobalSettings] = useState({ instagram: '', github: '', discord: '' });

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#0f172a"; 
    document.body.style.backgroundColor = "#0f172a";
    document.body.style.margin = "0";

    const checkUser = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) setUser(JSON.parse(savedUser));
    };

    const fetchData = async () => {
      try {
        const postsRes = await axios.get(`${API_URL}/get_posts.php`);
        setPosts(postsRes.data);
        const galleryRes = await axios.get(`${API_URL}/get_gallery.php`);
        setGallery(galleryRes.data);
        const settingsRes = await axios.get(`${API_URL}/get_settings.php`);
        if(!settingsRes.data.error) setGlobalSettings(settingsRes.data);
      } catch (err) {
        console.error("Błąd pobierania danych z API:", err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setView('home');
  };

  const renderView = () => {
    switch (view) {
      case 'home': return <HomeView setView={setView} posts={posts} settings={globalSettings} />;
      case 'about': return <AboutView />;
      case 'blog': return <BlogView posts={posts} setView={setView} setActivePostId={setActivePostId} />;
      case 'projects': return <ProjectsView setView={setView} setActiveProjectId={setActiveProjectId} />;
      case 'single_project': return <SingleProjectView id={activeProjectId} setView={setView} />;
      case 'events': return <EventsView />;
      case 'hub': return <HubView user={user} />;
      case 'single_post': return <SinglePostView id={activePostId} setView={setView} />;
      case 'gallery': return <GalleryView gallery={gallery} />;
      case 'editor': return <ContentEditor user={user} settings={globalSettings} setSettings={setGlobalSettings} />;
      case 'admin': return <AdminPanel settings={globalSettings} setSettings={setGlobalSettings} />;
      case 'login': return <LoginView setUser={setUser} setView={setView} />;
      case 'game': return <GameView />;
      default: return <HomeView setView={setView} posts={posts} settings={globalSettings} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white selection:bg-cyan-500/30 overflow-x-hidden w-full font-sans">
      
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] animate-pulse rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] animate-pulse rounded-full" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar user={user} setView={setView} activeView={view} handleLogout={handleLogout} />

      <main className="flex-1 w-full pt-28 md:pt-32 pb-20 px-4 md:px-6 max-w-6xl mx-auto flex flex-col">
        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-gray-400 animate-pulse">Łączenie z serwerem...</p>
          </div>
        ) : renderView()}
      </main>

      <footer className="py-10 border-t border-white/5 bg-black/20 text-center flex flex-col items-center gap-6 mt-auto">
        <div className="flex items-center gap-6 text-gray-400">
            <a href="https://up.lublin.pl" target="_blank" rel="noreferrer" className="hover:text-green-400 hover:scale-110 transition-all shadow-[0_0_15px_rgba(74,222,128,0)] hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] rounded-full" title="Uniwersytet Przyrodniczy w Lublinie">
                <GraduationCap size={28}/>
            </a>
            {globalSettings.instagram && (
                <a href={globalSettings.instagram} target="_blank" rel="noreferrer" className="hover:text-pink-500 hover:scale-110 transition-all"><Instagram size={24}/></a>
            )}
            {globalSettings.github && (
                <a href={globalSettings.github} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all"><Github size={24}/></a>
            )}
            {globalSettings.discord && (
                <a href={globalSettings.discord} target="_blank" rel="noreferrer" className="hover:text-indigo-400 hover:scale-110 transition-all"><MessageSquare size={24}/></a>
            )}
        </div>
        <p className="text-gray-600 text-sm">© 2026 SKNI - Studenckie Koło Naukowe Informatyków.</p>
      </footer>
    </div>
  );
}

// ==========================================
// WIDOKI POBOCZNE (SUBVIEWS)
// ==========================================

function HomeView({ setView, posts, settings }) {
  const featuredPosts = posts.filter(p => p.is_featured == 1).slice(0, 3);
  const showGamePromo = settings?.show_game_promo === 'true';
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://w.behold.so/widget.js";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="space-y-12 md:space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full overflow-hidden">
      
      <style>
        {`
          @keyframes slide-bg {
            0% { background-position: 0% 0; }
            100% { background-position: -200% 0; }
          }
          .animate-stripes {
            animation: slide-bg 8s linear infinite;
          }
        `}
      </style>

      {/* SEKCJA GŁÓWNA Z ANIMOWANYM TŁEM */}
      <div className="relative w-full py-20 md:py-32 flex flex-col items-center text-center overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-slate-900/40 to-black/40 shadow-2xl mt-4 md:mt-8">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60 mix-blend-screen overflow-hidden">
          <div className="absolute -inset-[50%] flex flex-col justify-center gap-10 md:gap-16" style={{ transform: `rotate(-20deg) translateY(${scrollY * 0.3}px)` }}>
            <div className="w-full h-[2px] animate-stripes shadow-[0_0_15px_#22d3ee]" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, #22d3ee 50%, transparent 100%)', backgroundSize: '50% 100%' }}></div>
            <div className="w-full h-[4px] animate-stripes shadow-[0_0_25px_#3b82f6]" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)', backgroundSize: '60% 100%', animationDuration: '12s', animationDirection: 'reverse' }}></div>
            <div className="w-full h-[1px] animate-stripes shadow-[0_0_15px_#a855f7]" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, #a855f7 50%, transparent 100%)', backgroundSize: '30% 100%', animationDuration: '5s' }}></div>
            <div className="w-full h-[3px] animate-stripes shadow-[0_0_20px_#818cf8]" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, #818cf8 50%, transparent 100%)', backgroundSize: '50% 100%', animationDuration: '10s' }}></div>
            <div className="w-full h-[2px] animate-stripes shadow-[0_0_15px_#22d3ee]" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, #22d3ee 50%, transparent 100%)', backgroundSize: '40% 100%', animationDuration: '14s', animationDirection: 'reverse' }}></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none z-0"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-tight italic break-words w-full">
            KODUJEMY <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              PRZYSZŁOŚĆ
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed bg-black/30 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 rounded-2xl">
            Oficjalna strona Studenckiego Koła Naukowego Informatyków. Miejsce, w którym pomysły zamieniamy w kod, a pasję do technologii w realne projekty.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 w-full sm:w-auto">
            <button onClick={() => setView('blog')} className={`${buttonStyle} justify-center bg-white text-black hover:bg-gray-200 w-full sm:w-auto px-8 py-4 text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]`}>
              Zobacz Blog
            </button>
            <button onClick={() => setView('projects')} className={`${buttonStyle} justify-center bg-white/5 border border-white/10 hover:bg-white/10 w-full sm:w-auto px-8 py-4 text-lg`}>
              Nasze Projekty
            </button>
          </div>
        </div>
      </div>

      {/* KARTY INFORMACYJNE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 md:px-0">
        {[
            { icon: <Code />, title: "Programowanie", desc: "Tworzymy aplikacje i gry w różnych technologiach. Uczymy się C#, Pythona, web developmentu i rozwiązywania realnych problemów programistycznych." },
            { icon: <Layers />, title: "Projektowanie", desc: "Projektujemy interfejsy, grafikę i elementy wizualne naszych projektów. Łączymy estetykę z funkcjonalnością." },
            { icon: <Users />, title: "Społeczność", desc: "Działamy w przyjaznej atmosferze, wspieramy się nawzajem i rozwijamy poprzez wspólną pracę nad projektami." }
        ].map((item, i) => (
            <div key={i} className={`${glassStyle} p-6 md:p-8 hover:translate-y-[-4px] transition-transform group`}>
              <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors text-cyan-400">
                  {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
        ))}
      </div>

      {/* PROMO GRY KOŁA */}
      {showGamePromo && (
          <div className="px-2 md:px-0 pt-4">
              <div onClick={() => setView('game')} className={`${glassStyle} overflow-hidden cursor-pointer group relative flex flex-col md:flex-row items-stretch border-cyan-500/30 hover:border-cyan-400 transition-all`}>
                  <div className="md:w-1/2 p-8 md:p-12 space-y-6 z-10 relative flex flex-col justify-center">
                      <div className="inline-block w-fit bg-cyan-500/20 text-cyan-400 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2 border border-cyan-500/30">
                        Nasz Wyróżniony Projekt
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black italic tracking-tight">
                        PRZETESTUJ NASZĄ <br/><span className="text-cyan-400">AUTORSKĄ GRĘ</span>
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        Pracujemy nad własną grą w silniku Godot. Spróbuj naprawić fabrykę i zobacz co potrafi nasz zespół. Pobierz grę na swój komputer (Windows, macOS lub Linux) i przetestuj!
                      </p>
                      <div className="inline-flex items-center w-fit gap-2 bg-cyan-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-cyan-400 transition-colors">
                        <Gamepad2 size={20} /> Zagraj teraz
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 h-64 md:h-auto absolute md:relative inset-0 md:inset-auto z-0">
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
                      <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop" alt="Gra Godot" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700" />
                  </div>
              </div>
          </div>
      )}

      {/* WYRÓŻNIONE WPISY */}
      {featuredPosts.length > 0 && (
          <div className="pt-4 px-2 md:px-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 italic text-center md:text-left">Wyróżnione wpisy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {featuredPosts.map(post => (
                      <div key={post.id} onClick={() => setView('blog')} className={`${glassStyle} p-4 cursor-pointer hover:border-cyan-500/50 transition-colors`}>
                          {post.image_url && <img src={post.image_url} alt="cover" className="w-full h-40 md:h-32 object-cover rounded-xl mb-3"/>}
                          <h4 className="font-bold text-lg">{post.title}</h4>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content.replace(/<[^>]+>/g, '') }}></p>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* SEKCJA INSTAGRAMA */}
      <div className="pt-10 border-t border-white/10 px-2 md:px-0">
          <div className="flex flex-col items-center text-center mb-8 space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold italic flex flex-wrap justify-center items-center gap-2">
                  <span className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                      #SKNI
                  </span>
                  <span>na Instagramie</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base">Zobacz co robimy na co dzień. Zostaw followa!</p>
          </div>
          <div className={`${glassStyle} p-4 md:p-8 overflow-hidden bg-black/20 w-full`}>
              <behold-widget feed-id="LvQLE6IkwRoIr3fJMCZD"></behold-widget>
          </div>
          <div className="flex justify-center mt-8 pb-4">
              <a href={settings?.instagram || "https://instagram.com/"} target="_blank" rel="noreferrer" className={`${buttonStyle} justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white font-bold px-8 py-4 w-full sm:w-auto hover:scale-105 transition-transform shadow-lg shadow-pink-500/20`}>
                  Zaobserwuj nasz profil
              </a>
          </div>
      </div>

    </div>
  );
}

function HubView() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/get_hub_links.php`)
      .then(res => { setLinks(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse">Ładowanie zasobów...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <Layers className="text-cyan-400" size={32} />
        <h2 className="text-4xl font-bold italic">Hub Projektów</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map(link => (
          <a href={link.url} key={link.id} className={`${glassStyle} p-6 hover:border-cyan-400/50 hover:translate-y-[-5px] transition-all group block`}>
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors text-cyan-400">
              <ExternalLink size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{link.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{link.description}</p>
            <div className="mt-4 text-xs font-bold text-cyan-500 uppercase tracking-widest">Otwórz stronę →</div>
          </a>
        ))}
        {links.length === 0 && <p className="text-gray-500 col-span-full text-center py-10">Brak dodanych stron w hubie.</p>}
      </div>
    </div>
  );
} 

function BlogView({ posts, setView, setActivePostId }) {
  const [activeCat, setActiveCat] = useState('Wszystkie');
  const categories = ['Wszystkie', ...new Set(posts.map(p => p.category || 'Ogólne'))];
  const filteredPosts = activeCat === 'Wszystkie' ? posts : posts.filter(p => (p.category || 'Ogólne') === activeCat);

  const stripHtml = (html) => {
     let tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  };

  const handlePostClick = (id) => {
    setActivePostId(id);
    setView('single_post');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold italic">Blog Koła</h2>
          <p className="text-gray-400 mt-2">Najnowsze wpisy, tutoriale i artykuły od naszych członków.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pb-4">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCat(cat)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              activeCat === cat ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? filteredPosts.map(post => (
          <article 
            key={post.id} 
            onClick={() => handlePostClick(post.id)}
            className={`${glassStyle} overflow-hidden group hover:border-cyan-500/40 transition-all cursor-pointer hover:-translate-y-2 flex flex-col`}
          >
            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden shrink-0">
              {post.image_url ? (
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <FileText size={48} className="text-gray-700" />
              )}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-bold text-cyan-400">
                {post.category || 'Ogólne'}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors line-clamp-2 mb-3">{post.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">{stripHtml(post.content).substring(0, 150)}...</p>
              <div className="pt-4 mt-4 flex items-center justify-between text-xs text-gray-500 border-t border-white/5">
                <span className="flex items-center gap-1"><User size={14}/> {post.username}</span>
                <span className="text-cyan-400 font-bold group-hover:underline">Czytaj →</span>
              </div>
            </div>
          </article>
        )) : (
          <div className="col-span-full py-20 text-center opacity-50"><p>Brak wpisów w tej kategorii.</p></div>
        )}
      </div>
    </div>
  );
}

function GameView() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const gameImages = [
    "/uploads/game/gra1.png",
    "/uploads/game/gra2.png",
    "/uploads/game/gra3.png",
    "/uploads/game/gra4.png",
    "/uploads/game/gra5.png"
  ];

  const nextImg = () => setCurrentImgIndex((prev) => (prev + 1) % gameImages.length);
  const prevImg = () => setCurrentImgIndex((prev) => (prev - 1 + gameImages.length) % gameImages.length);

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-10">
      
      {/* 1. NAGŁÓWEK I OPIS */}
      <div className="text-center space-y-8 py-6 md:py-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase flex flex-col md:flex-row items-center justify-center gap-4">
          <Gamepad2 className="text-cyan-400 w-12 h-12 md:w-16 md:h-16" />
          Projekt <span className="text-cyan-400">"Re-boot"</span>
        </h2>
        
        <div className={`${glassStyle} p-8 md:p-12 text-left space-y-6 text-gray-300 leading-relaxed text-lg relative overflow-hidden`}>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <p className="relative z-10">
                <b>Re-boot</b> to w pełni autorska gra stworzona w silniku <b>Godot</b>, mająca na celu promocję kierunku <b>Informatyka Przemysłowa</b>. Jako członkowie Studenckiego Koła Naukowego Informatyków połączyliśmy naszą pasję do gamedevu z wiedzą ze studiów, tworząc projekt, który bawi i uczy jednocześnie.
            </p>
            <p className="relative z-10 mt-4">
                Wcielasz się w rolę nowo zatrudnionego stażysty w zautomatyzowanej fabryce. Twój pierwszy dzień pracy szybko wymyka się spod kontroli, gdy cztery kluczowe maszyny ulegają awarii. Inni pracownicy zakładu (NPC) zlecają Ci kolejne misje ratunkowe. Aby zapobiec katastrofie, musisz własnoręcznie je naprawić. Każda awaria to unikalna mini-gra, której mechanika opiera się na rzeczywistych zagadnieniach i przedmiotach wykładanych na naszym kierunku!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/10 mt-6 relative z-10">
                <div>
                    <h4 className="text-cyan-400 font-bold mb-2 uppercase tracking-widest text-sm">Cechy Gry:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-gray-300">
                        <li>Fabuła z perspektywy stażysty ratującego fabrykę</li>
                        <li>4 unikalne mini-gry oparte na wiedzy z Informatyki Przemysłowej</li>
                        <li>Zabawne interakcje z pracownikami (NPC)</li>
                        <li>Projekt w całości zaprogramowany przez studentów SKNI</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-cyan-400 font-bold mb-2 uppercase tracking-widest text-sm">Aktualny Status:</h4>
                        <span className="inline-block bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
                            Wczesny dostęp (Alpha)
                        </span>
                    </div>
                    <div>
                        <h4 className="text-cyan-400 font-bold mb-2 uppercase tracking-widest text-sm">Kod Źródłowy:</h4>
                        <a href="https://github.com/Pequtek2/re-boot" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 text-white px-5 py-2.5 rounded-xl transition-all text-sm font-bold group shadow-lg">
                            <Github size={18} className="group-hover:text-cyan-400 transition-colors" /> Zobacz projekt na GitHubie
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 2. INTERAKTYWNA GALERIA */}
      <div className="space-y-6">
          <h3 className="text-3xl font-bold italic flex items-center justify-center gap-3">
            <ImageIcon className="text-cyan-400" /> Galeria ze świata gry
          </h3>
          <div className="relative group w-full aspect-video rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black">
              <img src={gameImages[currentImgIndex]} alt={`Screenshot ${currentImgIndex + 1}`} className="w-full h-full object-cover transition-opacity duration-500" />
              <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-cyan-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-white/20"><ChevronLeft size={30} /></button>
              <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-cyan-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-white/20"><ChevronRight size={30} /></button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                  {gameImages.map((_, idx) => (
                      <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImgIndex ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_#22d3ee]' : 'bg-white/30 hover:bg-white/50 cursor-pointer'}`} onClick={() => setCurrentImgIndex(idx)}></div>
                  ))}
              </div>
          </div>
      </div>

      {/* 3. GUZIKI POBIERANIA */}
      <div className="pt-12 border-t border-white/10 space-y-8">
          <div className="text-center">
              <h3 className="text-3xl font-bold italic">Pobierz i przetestuj</h3>
              <p className="text-gray-400 mt-2">Wybierz swój system operacyjny. Wypakuj archiwum i uruchom grę!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${glassStyle} p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-2 hover:border-blue-500/50 transition-all group`}>
              <Monitor className="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
              <div><h3 className="text-2xl font-bold text-white">Windows</h3><p className="text-sm text-gray-400">Wersja 64-bit (.zip)</p></div>
              <a href="/downloads/reboot_windows.zip" download className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20"><Download size={20} /> Pobierz (Windows)</a>
            </div>
            <div className={`${glassStyle} p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-2 hover:border-gray-300/50 transition-all group`}>
              <Apple className="w-16 h-16 text-gray-200 group-hover:scale-110 transition-transform duration-500" />
              <div><h3 className="text-2xl font-bold text-white">macOS</h3><p className="text-sm text-gray-400">Apple Silicon & Intel (.zip)</p></div>
              <a href="/downloads/reboot_macos.dmg" download className="mt-4 w-full bg-gray-200 hover:bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-white/10"><Download size={20} /> Pobierz (Mac)</a>
            </div>
            <div className={`${glassStyle} p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-2 hover:border-orange-500/50 transition-all group`}>
              <Terminal className="w-16 h-16 text-orange-400 group-hover:scale-110 transition-transform duration-500" />
              <div><h3 className="text-2xl font-bold text-white">Linux</h3><p className="text-sm text-gray-400">Wersja uniwersalna (.tar.gz)</p></div>
              <a href="/downloads/reboot_linux.tar.gz" download className="mt-4 w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/20"><Download size={20} /> Pobierz (Linux)</a>
            </div>
          </div>
      </div>

    </div>
  );
}

function SinglePostView({ id, setView }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(!id) return;
    
    axios.get(`${API_URL}/get_single_post.php?id=${id}`)
      .then(res => { setPost(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <div className="p-10 text-center animate-pulse">Ładowanie treści...</div>;
  if (!post || post.error) return <div className="p-10 text-center text-red-400">Nie znaleziono wpisu.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <button onClick={() => setView('blog')} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
        ← Powrót do listy wpisów
      </button>

      <article className="space-y-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
          {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-[400px] object-cover opacity-80" />}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8 pt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-300">
               <span className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black">
                   {post.username ? post.username.charAt(0).toUpperCase() : 'A'}
                 </div>
                 {post.username}
               </span>
               <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-lg leading-relaxed text-gray-300 shadow-xl">
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  );
}

function GalleryView({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <h2 className="text-4xl md:text-5xl font-bold italic">Galeria</h2>
      <div className="columns-1 md:columns-3 gap-6 space-y-6">
        {gallery.map(item => (
          <div key={item.id} onClick={() => setSelectedImage(item.image_url)} className={`${glassStyle} overflow-hidden group cursor-pointer relative break-inside-avoid`}>
            <img src={item.image_url} alt={item.caption} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <p className="text-sm text-gray-300 font-bold">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out transition-all duration-300" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-[101]"><X size={28} /></button>
            <img src={selectedImage} alt="Powiększenie" className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300 cursor-default" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

function AboutView() {
  const [imageUrl, setImageUrl] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/get_about_image.php`)
      .then(res => { if(res.data.url) setImageUrl(res.data.url + "?t=" + new Date().getTime()); })
      .catch(err => console.error(err));
      
    axios.get(`${API_URL}/get_members.php`)
      .then(res => { if(Array.isArray(res.data)) setMembers(res.data); })
      .catch(err => console.error(err));
  }, []);

  const importantMembers = members.filter(m => m.is_board == 1 || m.is_marketing == 1);
  const regularMembers = members.filter(m => m.is_board == 0 && m.is_marketing == 0);

  const MemberCard = ({ m, highlightColor, labelColor }) => (
    <div className={`${glassStyle} p-6 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform relative overflow-hidden`}>
      {highlightColor && <div className={`absolute -top-10 -right-10 w-32 h-32 ${highlightColor} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>}
      <div className={`w-24 h-24 md:w-32 h-32 rounded-full overflow-hidden bg-white/5 border-2 ${labelColor.replace('text', 'border')}/30 mb-4 flex items-center justify-center shrink-0 z-10 relative`}>
        {m.image_url ? <img src={m.image_url} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <User size={48} className="text-gray-400 group-hover:text-white transition-colors" />}
      </div>
      <h4 className="text-xl font-bold z-10">{m.name}</h4>
      <p className={`${labelColor} text-sm font-bold uppercase tracking-widest mt-1 mb-3 z-10`}>{m.role}</p>
      <p className="text-gray-400 text-sm leading-relaxed z-10">{m.description}</p>
    </div>
  );

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="text-center space-y-4 py-10">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic">KIM <span className="text-cyan-400">JESTEŚMY?</span></h2>
        <p className="text-gray-400 text-lg">Poznaj Studenckie Koło Naukowe Informatyków (SKNI).</p>
      </div>

      {imageUrl && (
        <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
          <img src={imageUrl} alt="Grupa SKNI" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      )}

      <div className={`${glassStyle} p-8 md:p-12 space-y-6 text-gray-300 leading-relaxed text-lg`}>
        <p>Jesteśmy studentami informatyki przemysłowej, których łączy pasja do tworzenia i eksperymentowania z technologią. W Studenckim Kole Naukowym Informatyków rozwijamy swoje umiejętności poprzez praktyczne projekty, wspólną naukę i realizację własnych pomysłów.</p>
        <div className="grid md:grid-cols-2 gap-6 py-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-colors">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3"><Cpu className="text-cyan-400"/> Nasza misja</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Rozwijamy się poprzez działanie. Tworzymy aplikacje, gry i projekty technologiczne, ucząc się współpracy, kreatywności i realnego zastosowania programowania w praktyce.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-colors">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3"><Database className="text-cyan-400"/> Co robimy?</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Realizujemy projekty programistyczne, budujemy własne inicjatywy (m.in. gry i blog koła), rozwijamy się w obszarach takich jak programowanie, grafika czy systemy przemysłowe oraz promujemy nasz kierunek podczas wydarzeń uczelnianych.</p>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {importantMembers.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-center italic flex items-center justify-center gap-3"><Star className="text-yellow-400" /> Zarząd i Koordynatorzy</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
              {importantMembers.map(m => {
                const isMktg = m.is_marketing == 1;
                return <MemberCard key={m.id} m={m} highlightColor={isMktg ? "bg-pink-500" : "bg-yellow-500"} labelColor={isMktg ? "text-pink-400" : "text-yellow-400"} />;
              })}
            </div>
          </div>
        )}
        {regularMembers.length > 0 && (
          <div className="space-y-8 pt-6">
            <h3 className="text-3xl font-bold text-center italic mt-12">Nasi Członkowie</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {regularMembers.map(m => <MemberCard key={m.id} m={m} highlightColor="bg-cyan-500" labelColor="text-cyan-400" />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectsView({ setView, setActiveProjectId }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/get_projects.php`).then(res => setProjects(res.data));
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="text-center space-y-4 py-10">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic">NASZE <span className="text-cyan-400">PROJEKTY</span></h2>
        <p className="text-gray-400 text-lg">Zobacz, co kodujemy po godzinach.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map(p => (
          <div key={p.id} onClick={() => { setActiveProjectId(p.id); setView('single_project'); }} className={`${glassStyle} overflow-hidden group hover:border-cyan-500/50 transition-all flex flex-col cursor-pointer hover:-translate-y-2`}>
            {p.image_url && (
              <div className="h-48 overflow-hidden relative shrink-0">
                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">{p.description}</p>
              {p.technologies && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.technologies.split(',').map((tech, i) => <span key={i} className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">{tech.trim()}</span>)}
                </div>
              )}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors"><Github size={16} /> GitHub</a>}
                {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-4 py-2 rounded-xl transition-colors"><ExternalLink size={16} /> Zobacz Live</a>}
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div className="col-span-full text-center text-gray-500 py-10">Jeszcze brak projektów. Dodaj je w panelu redaktora!</div>}
      </div>
    </div>
  );
}

function SingleProjectView({ id, setView }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(!id) return;
    axios.get(`${API_URL}/get_single_project.php?id=${id}`).then(res => { setProject(res.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20 flex justify-center"><div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div></div>;
  if (!project || project.error) return <div className="p-10 text-center text-red-400">Nie znaleziono projektu.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto space-y-8">
      <button onClick={() => setView('projects')} className="mb-2 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-bold"><ChevronLeft size={20} /> Wróć do portfolio</button>

      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
        {project.image_url ? <img src={project.image_url} alt={project.title} className="w-full h-[300px] md:h-[450px] object-cover opacity-60" /> : <div className="w-full h-[300px] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"><Code size={64} className="text-slate-700" /></div>}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8 pt-24">
          <h1 className="text-4xl md:text-5xl font-black mb-4">{project.title}</h1>
          {project.technologies && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.split(',').map((tech, i) => <span key={i} className="text-sm font-bold text-cyan-200 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">{tech.trim()}</span>)}
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2"><FileText size={20}/> O projekcie</h3>
              <div className="text-lg leading-relaxed text-gray-300 whitespace-pre-wrap">{project.description}</div>
          </div>
          <div className="space-y-4">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="text-lg font-bold mb-4 text-white">Odnośniki</h3>
                  {project.live_url ? <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-colors"><ExternalLink size={20}/> Uruchom Live</a> : <div className="text-gray-500 text-sm text-center bg-black/20 py-3 rounded-xl">Brak wersji Live</div>}
                  {project.github_url ? <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors border border-white/10"><Github size={20}/> Kod na GitHub</a> : <div className="text-gray-500 text-sm text-center bg-black/20 py-3 rounded-xl">Repozytorium prywatne</div>}
              </div>
          </div>
      </div>
    </div>
  );
}

function EventsView() {
  const [events, setEvents] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/get_events.php`)
      .then(res => { if (Array.isArray(res.data)) { setEvents(res.data); } else { setApiError(true); }})
      .catch(() => setApiError(true));
  }, []);

  if (apiError) return <div className="pt-32 text-center text-red-400 max-w-2xl mx-auto space-y-4"><h2 className="text-3xl font-bold">Błąd połączenia z bazą!</h2><p>Sprawdź konfigurację bazy danych.</p></div>;

  const now = new Date();
  const safeEvents = Array.isArray(events) ? events : [];
  const upcoming = safeEvents.filter(e => new Date(e.event_date) >= now);
  const past = safeEvents.filter(e => new Date(e.event_date) < now).reverse();

  const EventCard = ({ e, isPast }) => {
    const d = new Date(e.event_date);
    return (
      <div className={`${glassStyle} p-6 flex flex-col md:flex-row gap-6 ${isPast ? 'opacity-70 grayscale' : 'hover:-translate-y-2'} transition-all group`}>
        {e.image_url ? <img src={e.image_url} alt="" className="w-full md:w-48 h-48 object-cover rounded-2xl shrink-0" /> : <div className="w-full md:w-48 h-48 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"><CalendarDays size={48} className="text-gray-500" /></div>}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-cyan-400">
            <span className="flex items-center gap-1 bg-cyan-500/10 px-3 py-1 rounded-lg"><CalendarDays size={16}/> {d.toLocaleDateString()}</span>
            <span className="flex items-center gap-1 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-lg"><Clock size={16}/> {d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            {e.location && <span className="flex items-center gap-1 bg-pink-500/10 text-pink-400 px-3 py-1 rounded-lg"><MapPin size={16}/> {e.location}</span>}
          </div>
          <h3 className="text-2xl font-bold">{e.title}</h3>
          <p className="text-gray-400 leading-relaxed">{e.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="text-center space-y-4 py-10">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic">KALENDARZ <span className="text-cyan-400">SPOTKAŃ</span></h2>
        <p className="text-gray-400 text-lg">Warsztaty, prelekcje i integracje SKNI.</p>
      </div>
      {upcoming.length > 0 ? <div className="space-y-6"><h3 className="text-2xl font-bold italic text-cyan-400">Nadchodzące wydarzenia</h3><div className="space-y-6">{upcoming.map(e => <EventCard key={e.id} e={e} />)}</div></div> : <div className={`${glassStyle} p-10 text-center text-gray-400`}>Brak nadchodzących wydarzeń. Śledź naszego Instagrama!</div>}
      {past.length > 0 && <div className="space-y-6 pt-10 border-t border-white/10 mt-10"><h3 className="text-2xl font-bold italic text-gray-500">Archiwum</h3><div className="space-y-6">{past.map(e => <EventCard key={e.id} e={e} isPast />)}</div></div>}
    </div>
  );
}

function ContentEditor({ user, settings, setSettings }) {
  const [activeTab, setActiveTab] = useState('list');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Ogólne');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryFile, setGalleryFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [aboutFile, setAboutFile] = useState(null);

  const [members, setMembers] = useState([]);
  const [mEditingId, setMEditingId] = useState(null);
  const [mName, setMName] = useState('');
  const [mRole, setMRole] = useState('');
  const [mDesc, setMDesc] = useState('');
  const [mIsBoard, setMIsBoard] = useState(false);
  const [mIsMarketing, setMIsMarketing] = useState(false);
  const [mFile, setMFile] = useState(null);

  const [proj, setProj] = useState([]);
  const [prEditingId, setPrEditingId] = useState(null);
  const [prTitle, setPrTitle] = useState('');
  const [prDesc, setPrDesc] = useState('');
  const [prTech, setPrTech] = useState('');
  const [prGit, setPrGit] = useState('');
  const [prLive, setPrLive] = useState('');
  const [prFile, setPrFile] = useState(null);

  const [events, setEvents] = useState([]);
  const [evEditingId, setEvEditingId] = useState(null);
  const [evTitle, setEvTitle] = useState('');
  const [evDesc, setEvDesc] = useState('');
  const [evDate, setEvDate] = useState('');
  const [evLoc, setEvLoc] = useState('');
  const [evFile, setEvFile] = useState(null);

  const fetchPosts = () => axios.get(`${API_URL}/get_posts.php`).then(res => setPosts(res.data)).catch(err => console.error(err));
  const fetchGallery = () => axios.get(`${API_URL}/get_gallery.php`).then(res => setGalleryItems(res.data)).catch(err => console.error(err));
  const fetchMembers = () => axios.get(`${API_URL}/get_members.php`).then(res => setMembers(res.data)).catch(err => console.error(err));
  const fetchProj = () => axios.get(`${API_URL}/get_projects.php`).then(res => setProj(res.data)).catch(err => console.error(err));
  const fetchEvents = () => axios.get(`${API_URL}/get_events.php`).then(res => setEvents(Array.isArray(res.data) ? res.data : [])).catch(err => console.error(err));

  useEffect(() => {
    if(activeTab === 'list' || activeTab === 'form') fetchPosts();
    if(activeTab === 'gallery') fetchGallery();
    if(activeTab === 'members' || activeTab === 'members_form') fetchMembers();
    if(activeTab === 'projects' || activeTab === 'projects_form') fetchProj();
    if(activeTab === 'events' || activeTab === 'events_form') fetchEvents();
  }, [activeTab]);

  const resetForm = () => { setEditingId(null); setTitle(''); setContent(''); setFile(null); setCurrentImageUrl(''); setIsFeatured(false); setCategory('Ogólne'); if(document.getElementById('fileInput')) document.getElementById('fileInput').value = ""; };
  const handleEditClick = (p) => { setEditingId(p.id); setTitle(p.title); setContent(p.content); setCurrentImageUrl(p.image_url); setIsFeatured(p.is_featured == 1); setActiveTab('form'); setCategory(p.category || 'Ogólne');};
  const handleDeleteClick = async (id) => { if(window.confirm("Usunąć wpis?")) { await axios.post(`${API_URL}/delete_post.php`, {id}); fetchPosts(); }};
  const handleSubmit = async (e) => { e.preventDefault(); setLoading(true); const fd = new FormData(); fd.append('title', title); fd.append('content', content); fd.append('is_featured', isFeatured); fd.append('category', category); if(file) fd.append('image', file); let url = editingId ? `${API_URL}/update_post.php` : `${API_URL}/add_post.php`; if(editingId) fd.append('id', editingId); else fd.append('author_id', user.id); try { const res = await axios.post(url, fd); if(res.data.success) { alert("Zapisano!"); resetForm(); setActiveTab('list'); } else alert("Błąd: " + res.data.message); } catch (err) { alert("Błąd serwera"); } setLoading(false); };

  const handleGalleryUpload = async (e) => { e.preventDefault(); if(!galleryFile) return alert("Wybierz plik!"); const fd = new FormData(); fd.append('image', galleryFile); fd.append('caption', caption); try { await axios.post(`${API_URL}/add_gallery_item.php`, fd); setCaption(''); setGalleryFile(null); fetchGallery(); alert("Dodano!"); } catch (err) { alert("Błąd"); } };

  const resetMemberForm = () => { setMEditingId(null); setMName(''); setMRole(''); setMDesc(''); setMIsBoard(false); setMIsMarketing(false); setMFile(null); };
  const handleEditMember = (m) => { setMEditingId(m.id); setMName(m.name); setMRole(m.role); setMDesc(m.description); setMIsBoard(m.is_board == 1); setMIsMarketing(m.is_marketing == 1); setActiveTab('members_form'); };
  const handleDeleteMember = async (id) => { if(window.confirm("Usunąć członka?")) { await axios.post(`${API_URL}/delete_member.php`, {id}); fetchMembers(); }};
  const handleMemberSubmit = async (e) => { e.preventDefault(); setLoading(true); const fd = new FormData(); fd.append('name', mName); fd.append('role', mRole); fd.append('description', mDesc); fd.append('is_board', mIsBoard); fd.append('is_marketing', mIsMarketing); if(mFile) fd.append('image', mFile); let url = mEditingId ? `${API_URL}/update_member.php` : `${API_URL}/add_member.php`; if(mEditingId) fd.append('id', mEditingId); try { const res = await axios.post(url, fd); if(res.data.success) { alert("Zapisano!"); resetMemberForm(); setActiveTab('members'); } else alert(res.data.message); } catch (err) { alert("Błąd"); } setLoading(false); };

  const resetProjForm = () => { setPrEditingId(null); setPrTitle(''); setPrDesc(''); setPrTech(''); setPrGit(''); setPrLive(''); setPrFile(null); };
  const handleEditProj = (p) => { setPrEditingId(p.id); setPrTitle(p.title); setPrDesc(p.description); setPrTech(p.technologies); setPrGit(p.github_url); setPrLive(p.live_url); setActiveTab('projects_form'); };
  const handleDeleteProj = async (id) => { if(window.confirm("Usunąć projekt?")) { await axios.post(`${API_URL}/delete_project.php`, {id}); fetchProj(); }};
  const handleProjSubmit = async (e) => { e.preventDefault(); setLoading(true); const fd = new FormData(); fd.append('title', prTitle); fd.append('description', prDesc); fd.append('technologies', prTech); fd.append('github_url', prGit); fd.append('live_url', prLive); if(prFile) fd.append('image', prFile); let url = prEditingId ? `${API_URL}/update_project.php` : `${API_URL}/add_project.php`; if(prEditingId) fd.append('id', prEditingId); try { const res = await axios.post(url, fd); if(res.data.success) { alert("Zapisano!"); resetProjForm(); setActiveTab('projects'); } else alert(res.data.message); } catch (err) { alert("Błąd"); } setLoading(false); };

  const resetEventForm = () => { setEvEditingId(null); setEvTitle(''); setEvDesc(''); setEvDate(''); setEvLoc(''); setEvFile(null); };
  const handleEditEvent = (e) => { setEvEditingId(e.id); setEvTitle(e.title); setEvDesc(e.description); setEvDate(e.event_date.replace(' ', 'T').substring(0, 16)); setEvLoc(e.location); setActiveTab('events_form'); };
  const handleDeleteEvent = async (id) => { if(window.confirm("Odwołać/Usunąć wydarzenie?")) { await axios.post(`${API_URL}/delete_event.php`, {id}); fetchEvents(); }};
  const handleEventSubmit = async (e) => { e.preventDefault(); setLoading(true); const fd = new FormData(); fd.append('title', evTitle); fd.append('description', evDesc); fd.append('event_date', evDate.replace('T', ' ') + ':00'); fd.append('location', evLoc); if(evFile) fd.append('image', evFile); let url = evEditingId ? `${API_URL}/update_event.php` : `${API_URL}/add_event.php`; if(evEditingId) fd.append('id', evEditingId); try { const res = await axios.post(url, fd); if(res.data.success) { alert("Zapisano!"); resetEventForm(); setActiveTab('events'); } else alert(res.data.message); } catch (err) { alert("Błąd"); } setLoading(false); };
  
  if (!user || (user.role !== 'admin' && user.role !== 'editor')) return <div className="p-10 text-center">Brak uprawnień.</div>;

  const SidebarBtn = ({ tab, name, icon }) => (
      <button onClick={() => { if(tab === 'form') resetForm(); if(tab === 'members_form') resetMemberForm(); setActiveTab(tab); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
          {icon} {name}
      </button>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-500 max-w-7xl mx-auto w-full">
      <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className={`${glassStyle} p-4 space-y-2 sticky top-36`}>
              <div className="px-4 py-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">Blog</div>
              <SidebarBtn tab="list" name="Lista wpisów" icon={<FileText size={18} />} />
              <SidebarBtn tab="form" name={editingId ? "Edytujesz wpis" : "Utwórz wpis"} icon={<Plus size={18} />} />
              
              <div className="px-4 py-2 mt-4 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">Zasoby</div>
              <SidebarBtn tab="gallery" name="Galeria zdjęć" icon={<ImageIcon size={18} />} />
              <SidebarBtn tab="about" name="Zdjęcie grupowe" icon={<MonitorPlay size={18} />} />
              
              <div className="px-4 py-2 mt-4 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">Skład Koła</div>
              <SidebarBtn tab="members" name="Lista członków" icon={<Users size={18} />} />
              <SidebarBtn tab="members_form" name={mEditingId ? "Edytujesz osobę" : "Dodaj osobę"} icon={<User size={18} />} />

              <div className="px-4 py-2 mt-4 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">Portfolio</div>
              <SidebarBtn tab="projects" name="Lista Projektów" icon={<Code size={18} />} />
              <SidebarBtn tab="projects_form" name={prEditingId ? "Edytuj Projekt" : "+ Nowy Projekt"} icon={<Plus size={18} />} />

              <div className="px-4 py-2 mt-4 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">Kalendarz</div>
              <SidebarBtn tab="events" name="Wydarzenia" icon={<CalendarDays size={18} />} />
              <SidebarBtn tab="events_form" name={evEditingId ? "Edytuj Wydarzenie" : "+ Nowe Wydarzenie"} icon={<Plus size={18} />} />

              <div className="px-4 py-2 mt-4 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">Konfiguracja</div>
              <SidebarBtn tab="home_settings" name="Wygląd strony" icon={<Settings size={18} />} />
          </div>
      </div>

      <div className="flex-1 w-full min-w-0">
          <div className="mb-6 flex items-center gap-3">
              <LayoutDashboard className="text-cyan-400" size={28}/>
              <h2 className="text-3xl font-bold">Obszar Roboczy</h2>
          </div>

          {activeTab === 'list' && (
              <div className={`${glassStyle} overflow-hidden`}><table className="w-full text-left border-collapse"><thead><tr className="border-b border-white/10 text-gray-400 text-sm"><th className="p-4">Tytuł</th><th className="p-4 text-center hidden md:table-cell">Główna?</th><th className="p-4 text-right">Akcje</th></tr></thead><tbody className="divide-y divide-white/5">{posts.map(p => (<tr key={p.id} className="hover:bg-white/5"><td className="p-4 font-bold truncate max-w-[150px] md:max-w-xs">{p.title}</td><td className="p-4 text-center hidden md:table-cell">{p.is_featured == 1 ? <span className="text-green-400">Tak</span> : '-'}</td><td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditClick(p)} className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg"><Edit3 size={18}/></button><button onClick={() => handleDeleteClick(p.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={18}/></button></div></td></tr>))}</tbody></table></div>
          )}

          {activeTab === 'form' && (
            <form onSubmit={handleSubmit} className={`${glassStyle} p-6 lg:p-8 space-y-6`}>
                <h3 className="font-bold text-2xl mb-6">{editingId ? 'Edycja wpisu na bloga' : 'Nowy wpis na bloga'}</h3>
                <div><label className="text-xs text-gray-400 ml-1 mb-1 block uppercase">Tytuł Wpisu</label><input className={inputStyle} value={title} onChange={e=>setTitle(e.target.value)} required /></div>
                <div><label className="text-xs text-gray-400 ml-1 mb-1 block uppercase">Zdjęcie Okładkowe</label><input id="fileInput" type="file" accept="image/*" className={inputStyle} onChange={e=>setFile(e.target.files[0])} />{currentImageUrl && !file && <p className="text-xs text-green-400 mt-2">Masz już wgrane zdjęcie. Wybierz nowe, by nadpisać.</p>}</div>
                <div><label className="text-xs text-gray-400 ml-1 mb-1 block uppercase">Kategoria Wpisu</label><select className={inputStyle} value={category} onChange={e => setCategory(e.target.value)}><option value="Ogólne">Ogólne</option><option value="Projekty">Projekty i Aplikacje</option><option value="Wydarzenia">Wydarzenia / Warsztaty</option><option value="WebDev">Tworzenie Stron (WebDev)</option><option value="CyberSec">Cyberbezpieczeństwo</option><option value="Grafika 3D">Grafika 3D</option><option value="Inne">Inne</option></select></div>
                <div><label className="text-xs text-gray-400 ml-1 mb-1 block uppercase">Treść HTML</label><textarea rows={10} className={inputStyle} value={content} onChange={e=>setContent(e.target.value)} required /></div>
                <div className="flex items-center gap-2 bg-white/5 p-4 rounded-xl border border-white/10"><input type="checkbox" checked={isFeatured} onChange={e=>setIsFeatured(e.target.checked)} className="w-4 h-4"/><label className="font-bold text-white">Wyróżnij ten post na stronie głównej</label></div>
                <button type="submit" disabled={loading} className={`${buttonStyle} bg-cyan-500 text-black w-full justify-center py-4 text-lg mt-6`}>{loading ? 'Zapisywanie...' : 'Zapisz Wpis'}</button>
            </form>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
                <form onSubmit={handleGalleryUpload} className={`${glassStyle} p-6 flex flex-col md:flex-row gap-4 items-end`}>
                    <div className="flex-1 space-y-2"><label className="text-xs text-gray-400 uppercase">Nowe zdjęcie</label><input type="file" onChange={e => setGalleryFile(e.target.files[0])} className={inputStyle} required /></div>
                    <div className="flex-1 space-y-2"><label className="text-xs text-gray-400 uppercase">Podpis</label><input placeholder="Opcjonalny..." value={caption} onChange={e => setCaption(e.target.value)} className={inputStyle} /></div>
                    <button type="submit" className={`${buttonStyle} bg-cyan-500 text-black h-[42px] px-8 justify-center`}>Wgraj</button>
                </form>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {galleryItems.map(item => (
                        <div key={item.id} className="relative group rounded-xl overflow-hidden border border-white/10 shadow-lg">
                            <img src={item.image_url} alt="" className="w-full h-40 object-cover" />
                            <button onClick={async () => { if(window.confirm("Usunąć?")) { await axios.post(`${API_URL}/delete_gallery_item.php`, {id: item.id}); fetchGallery(); }}} className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className={`${glassStyle} p-8 space-y-6 max-w-xl`}>
                <h3 className="font-bold text-2xl">Główne zdjęcie grupowe</h3>
                <p className="text-gray-400">Nadpisz wielkie zdjęcie wyświetlane nad sekcją tekstową w zakładce "O nas".</p>
                <form onSubmit={async (e) => { e.preventDefault(); if(!aboutFile) return; const fd = new FormData(); fd.append('image', aboutFile); try { await axios.post(`${API_URL}/upload_about_image.php`, fd); alert("Zaktualizowano!"); setAboutFile(null); } catch(err) { alert("Błąd"); } }} className="space-y-4">
                    <input type="file" accept="image/*" onChange={e => setAboutFile(e.target.files[0])} className={inputStyle} required />
                    <button type="submit" className={`${buttonStyle} bg-cyan-500 text-black w-full justify-center`}>Zastąp stare zdjęcie</button>
                </form>
            </div>
          )}

          {activeTab === 'members' && (
              <div className={`${glassStyle} overflow-hidden`}><table className="w-full text-left border-collapse"><thead><tr className="border-b border-white/10 text-gray-400 text-sm"><th className="p-4">Osoba</th><th className="p-4 hidden md:table-cell">Rola</th><th className="p-4 text-center">Zarząd / Mktg</th><th className="p-4 text-right">Akcje</th></tr></thead><tbody className="divide-y divide-white/5">{members.map(m => (<tr key={m.id} className="hover:bg-white/5"><td className="p-4 font-bold flex items-center gap-3"><div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 flex items-center justify-center shrink-0 border border-white/10">{m.image_url ? <img src={m.image_url} alt="" className="w-full h-full object-cover"/> : <User size={18} className="text-gray-400"/>}</div><div>{m.name}<div className="md:hidden text-xs text-cyan-400 font-normal">{m.role}</div></div></td><td className="p-4 text-cyan-400 text-sm font-bold uppercase tracking-widest hidden md:table-cell">{m.role}</td><td className="p-4 text-center text-sm">{m.is_board == 1 ? <span className="text-yellow-400 font-bold bg-yellow-400/10 px-2 py-1 rounded">Zarząd</span> : m.is_marketing == 1 ? <span className="text-pink-400 font-bold bg-pink-400/10 px-2 py-1 rounded">Mktg</span> : '-'}</td><td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditMember(m)} className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg"><Edit3 size={18} /></button><button onClick={() => handleDeleteMember(m.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={18} /></button></div></td></tr>))}</tbody></table></div>
          )}

          {activeTab === 'members_form' && (
            <form onSubmit={handleMemberSubmit} className={`${glassStyle} p-6 lg:p-8 space-y-6 max-w-2xl`}>
                <h3 className="font-bold text-2xl">{mEditingId ? 'Edycja osoby' : 'Dodaj osobę do zespołu'}</h3>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Imię i nazwisko</label><input className={inputStyle} value={mName} onChange={e=>setMName(e.target.value)} required /></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Rola</label><input className={inputStyle} value={mRole} onChange={e=>setMRole(e.target.value)} required /></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Zdjęcie Profilowe</label><input type="file" className={inputStyle} onChange={e=>setMFile(e.target.files[0])} /></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Opis (Zainteresowania itp.)</label><textarea rows={3} className={inputStyle} value={mDesc} onChange={e=>setMDesc(e.target.value)} required /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 cursor-pointer" onClick={() => { setMIsBoard(!mIsBoard); setMIsMarketing(false); }}>
                        <input type="checkbox" checked={mIsBoard} readOnly className="w-5 h-5" />
                        <label className="font-bold text-yellow-300 pointer-events-none">Zarząd</label>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-pink-500/10 rounded-xl border border-pink-500/20 cursor-pointer" onClick={() => { setMIsMarketing(!mIsMarketing); setMIsBoard(false); }}>
                        <input type="checkbox" checked={mIsMarketing} readOnly className="w-5 h-5" />
                        <label className="font-bold text-pink-300 pointer-events-none">Marketing</label>
                    </div>
                </div>
                <div className="flex gap-4 mt-8">
                   {mEditingId && <button type="button" onClick={resetMemberForm} className={`${buttonStyle} justify-center bg-gray-600 text-white w-1/3`}>Anuluj</button>}
                   <button type="submit" disabled={loading} className={`${buttonStyle} justify-center bg-cyan-500 flex-1 text-black font-bold py-4 text-lg`}>
                       {loading ? 'Zapisywanie...' : 'Zapisz osobę'}
                   </button>
                </div>
            </form>
          )}

          {activeTab === 'projects' && (
            <div className={`${glassStyle} overflow-hidden`}><table className="w-full text-left border-collapse"><thead><tr className="border-b border-white/10 text-gray-400 text-sm"><th className="p-4">Projekt</th><th className="p-4 text-right">Akcje</th></tr></thead><tbody className="divide-y divide-white/5">{proj.map(p => (<tr key={p.id} className="hover:bg-white/5"><td className="p-4 font-bold">{p.title}</td><td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditProj(p)} className="p-2 text-cyan-400"><Edit3 size={18} /></button><button onClick={() => handleDeleteProj(p.id)} className="p-2 text-red-400"><Trash2 size={18} /></button></div></td></tr>))}</tbody></table></div>
          )}

          {activeTab === 'projects_form' && (
            <form onSubmit={handleProjSubmit} className={`${glassStyle} p-6 lg:p-8 space-y-6 max-w-2xl`}>
                <h3 className="font-bold text-2xl">{prEditingId ? 'Edycja Projektu' : 'Dodaj Projekt do Portfolio'}</h3>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Nazwa Projektu</label><input className={inputStyle} value={prTitle} onChange={e=>setPrTitle(e.target.value)} required /></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Technologie (po przecinku, np. React, PHP, Tailwind)</label><input className={inputStyle} value={prTech} onChange={e=>setPrTech(e.target.value)} /></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Opis projektu</label><textarea rows={4} className={inputStyle} value={prDesc} onChange={e=>setPrDesc(e.target.value)} required /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Link GitHub</label><input className={inputStyle} value={prGit} onChange={e=>setPrGit(e.target.value)} placeholder="https://..." /></div>
                    <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Link Wersji Live</label><input className={inputStyle} value={prLive} onChange={e=>setPrLive(e.target.value)} placeholder="https://..." /></div>
                </div>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Zdjęcie (Miniaturka)</label><input type="file" className={inputStyle} onChange={e=>setPrFile(e.target.files[0])} /></div>
                <div className="flex gap-4 mt-8">
                   {prEditingId && <button type="button" onClick={resetProjForm} className={`${buttonStyle} justify-center bg-gray-600 text-white w-1/3`}>Anuluj</button>}
                   <button type="submit" disabled={loading} className={`${buttonStyle} justify-center bg-cyan-500 flex-1 text-black font-bold py-4 text-lg`}>
                       {loading ? 'Zapisywanie...' : 'Zapisz projekt'}
                   </button>
                </div>
            </form>
          )}

          {activeTab === 'events' && (
              <div className={`${glassStyle} overflow-hidden`}><table className="w-full text-left border-collapse"><thead><tr className="border-b border-white/10 text-gray-400 text-sm"><th className="p-4">Wydarzenie</th><th className="p-4 hidden md:table-cell">Data</th><th className="p-4 text-right">Akcje</th></tr></thead><tbody className="divide-y divide-white/5">{events.map(e => (<tr key={e.id} className="hover:bg-white/5"><td className="p-4 font-bold">{e.title}</td><td className="p-4 text-gray-400 hidden md:table-cell">{e.event_date}</td><td className="p-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => handleEditEvent(e)} className="p-2 text-cyan-400"><Edit3 size={18} /></button><button onClick={() => handleDeleteEvent(e.id)} className="p-2 text-red-400"><Trash2 size={18} /></button></div></td></tr>))}</tbody></table></div>
          )}

          {activeTab === 'events_form' && (
            <form onSubmit={handleEventSubmit} className={`${glassStyle} p-6 lg:p-8 space-y-6 max-w-2xl`}>
                <h3 className="font-bold text-2xl">{evEditingId ? 'Edycja Wydarzenia' : 'Zaplanuj Wydarzenie'}</h3>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Nazwa (np. Warsztaty z Reacta)</label><input className={inputStyle} value={evTitle} onChange={e=>setEvTitle(e.target.value)} required /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Data i godzina</label><input type="datetime-local" className={inputStyle} value={evDate} onChange={e=>setEvDate(e.target.value)} required /></div>
                    <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Miejsce (np. Sala 204)</label><input className={inputStyle} value={evLoc} onChange={e=>setEvLoc(e.target.value)} placeholder="Opcjonalnie..." /></div>
                </div>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Opis spotkania</label><textarea rows={4} className={inputStyle} value={evDesc} onChange={e=>setEvDesc(e.target.value)} required /></div>
                <div><label className="text-xs font-bold text-gray-400 uppercase ml-1 block mb-1">Grafika promocyjna</label><input type="file" className={inputStyle} onChange={e=>setEvFile(e.target.files[0])} /></div>
                <div className="flex gap-4 mt-8">
                   {evEditingId && <button type="button" onClick={resetEventForm} className={`${buttonStyle} justify-center bg-gray-600 text-white w-1/3`}>Anuluj</button>}
                   <button type="submit" disabled={loading} className={`${buttonStyle} justify-center bg-cyan-500 flex-1 text-black font-bold py-4 text-lg`}>
                       {loading ? 'Zapisywanie...' : 'Zapisz do kalendarza'}
                   </button>
                </div>
            </form>
          )}

          {activeTab === 'home_settings' && (
            <div className={`${glassStyle} p-6 lg:p-8 space-y-6 max-w-2xl`}>
                <h3 className="font-bold text-2xl flex items-center gap-2 mb-8">
                    <Settings className="text-cyan-400" /> Wygląd Strony Głównej
                </h3>
                <div className="flex items-center gap-4 p-5 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 cursor-pointer hover:bg-cyan-500/20 transition-colors" onClick={() => { const newVal = settings?.show_game_promo === 'true' ? 'false' : 'true'; setSettings({...settings, show_game_promo: newVal}); }}>
                    <input type="checkbox" checked={settings?.show_game_promo === 'true'} readOnly className="w-6 h-6 accent-cyan-500 pointer-events-none" />
                    <label className="font-bold text-lg text-cyan-100 pointer-events-none">Pokazuj wyróżniony kafelek z autorską grą (Godot)</label>
                </div>
                <p className="text-sm text-gray-400 pl-2">Odznacz tę opcję, jeśli gra nie jest jeszcze gotowa. Sekcja zniknie ze strony głównej dla zwykłych użytkowników.</p>
                <button onClick={async () => { setLoading(true); try { const res = await axios.post(`${API_URL}/update_settings.php`, settings); if(res.data.success) alert("Zapisano widoczność kafelka!"); } catch(e) { alert("Błąd połączenia z serwerem."); } setLoading(false); }} disabled={loading} className={`${buttonStyle} justify-center bg-cyan-500 text-black font-black text-lg py-4 mt-8 w-full`}>
                    {loading ? 'Zapisywanie...' : 'Zapisz widoczność'}
                </button>
            </div>
          )}
      </div>
    </div>
  );
}

function AdminPanel({ settings, setSettings }) {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [hubLinks, setHubLinks] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '', role: 'editor' });
  const [hubData, setHubData] = useState({ title: '', description: '', url: '', icon_name: 'ExternalLink' });

  const fetchHubLinks = () => axios.get(`${API_URL}/get_hub_links.php`).then(res => setHubLinks(res.data));
  const fetchStats = () => axios.get(`${API_URL}/server_status.php`).then(res => setStats(res.data)).catch(err => console.error(err));
  const fetchUsers = () => axios.get(`${API_URL}/get_users.php`).then(res => setUsers(res.data)).catch(err => console.error(err));

  useEffect(() => {
      fetchStats();
      fetchUsers();
      fetchHubLinks();
  }, []);

  const handleDeleteHubLink = async (id) => {
      if(!window.confirm("Usunąć ten guzik?")) return;
      await axios.post(`${API_URL}/delete_hub_link.php`, { id });
      fetchHubLinks();
  };

  const handleHubSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(`${API_URL}/add_hub_link.php`, hubData);
          if(res.data.success) {
              alert("Dodano link do huba!");
              setHubData({ title: '', description: '', url: '', icon_name: 'ExternalLink' });
              fetchHubLinks();
          }
      } catch(err) { alert("Błąd połączenia"); }
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setFormData({ username: user.username, password: '', role: user.role });
  };

  const resetForm = () => {
      setEditingId(null);
      setFormData({ username: '', password: '', role: 'editor' });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(!editingId && !formData.password) return alert("Podaj hasło dla nowego użytkownika!");
      if(!formData.username) return alert("Podaj nazwę użytkownika!");
      try {
          let url = editingId ? `${API_URL}/update_user.php` : `${API_URL}/add_user.php`;
          let dataToSend = editingId ? { ...formData, id: editingId } : formData;
          const res = await axios.post(url, dataToSend);
          if(res.data.success) {
              alert(editingId ? "Zaktualizowano dane!" : "Dodano użytkownika!");
              resetForm();
              fetchUsers();
          } else alert(res.data.message);
      } catch(err) { alert("Błąd połączenia."); }
  };

  const handleDeleteUser = async (id, username) => {
      if(!window.confirm(`Czy na pewno usunąć użytkownika ${username}?`)) return;
      try {
          await axios.post(`${API_URL}/delete_user.php`, { id });
          fetchUsers();
          if (editingId === id) resetForm();
      } catch(err) { alert("Nie udało się usunąć."); }
  };

  const handleSettingsSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(`${API_URL}/update_settings.php`, settings);
          if(res.data.success) alert("Zapisano linki do Social Media!");
      } catch(err) { alert("Błąd zapisu ustawień."); }
  };

  if(!stats) return <div className="p-10 text-center animate-pulse text-cyan-400">Ładowanie panelu administratora...</div>;

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center gap-3">
        <Activity className="text-cyan-400" size={32} />
        <h2 className="text-4xl font-bold italic">Centrum Dowodzenia</h2>
      </div>

      <div className={`${glassStyle} p-6 mt-8 border border-pink-500/20 shadow-pink-500/5`}>
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <LinkIcon className="text-pink-400" /> Ustawienia Social Media (Ikonki w stopce)
        </h3>
        <form onSubmit={handleSettingsSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><label className="text-xs text-gray-400 ml-1 font-bold">Instagram URL</label><input className={inputStyle} value={settings?.instagram || ''} onChange={e => setSettings({...settings, instagram: e.target.value})} placeholder="https://instagram.com/..." /></div>
            <div><label className="text-xs text-gray-400 ml-1 font-bold">GitHub URL</label><input className={inputStyle} value={settings?.github || ''} onChange={e => setSettings({...settings, github: e.target.value})} placeholder="https://github.com/..." /></div>
            <div><label className="text-xs text-gray-400 ml-1 font-bold">Discord URL (Zaproś)</label><input className={inputStyle} value={settings?.discord || ''} onChange={e => setSettings({...settings, discord: e.target.value})} placeholder="https://discord.gg/..." /></div>
            <div className="md:col-span-3 flex justify-end pt-2">
                <button type="submit" className={`${buttonStyle} justify-center bg-pink-500 text-white font-bold px-8 hover:bg-pink-400`}>Zapisz Linki</button>
            </div>
        </form>
      </div>

      <div className={`${glassStyle} p-6 mt-8`}>
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <Layers className="text-cyan-400" /> Zarządzaj Hubem (Guziki)
        </h3>
        <form onSubmit={handleHubSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className={inputStyle} placeholder="Tytuł strony (np. Kurs HTML)" value={hubData.title} onChange={e => setHubData({...hubData, title: e.target.value})} required />
            <input className={inputStyle} placeholder="Relatywny URL (np. /projects/kurs/)" value={hubData.url} onChange={e => setHubData({...hubData, url: e.target.value})} required />
            <textarea className={`${inputStyle} md:col-span-2`} placeholder="Krótki opis treści..." value={hubData.description} onChange={e => setHubData({...hubData, description: e.target.value})} />
            <button type="submit" className={`${buttonStyle} justify-center bg-cyan-500 text-black md:col-span-2`}>Dodaj guzik do Huba</button>
        </form>
        <div className="mt-6 space-y-2">
            {hubLinks.map(link => (
                <div key={link.id} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                    <div><p className="font-bold text-sm">{link.title}</p><p className="text-xs text-gray-500">{link.url}</p></div>
                    <button onClick={() => handleDeleteHubLink(link.id)} className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg"><Trash2 size={16} /></button>
                </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "System", value: stats.os, icon: <Cpu />, color: "text-blue-400" },
          { label: "PHP Version", value: stats.php_version, icon: <Server />, color: "text-purple-400" },
          { label: "Baza Danych", value: stats.database_connection, icon: <Database />, color: "text-green-400" },
          { label: "Oprogramowanie", value: "Apache 2", icon: <Activity />, color: "text-amber-400" }
        ].map((stat, i) => (
          <div key={i} className={`${glassStyle} p-6 space-y-4`}>
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
            <div><p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p><p className="text-xl font-black mt-1 tracking-tighter truncate">{stat.value}</p></div>
          </div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
          <div className={`${glassStyle} p-6 h-fit`}>
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  {editingId ? <Settings className="text-cyan-400"/> : <Plus className="text-cyan-400" />} 
                  {editingId ? 'Edytuj Użytkownika' : 'Dodaj Użytkownika'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label className="text-xs text-gray-400 ml-1">Nazwa użytkownika</label><input type="text" className={inputStyle} value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="np. kowalski" /></div>
                  <div><label className="text-xs text-gray-400 ml-1">Hasło {editingId && <span className="text-gray-500">(Zostaw puste aby nie zmieniać)</span>}</label><input type="password" className={inputStyle} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={editingId ? "Zostaw puste..." : "••••••"} /></div>
                  <div><label className="text-xs text-gray-400 ml-1">Rola</label><select className={inputStyle} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}><option value="user">Użytkownik</option><option value="editor">Redaktor</option><option value="admin">Administrator</option></select></div>
                  <div className="flex gap-2 mt-4">
                      {editingId && <button type="button" onClick={resetForm} className={`${buttonStyle} justify-center bg-gray-600 text-white`}>Anuluj</button>}
                      <button type="submit" className={`${buttonStyle} justify-center bg-cyan-500 flex-1 hover:bg-cyan-400 text-black`}>{editingId ? 'Zapisz zmiany' : 'Utwórz konto'}</button>
                  </div>
              </form>
          </div>

          <div className={`${glassStyle} p-6 lg:col-span-2`}>
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Shield className="text-cyan-400" /> Lista Personelu</h3>
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                      <thead><tr className="border-b border-white/10 text-gray-400 text-sm"><th className="p-3">Użytkownik</th><th className="p-3">Rola</th><th className="p-3 text-right">Akcja</th></tr></thead>
                      <tbody className="divide-y divide-white/5">
                          {users.map(u => (
                              <tr key={u.id} className={`hover:bg-white/5 transition-colors group ${editingId === u.id ? 'bg-white/5 border-l-2 border-cyan-400' : ''}`}>
                                  <td className="p-3 font-bold flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs">{u.username.substring(0,2).toUpperCase()}</div>{u.username}</td>
                                  <td className="p-3">{u.role === 'admin' ? <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30">Admin</span> : u.role === 'editor' ? <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-lg border border-cyan-500/30">Redaktor</span> : <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-lg border border-green-500/30">Użytkownik</span>}</td>
                                  <td className="p-3 text-right">
                                      <div className="flex justify-end gap-2">
                                          <button onClick={() => handleEditClick(u)} className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-colors"><Edit3 size={16} /></button>
                                          {u.username !== 'admin' && <button onClick={() => handleDeleteUser(u.id, u.username)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 size={16} /></button>}
                                      </div>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>
  );
}

function LoginView({ setUser, setView }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const response = await axios.post(`${API_URL}/login.php`, formData);
        if(response.data.success) {
            const userData = response.data.user;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            setView('editor');
        } else {
            setError(response.data.message);
        }
    } catch (err) {
        setError('Błąd połączenia z serwerem PHP.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 animate-in zoom-in-95 duration-500">
      <div className={`${glassStyle} p-10 space-y-8`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Witaj w SKNI</h2>
          <p className="text-gray-400 text-sm mt-2">Zaloguj się aby kontynuować</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Login</label>
            <input type="text" required className={inputStyle} value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Hasło</label>
            <input type="password" required className={inputStyle} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <button type="submit" className={`${buttonStyle} justify-center bg-cyan-500 w-full py-4 text-white mt-4`}>
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
}