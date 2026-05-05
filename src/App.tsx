import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Download, 
  Upload,
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Languages as LangIcon,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  User,
  Cpu,
  Heart,
  Globe,
  Instagram,
  Twitter,
  Monitor,
  Smartphone,
  Terminal,
  Laptop,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import Markdown from 'react-markdown';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { PortfolioData, Language, Experience, Project, Education, Certificate, Article } from './types';
import { DEFAULT_PORTFOLIO, TRANSLATIONS } from './constants';
import { usePagination } from './hooks/usePagination';
import { generateATSHtml, generateATSMarkdown } from './lib/cvTemplate';

const canUploadPhoto = (import.meta as ImportMeta & { env: { DEV: boolean } }).env.DEV;

// --- Helpers: localization, summarization and language normalization ---
const getLocalizedField = (obj: any, field: string, lang: Language) => {
  const keyLang = `${field}_${lang}`;
  if (obj[keyLang]) return obj[keyLang];
  if (obj.translations && obj.translations[lang] && obj.translations[lang][field]) return obj.translations[lang][field];
  return obj[field];
};

const summarize = (text: string | undefined, max = 200) => {
  if (!text) return '';
  if (text.length <= max) return text;
  const sub = text.slice(0, max);
  const lastDot = sub.lastIndexOf('.');
  if (lastDot > Math.floor(max * 0.5)) return sub.slice(0, lastDot + 1);
  const lastSpace = sub.lastIndexOf(' ');
  return (lastSpace > 0 ? sub.slice(0, lastSpace) : sub) + '…';
};

const normalizeLanguages = (langs: { name: string; level: string }[]) => {
  return langs.map(l => {
    const name = l.name || '';
    const level = (l.level || '').toLowerCase();
    let normalized = l.level;
    if (/portugu[eê]s|portugues/i.test(name)) normalized = 'Native';
    else if (/ingl/i.test(name) || /english/i.test(name)) normalized = 'B2';
    else if (/b2/.test(level)) normalized = 'B2';
    return { ...l, level: normalized };
  });
};

