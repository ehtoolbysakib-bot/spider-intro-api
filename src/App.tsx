import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Sparkles, Image as ImageIcon, RefreshCw, Check, Code, ShieldCheck, Zap, BookOpen, Terminal } from 'lucide-react';
import DocsPage from './components/DocsPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  const [params, setParams] = useState({
    name: 'PIASH',
    age: '17',
    location: 'GAZIPUR',
    religion: 'Islam',
    relationship: 'Single',
    height: "5'0",
    birthday: 'November 15',
    bestie: 'Moon',
  });

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgKey, setImgKey] = useState(0);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buildApiUrl = () => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      const strVal = String(val || '').trim();
      if (strVal) {
        searchParams.append(key, strVal);
      }
    });
    return `/api/about-me?${searchParams.toString()}`;
  };

  const apiUrl = buildApiUrl();
  const fullApiUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${apiUrl}`;

  const handleParamChange = (field: string, val: string) => {
    setParams((prev) => ({ ...prev, [field]: val }));
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fullApiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreset = (preset: 'sample1' | 'sample2' | 'empty') => {
    if (preset === 'sample1') {
      setParams({
        name: 'PIASH',
        age: '17',
        location: 'GAZIPUR',
        religion: 'Islam',
        relationship: 'Single',
        height: "5'0",
        birthday: 'November 15',
        bestie: 'Moon',
      });
    } else if (preset === 'sample2') {
      setParams({
        name: 'John Doe',
        age: '20',
        location: 'Dhaka',
        religion: 'Islam',
        relationship: 'Single',
        height: "5'10",
        birthday: 'January 15',
        bestie: 'Alex',
      });
    } else {
      setParams({
        name: '',
        age: '',
        location: '',
        religion: '',
        relationship: '',
        height: '',
        birthday: '',
        bestie: '',
      });
    }
  };

  const isDocs = currentPath === '/docs';

  return (
    <div className="min-h-screen bg-[#08080c] text-gray-100 font-sans selection:bg-red-900 selection:text-white">
      {/* Header */}
      <header className="border-b border-red-950/60 bg-[#0c0c12]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center space-x-3 text-left focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-800/50 flex items-center justify-center text-red-500 shadow-inner group-hover:border-red-600 transition">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wider text-red-100 flex items-center gap-2">
                  About Me <span className="text-xs uppercase px-2 py-0.5 rounded bg-red-950 border border-red-800/40 text-red-400 font-mono">PNG API</span>
                </h1>
              </div>
            </button>

            {/* Navigation Tabs */}
            <nav className="hidden sm:flex items-center space-x-1 bg-[#12121c] p-1 rounded-lg border border-stone-800">
              <button
                onClick={() => navigateTo('/')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  !isDocs
                    ? 'bg-red-950 text-red-200 border border-red-800/60 shadow'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Playground
              </button>
              <button
                onClick={() => navigateTo('/docs')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${
                  isDocs
                    ? 'bg-red-950 text-red-200 border border-red-800/60 shadow'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> API Docs
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            {/* Mobile Nav buttons */}
            <div className="flex sm:hidden items-center space-x-1 bg-[#12121c] p-1 rounded-lg border border-stone-800">
              <button
                onClick={() => navigateTo('/')}
                className={`px-2.5 py-1 rounded text-xs transition ${!isDocs ? 'bg-red-950 text-red-200' : 'text-stone-400'}`}
              >
                App
              </button>
              <button
                onClick={() => navigateTo('/docs')}
                className={`px-2.5 py-1 rounded text-xs transition ${isDocs ? 'bg-red-950 text-red-200' : 'text-stone-400'}`}
              >
                Docs
              </button>
            </div>

            <a
              href="/health"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-green-400 bg-green-950/50 border border-green-800/40 px-2.5 py-1 rounded flex items-center gap-1.5 hover:bg-green-900/40 transition"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              API Health OK
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isDocs ? (
          <DocsPage />
        ) : (
          <div className="space-y-8">
            {/* Intro Card */}
            <div className="bg-gradient-to-r from-red-950/30 via-stone-900/40 to-red-950/20 border border-red-900/30 rounded-xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2 text-red-400 text-sm font-semibold tracking-wide uppercase">
                  <Zap className="w-4 h-4" /> Server-Side Gothic Light PNG Image Renderer
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-4xl">
                  This API generates high-quality Gothic Light <strong className="text-white">About Me PNG images</strong> on the server with intricate spider webs, dangling spiders, and custom <strong>Pirata One</strong> typography. Created & Designed by <strong className="text-red-400">SA K IB</strong>. Query parameters are composited over the light gothic parchment template and returned <strong className="text-red-400">directly as binary PNG image responses</strong>.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => navigateTo('/docs')}
                    className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium underline underline-offset-4 transition"
                  >
                    View API Documentation & Integration Code &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Live Playground Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: API Query Controls */}
              <div className="lg:col-span-5 bg-[#0e0e16] border border-stone-800/80 rounded-xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                  <h2 className="text-base font-semibold text-stone-200 flex items-center gap-2">
                    <Code className="w-4 h-4 text-red-500" />
                    Query Parameters
                  </h2>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handlePreset('sample1')}
                      className="text-xs bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/40 px-2.5 py-1 rounded transition"
                    >
                      PIASH
                    </button>
                    <button
                      onClick={() => handlePreset('sample2')}
                      className="text-xs bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700 px-2.5 py-1 rounded transition"
                    >
                      John Doe
                    </button>
                    <button
                      onClick={() => handlePreset('empty')}
                      className="text-xs bg-stone-900 hover:bg-stone-800 text-stone-400 border border-stone-800 px-2 py-1 rounded transition"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Input Fields Grid */}
                <div className="space-y-3.5">
                  {[
                    { label: 'Name', key: 'name', placeholder: 'e.g. PIASH', max: 50 },
                    { label: 'Age', key: 'age', placeholder: 'e.g. 17', max: 10 },
                    { label: 'Location', key: 'location', placeholder: 'e.g. GAZIPUR', max: 80 },
                    { label: 'Religion', key: 'religion', placeholder: 'e.g. Islam', max: 40 },
                    { label: 'Relationship', key: 'relationship', placeholder: 'e.g. Single', max: 80 },
                    { label: 'Hight (Height)', key: 'height', placeholder: "e.g. 5'0", max: 20 },
                    { label: 'Birthday', key: 'birthday', placeholder: 'e.g. November 15', max: 60 },
                    { label: 'Besteii (Bestie)', key: 'bestie', placeholder: 'e.g. Moon', max: 60 },
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <label className="text-stone-300 font-medium">{field.label}</label>
                        <span className="text-stone-500 font-mono">
                          {(params as any)[field.key].length}/{field.max}
                        </span>
                      </div>
                      <input
                        type="text"
                        maxLength={field.max}
                        value={(params as any)[field.key]}
                        onChange={(e) => handleParamChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full bg-[#14141f] border border-stone-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg px-3 py-2 text-sm text-stone-100 placeholder-stone-600 outline-none font-sans transition"
                      />
                    </div>
                  ))}
                </div>

                {/* API Endpoint Box */}
                <div className="pt-2 border-t border-stone-800/80 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Direct API Endpoint</span>
                    <span className="text-xs text-red-400 font-mono">GET 200 OK</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-[#12121a] border border-red-950/80 p-2.5 rounded-lg text-xs font-mono text-stone-300 overflow-x-auto">
                    <span className="text-red-400 font-semibold select-none">GET</span>
                    <span className="truncate flex-1 select-all text-red-200">{apiUrl}</span>
                    <button
                      onClick={handleCopyUrl}
                      title="Copy Endpoint URL"
                      className="p-1.5 hover:bg-stone-800 rounded text-stone-400 hover:text-white transition flex-shrink-0"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={apiUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Open Raw Image in New Tab"
                      className="p-1.5 hover:bg-stone-800 rounded text-stone-400 hover:text-white transition flex-shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Generated Image Live Preview */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-[#0e0e16] border border-stone-800/80 rounded-xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4 text-red-500" />
                      <h2 className="text-base font-semibold text-stone-200">Live API PNG Response</h2>
                    </div>
                    <button
                      onClick={() => setImgKey((k) => k + 1)}
                      className="text-xs text-stone-400 hover:text-white bg-stone-900 border border-stone-800 px-3 py-1.5 rounded flex items-center gap-1.5 transition"
                    >
                      <RefreshCw className="w-3 h-3" /> Refresh Image
                    </button>
                  </div>

                  {/* Image Preview Canvas */}
                  <div className="relative bg-black border border-stone-900 rounded-lg p-2 flex items-center justify-center min-h-[420px] overflow-hidden group shadow-inner">
                    {loading && (
                      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="flex flex-col items-center space-y-2">
                          <RefreshCw className="w-6 h-6 text-red-500 animate-spin" />
                          <span className="text-xs text-stone-300 font-mono">Rendering Gothic PNG...</span>
                        </div>
                      </div>
                    )}
                    <img
                      key={imgKey}
                      src={`${apiUrl}&_t=${imgKey}`}
                      alt="Generated About Me Gothic PNG"
                      onLoadStart={() => setLoading(true)}
                      onLoad={() => setLoading(false)}
                      onError={() => setLoading(false)}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[720px] object-contain rounded shadow-2xl transition duration-300"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-400 font-mono pt-1">
                    <span>Content-Type: <strong className="text-stone-200">image/png</strong></span>
                    <span>Dimensions: <strong className="text-stone-200">1200 x 1100 px</strong></span>
                  </div>
                </div>

                {/* Quick Curl & Usage Documentation */}
                <div className="bg-[#0e0e16] border border-stone-800/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-red-400" /> Production Usage
                    </h3>
                    <button
                      onClick={() => navigateTo('/docs')}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Full Docs &rarr;
                    </button>
                  </div>
                  <div className="bg-[#09090e] border border-stone-900 p-3 rounded-lg font-mono text-xs text-red-300 overflow-x-auto select-all">
                    curl "{fullApiUrl}" --output about_me.png
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