// --- Helper Components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-slate-400 border border-slate-800 ${className}`}>
    {children}
  </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-brand-card/30 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-xl hover:border-slate-700 transition-all ${className}`}
  >
    {children}
  </motion.div>
);

const PaginationUI = ({ 
  current, 
  total, 
  onNext, 
  onPrev,
  labelPage,
  labelOf
}: { 
  current: number, 
  total: number, 
  onNext: () => void, 
  onPrev: () => void,
  labelPage: string,
  labelOf: string
}) => {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase whitespace-nowrap">
      <span>{labelPage} {current} {labelOf} {total}</span>
      <div className="flex gap-1">
        <button 
          onClick={onPrev} 
          disabled={current === 1}
          className="p-1 rounded bg-slate-800 text-slate-500 hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <button 
          onClick={onNext} 
          disabled={current === total}
          className="p-1 rounded bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [portfolio, setPortfolio] = useState<PortfolioData>(DEFAULT_PORTFOLIO);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoVersion, setPhotoVersion] = useState(Date.now());
  const [useFallbackAvatar, setUseFallbackAvatar] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const downloadFile = (content: string, extension: 'html' | 'md', mimeType: string) => {
    const fileBaseName = (portfolio.profile.name || 'CV').trim().replace(/\s+/g, '_');
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${fileBaseName}_${lang}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtml = () => {
    downloadFile(generateATSHtml(portfolio, lang), 'html', 'text/html');
  };

  const handleDownloadMarkdown = () => {
    downloadFile(generateATSMarkdown(portfolio, lang), 'md', 'text/markdown');
  };

  const handleProfilePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canUploadPhoto) {
      event.target.value = '';
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Envie apenas arquivo JPEG ou PNG.');
      event.target.value = '';
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('/api/profile-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar foto de perfil.');
      }

      setUseFallbackAvatar(false);
      setPhotoVersion(Date.now());
      alert('Foto de perfil atualizada com sucesso.');
    } catch (error) {
      console.error(error);
      alert('Nao foi possivel enviar a foto. Verifique se o servidor de upload esta rodando.');
    } finally {
      event.target.value = '';
      setIsUploadingPhoto(false);
    }
  };

  

  // Attempt to load projects/articles manifests from public/ (created by the local assistant)
  useEffect(() => {
    const loadManifests = async () => {
      try {
        const [projIndexRes, artIndexRes] = await Promise.all([
          fetch('/projects/index.json').catch(() => null),
          fetch('/articles/index.json').catch(() => null)
        ]);

        const newPortfolio = { ...portfolio } as any;

        if (projIndexRes && projIndexRes.ok) {
          const projIndex = await projIndexRes.json();
          const projects = await Promise.all(projIndex.map(async (p: any) => {
            const mdRes = await fetch(`/projects/${p.file}`);
            const content = mdRes.ok ? await mdRes.text() : '';
            return { id: p.id || p.file, title: p.title || p.file.replace(/\.md$/, ''), description: p.description || '', tech: p.tech || [], link: p.link, github: p.github, image: p.image, markdown: content };
          }));
          newPortfolio.projects = projects;
        }

        if (artIndexRes && artIndexRes.ok) {
          const artIndex = await artIndexRes.json();
          const articles = await Promise.all(artIndex.map(async (a: any) => {
            if (a.type === 'external') return { ...a };
            const mdRes = await fetch(`/articles/${a.file}`);
            const content = mdRes.ok ? await mdRes.text() : '';
            return { id: a.id || a.file, slug: a.slug || (a.file || '').replace(/\.md$/, ''), title: a.title, description: a.description, date: a.date, type: a.type || 'internal', link: a.url || a.link, content };
          }));
          newPortfolio.articles = articles;
        }

        // update portfolio only if changed
        setPortfolio(newPortfolio);
      } catch (err) {
        // ignore missing manifests
        // console.debug('No manifests found or failed to load markdown assets', err);
      }
    };
    loadManifests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pagination setups
  const expP = usePagination<Experience>(portfolio.experience, 2);
  const projP = usePagination<Project>(portfolio.projects, 3);
  const eduP = usePagination<Education>(portfolio.education, 2);
  const certP = usePagination<Certificate>(portfolio.certificates, 3);
  const artP = usePagination<Article>(portfolio.articles, 3);

  const T = TRANSLATIONS[lang];
  const fallbackAvatarSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${portfolio.profile.name || 'profile'}`;
  const uploadedPhotoSrc = `/cv-imported/profile-photo.jpg?v=${photoVersion}`;
  const avatarSrc = useFallbackAvatar ? fallbackAvatarSrc : uploadedPhotoSrc;

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col md:flex-row text-slate-300">
      {canUploadPhoto && (
        <input
          ref={photoInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleProfilePhotoUpload}
        />
      )}

      {/* Top Header Strip (Design addition) */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-brand-bg/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-bold text-slate-950 text-[10px] italic">A.</div>
          <span className="text-[10px] font-bold tracking-widest text-slate-100 uppercase">Portfolio</span>
        </div>
        <div className="flex gap-2"></div>
      </header>

      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-80 lg:w-96 md:h-screen md:sticky top-0 bg-brand-sidebar border-r border-slate-800 p-8 flex flex-col">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="relative w-32 h-32 mb-8 group">
            <div className="absolute inset-0 bg-emerald-500 rounded-2xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform shadow-emerald-500/10 shadow-lg"></div>
            <div className="absolute inset-0 bg-brand-card/80 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
              <img 
                src={avatarSrc}
                onError={() => setUseFallbackAvatar(true)}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {canUploadPhoto && (
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                disabled={isUploadingPhoto}
                className="absolute -right-2 -bottom-2 h-10 w-10 rounded-full bg-emerald-500 text-slate-950 border-2 border-brand-sidebar flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
                title="Enviar foto (JPEG/PNG)"
              >
                <Upload size={16} />
              </button>
            )}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white mb-1 leading-tight">{getLocalizedField(portfolio.profile, 'name', lang) || portfolio.profile.name}</h1>
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">{getLocalizedField(portfolio.profile, 'title', lang) || portfolio.profile.title}</p>

          <div className="flex flex-col gap-3 w-full mb-10">
            <div className="flex items-center gap-3 text-slate-400 group cursor-pointer hover:text-white transition-colors overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                <Mail size={14} />
              </div>
              <span className="text-xs font-medium break-all truncate">{portfolio.profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                <MapPin size={14} />
              </div>
              <span className="text-xs font-medium">{portfolio.profile.location}</span>
            </div>
          </div>

          {/* About Me */}
          <div className="mb-10 w-full flex flex-col">
            <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-xl relative flex flex-col group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {T.about}
                </h2>
                <span className="text-[9px] font-mono text-slate-600 bg-slate-950 px-1.5 py-0.5 rounded leading-none">
                  { (portfolio.profile.about || '').length }/200
                </span>
              </div>
              <p className="text-[12px] text-slate-300 leading-relaxed italic line-clamp-4">
                "{ summarize(getLocalizedField(portfolio.profile, 'about', lang), 200) }"
              </p>
            </div>
          </div>

          {/* Languages & Hobbies Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mb-10">
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{T.languages}</h3>
              <div className="space-y-3">
                {normalizeLanguages(portfolio.profile.languages).map(l => (
                  <div key={l.name} className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-300 font-medium">{l.name}</span>
                    <span className="text-emerald-500 font-bold">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{T.hobbies}</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.profile.hobbies.map(h => (
                  <span key={h} className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-500 uppercase">{h}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-800 space-y-4">
           {/* Socials */}
           <div className="flex flex-wrap gap-2 text-slate-400 justify-center">
              {portfolio.profile.github && (
                <a href={portfolio.profile.github} target="_blank" className="w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg hover:text-white hover:border-slate-600 transition-all">
                  <Github size={18} />
                </a>
              )}
              {portfolio.profile.linkedin && (
                <a href={portfolio.profile.linkedin} target="_blank" className="w-10 h-10 flex items-center justify-center bg-blue-600/10 border border-blue-600/30 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                  <Linkedin size={18} />
                </a>
              )}
              {portfolio.profile.instagram && (
                <a href={portfolio.profile.instagram} target="_blank" className="w-10 h-10 flex items-center justify-center bg-pink-600/10 border border-pink-600/30 text-pink-400 rounded-lg hover:bg-pink-600 hover:text-white transition-all">
                  <Instagram size={18} />
                </a>
              )}
              {portfolio.profile.twitter && (
                 <a href={portfolio.profile.twitter} target="_blank" className="w-10 h-10 flex items-center justify-center bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-lg hover:bg-sky-500 hover:text-white transition-all">
                   <Twitter size={18} />
                 </a>
              )}
            </div>
          
          <DownloadModalTrigger portfolio={portfolio} lang={lang} setPortfolio={setPortfolio} T={T} />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-6xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home portfolio={portfolio} lang={lang} setLang={setLang} expP={expP} projP={projP} eduP={eduP} certP={certP} artP={artP} T={T} />} />
          <Route path="/articles/:slug" element={<ArticlePage articles={portfolio.articles} T={T} lang={lang} />} />
        </Routes>
      </main>
    </div>
  );
}

function DownloadModalTrigger({ portfolio, lang, T }: any) {
  const [open, setOpen] = useState(false);

  const buildLocalizedPortfolio = (lang: Language) => {
    const p = JSON.parse(JSON.stringify(portfolio));
    p.profile.name = getLocalizedField(p.profile, 'name', lang) || p.profile.name;
    p.profile.title = getLocalizedField(p.profile, 'title', lang) || p.profile.title;
    p.profile.about = getLocalizedField(p.profile, 'about', lang) || p.profile.about;
    p.profile.languages = normalizeLanguages(p.profile.languages || []);
    if (p.projects && Array.isArray(p.projects)) {
      p.projects = p.projects.map((proj: any) => ({
        ...proj,
        title: getLocalizedField(proj, 'title', lang) || proj.title,
        description: getLocalizedField(proj, 'description', lang) || proj.description,
      }));
    }
    if (p.articles && Array.isArray(p.articles)) {
      p.articles = p.articles.map((art: any) => ({
        ...art,
        title: getLocalizedField(art, 'title', lang) || art.title,
        description: getLocalizedField(art, 'description', lang) || art.description,
        content: getLocalizedField(art, 'content', lang) || art.content,
      }));
    }
    return p;
  };

  const download = (type: 'html' | 'md') => {
    const localized = buildLocalizedPortfolio(lang);
    const content = type === 'html' ? generateATSHtml(localized, lang) : generateATSMarkdown(localized, lang);
    const fileBaseName = (localized.profile.name || 'CV').trim().replace(/\s+/g, '_');
    const blob = new Blob([content], { type: type === 'html' ? 'text/html' : 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${fileBaseName}_${lang}.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-950 rounded-xl text-sm font-bold hover:bg-white transition-all shadow-lg"
      >
        <Download size={16} /> {T.downloadCV}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-[320px] bg-slate-900/95 border border-slate-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">{T.downloadCV}</h3>
            <p className="text-sm text-slate-400 mb-4">Escolha o formato para download (o conteúdo refletirá o idioma selecionado).</p>
            <div className="flex gap-3">
              <button onClick={() => download('html')} className="flex-1 px-4 py-2 bg-emerald-500 text-slate-900 font-bold rounded">HTML</button>
              <button onClick={() => download('md')} className="flex-1 px-4 py-2 bg-slate-800 text-white font-bold rounded border border-slate-700">Markdown</button>
            </div>
            <button onClick={() => setOpen(false)} className="mt-4 text-sm text-slate-400">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Page Components ---

function Home({ 
  portfolio, lang, setLang, expP, projP, eduP, certP, artP, T 
}: any) {
  return (
    <>
        {/* Top Controls Overlay-like */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6">
          <div className="flex items-center space-x-6">
            <div className="flex bg-slate-900 rounded-md p-1 border border-slate-800">
              <button 
                onClick={() => { setLang('pt'); expP.setPage(1); projP.setPage(1); eduP.setPage(1); certP.setPage(1); artP.setPage(1); }}
                className={`px-3 py-1 text-[11px] font-bold rounded shadow-sm transition-all ${lang === 'pt' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-500 hover:text-slate-300'}`}
              >
                PT
              </button>
              <button 
                onClick={() => { setLang('en'); expP.setPage(1); projP.setPage(1); eduP.setPage(1); certP.setPage(1); artP.setPage(1); }}
                className={`px-3 py-1 text-[11px] font-bold rounded shadow-sm transition-all ${lang === 'en' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </button>
            </div>
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-brand-border rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
              <span className="text-[10px] text-slate-400 font-mono">CI/CD: OPERATIONAL</span>
            </div>
          </div>

          <div className="flex items-center gap-4"></div>
        </div>

        {/* Sections */}
        <div className="space-y-20">
          
          {/* Core Competencies (Matching CV HTML) */}
          <section id="skills">
            <div className="mb-10 border-b border-slate-800 pb-4">
               <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <span className="w-1 h-6 bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></span>
                <span>{T.skills}</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolio.profile.skills.map((s: string) => (
                <div key={s} className="px-5 py-2.5 bg-brand-sidebar/50 border border-slate-800 rounded-xl text-cyan-400 font-bold text-xs uppercase tracking-wider hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all cursor-default">
                  {s}
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="flex flex-col">
            <div className="flex justify-between items-end mb-10 border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <span className="w-1 h-6 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                <span>{T.experience}</span>
              </h2>
              <PaginationUI 
                current={expP.currentPage} 
                total={expP.totalPages} 
                onNext={expP.nextPage} 
                onPrev={expP.prevPage}
                labelPage={T.page}
                labelOf={T.of}
              />
            </div>
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {expP.currentItems.map((exp: Experience) => (
                  <div key={exp.id} className="relative pl-6 border-l border-slate-800 pb-2 group">
                    <div className="absolute -left-1.5 top-1 w-3 h-3 bg-slate-800 rounded-full border border-brand-bg group-hover:bg-emerald-500 transition-colors shadow-[0_0_8px_rgba(16,185,129,0)] group-hover:shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-100">{exp.position}</h3>
                        <p className="text-emerald-500 text-sm font-bold uppercase tracking-wider">{exp.company}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full self-start">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-1 gap-3">
                      {exp.description.map((desc: string, i: number) => (
                        <li key={i} className="text-slate-400 text-[13px] leading-relaxed flex gap-3">
                          <ChevronRight size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Education & Certificates Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Education */}
            <section id="education">
              <div className="flex justify-between items-end mb-10 border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <span className="w-1 h-6 bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
                  <span>{T.education}</span>
                </h2>
                <PaginationUI 
                  current={eduP.currentPage} 
                  total={eduP.totalPages} 
                  onNext={eduP.nextPage} 
                  onPrev={eduP.prevPage}
                  labelPage={T.page}
                  labelOf={T.of}
                />
              </div>
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {eduP.currentItems.map((edu: Education) => (
                    <div key={edu.id} className="p-5 bg-slate-900/20 border border-slate-800 rounded-2xl flex items-center space-x-5 hover:border-slate-700 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                         <GraduationCap className="text-purple-400" size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight leading-tight mb-1">{edu.degree}</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                          {edu.institution.split('—')[0]} <span className="text-slate-700 ml-1">· {edu.period}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* Certificates */}
            <section id="certificates">
              <div className="flex justify-between items-end mb-10 border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <span className="w-1 h-6 bg-yellow-500 shadow-[0_0_8px_#eab308]"></span>
                  <span>{T.certificates}</span>
                </h2>
                <PaginationUI 
                  current={certP.currentPage} 
                  total={certP.totalPages} 
                  onNext={certP.nextPage} 
                  onPrev={certP.prevPage}
                  labelPage={T.page}
                  labelOf={T.of}
                />
              </div>
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {certP.currentItems.map((cert: Certificate) => (
                    <div key={cert.id} className="p-5 bg-slate-900/20 border border-slate-800 rounded-2xl flex items-center space-x-5 hover:border-slate-700 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shrink-0">
                         <Award className="text-yellow-400" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-white uppercase tracking-tight leading-tight mb-1">{cert.name}</h4>
                          {cert.link && <ExternalLink size={14} className="text-slate-700 group-hover:text-white transition-colors" />}
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                          {cert.issuer} <span className="text-slate-700 ml-1">· {cert.date}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </div>

          {/* Projects */}
          {(portfolio.sections?.projects ?? true) && (
          <section id="projects">
            <div className="flex justify-between items-end mb-10 border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <span className="w-1 h-6 bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
                <span>{T.projects}</span>
              </h2>
              <PaginationUI 
                current={projP.currentPage} 
                total={projP.totalPages} 
                onNext={projP.nextPage} 
                onPrev={projP.prevPage}
                labelPage={T.page}
                labelOf={T.of}
              />
            </div>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={projP.currentPage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {(projP.currentItems.length ? projP.currentItems : portfolio.projects).map((proj: Project) => (
                    <div key={proj.id} className="relative p-5 group flex flex-col hover:-translate-y-1 transition-all overflow-hidden rounded-2xl">
                    {/* Project Image Background */}
                    <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 opacity-20 group-hover:opacity-40">
                      {proj.image && (
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex flex-col h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                      <div className="flex justify-between items-start mb-4">
                         <h3 className="text-[15px] font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{getLocalizedField(proj, 'title', lang) || proj.title}</h3>
                         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-50 shadow-[0_0_8px_#3b82f6]"></div>
                      </div>
                      <p className="text-slate-400 text-[12px] leading-relaxed mb-6 line-clamp-3 group-hover:text-slate-200 transition-colors">
                        {getLocalizedField(proj, 'description', lang) || proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                        {proj.tech.map((t: string) => (
                          <span key={t} className="text-[9px] px-2 py-0.5 bg-brand-bg/80 rounded border border-slate-800 text-slate-500 font-bold uppercase tracking-wider">{t}</span>
                        ))}
                      </div>
                      <div className="flex gap-4 border-t border-slate-800 pt-5">
                        {proj.github && (
                          <a href={proj.github} className="text-slate-600 hover:text-white transition-colors" title="GitHub">
                            <Github size={18} />
                          </a>
                        )}
                        {proj.link && (
                          <a href={proj.link} className="text-slate-600 hover:text-white transition-colors" title="Live Demo">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>
          )}

          {/* Articles */}
          {(portfolio.sections?.articles ?? true) && (
          <section id="articles">
            <div className="flex justify-between items-end mb-10 border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <span className="w-1 h-6 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                <span>{T.articles}</span>
              </h2>
              <PaginationUI 
                current={artP.currentPage} 
                total={artP.totalPages} 
                onNext={artP.nextPage} 
                onPrev={artP.prevPage}
                labelPage={T.page}
                labelOf={T.of}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {(artP.currentItems.length ? artP.currentItems : portfolio.articles).map((article: Article) => (
                   <div 
                    key={article.id} 
                    className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all group flex flex-col h-full"
                  >
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <BookOpen size={12} className="text-emerald-500" />
                       {article.date}
                    </span>
                    <h3 className="text-[15px] font-bold text-white mb-3 leading-tight uppercase italic group-hover:text-emerald-400 transition-colors">
                      {getLocalizedField(article, 'title', lang) || article.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                      {getLocalizedField(article, 'description', lang) || article.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-800/60">
                      {article.type === 'internal' ? (
                        <Link 
                          to={`/articles/${article.slug}`}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500 hover:text-white transition-colors"
                        >
                          {T.readMore} <ChevronRight size={14} />
                        </Link>
                      ) : (
                        <a 
                          href={article.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors"
                        >
                          {T.readMore} <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </section>
          )}

          {/* Attachments */}
          <section id="attachments">
             <div className="mb-10 border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <span className="w-1 h-6 bg-slate-500 shadow-[0_0_8px_#64748b]"></span>
                <span>{T.attachments}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { name: 'Curriculum_Full.pdf', type: 'PDF', size: '1.2 MB', color: 'blue' },
                 { name: 'University_Degree.pdf', type: 'PDF', size: '2.5 MB', color: 'purple' }
               ].map((att, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-xl group cursor-pointer hover:border-emerald-500/50 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400`}>
                        <FileText size={18} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block mb-0.5">{att.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{att.type} · {att.size}</span>
                      </div>
                    </div>
                    <div className="p-2 text-slate-600 group-hover:text-emerald-500 transition-colors">
                      <Download size={18} />
                    </div>
                  </div>
               ))}
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="mt-40 pt-10 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_6px_#10b981]"></span>
              <span>Available for Work</span>
            </span>
            <span>&copy; {new Date().getFullYear()} {portfolio.profile.name}</span>
          </div>
          <div className="flex space-x-4">
             <span className="hover:text-emerald-500 cursor-help transition-colors text-[10px] font-mono text-slate-500 uppercase">Privacy Policy</span>
             <span className="hover:text-emerald-500 cursor-help transition-colors text-[10px] font-mono text-slate-500 uppercase">Terms</span>
          </div>
        </footer>
    </>
  );
}

function ArticlePage({ articles, T, lang }: { articles: Article[], T: any, lang: Language }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-4xl font-black text-white mb-4">404</h1>
        <p className="text-slate-400 mb-8">Article not found</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl">{T.back}</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 uppercase font-bold text-xs tracking-widest"
      >
        <ArrowLeft size={16} /> {T.back}
      </button>
      
      <div className="mb-12">
        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
          {getLocalizedField(article, 'date', lang) || article.date}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter uppercase italic">
          {getLocalizedField(article, 'title', lang) || article.title}
        </h1>
        <p className="text-lg text-slate-400 italic font-medium leading-relaxed">
          {getLocalizedField(article, 'description', lang) || article.description}
        </p>
      </div>

      <div className="prose prose-invert prose-slate max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-emerald-400 prose-strong:text-white">
        <div className="markdown-body">
          <Markdown>{getLocalizedField(article, 'content', lang) || article.content || ''}</Markdown>
        </div>
      </div>
      
      <div className="mt-20 pt-10 border-t border-slate-800">
         <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-slate-100 text-slate-950 font-bold rounded-xl hover:bg-white transition-all shadow-lg"
          >
            {T.back}
          </button>
      </div>
    </div>
  );
}

