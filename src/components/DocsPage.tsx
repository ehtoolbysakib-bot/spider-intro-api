import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Terminal,
  Server,
  Zap,
  Globe,
  FileText,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Layers,
  Cpu,
  HelpCircle,
  Play
} from 'lucide-react';

export default function DocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'curl' | 'html' | 'js' | 'python' | 'php'>('curl');

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-app.onrender.com';
  const sampleApiUrl = `${originUrl}/api/about-me?name=PIASH&age=17&location=GAZIPUR&religion=Islam&relationship=Single&height=5%270&birthday=November%2015&bestie=Moon`;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeSnippets = {
    curl: `# Download direct PNG image using cURL
curl -o about_me.png "${sampleApiUrl}"`,

    html: `<!-- Embed directly in any HTML image tag -->
<img 
  src="${sampleApiUrl}" 
  alt="Gothic About Me Card"
  width="1200"
  height="1100"
/>`,

    js: `// Fetch PNG image in JavaScript / Node.js
async function fetchAboutMeImage() {
  const response = await fetch('${sampleApiUrl}');
  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  
  // Display in <img> element
  document.getElementById('my-image').src = imageUrl;
}

fetchAboutMeImage();`,

    python: `# Download and save PNG image in Python
import requests

url = "${sampleApiUrl}"
response = requests.get(url)

if response.status_code == 200:
    with open("about_me.png", "wb") as f:
        f.write(response.content)
    print("Image saved successfully as about_me.png!")
else:
    print("Failed to generate image:", response.status_code)`,

    php: `<?php
// Fetch and save PNG image in PHP
$url = "${sampleApiUrl}";
$imageData = file_get_contents($url);

if ($imageData !== false) {
    file_put_contents("about_me.png", $imageData);
    echo "Image saved as about_me.png";
} else {
    echo "Error fetching image from API";
}
?>`
  };

  const parameters = [
    { name: 'name', type: 'string', max: '50 chars', default: 'Empty', desc: 'Full or display name (e.g. PIASH)' },
    { name: 'age', type: 'string', max: '10 chars', default: 'Empty', desc: 'Age value (e.g. 17)' },
    { name: 'location', type: 'string', max: '80 chars', default: 'Empty', desc: 'Location or city (e.g. GAZIPUR)' },
    { name: 'religion', type: 'string', max: '40 chars', default: 'Empty', desc: 'Religion / Faith (e.g. Islam)' },
    { name: 'relationship', type: 'string', max: '80 chars', default: 'Empty', desc: 'Relationship status (e.g. Single)' },
    { name: 'height / hight', type: 'string', max: '20 chars', default: 'Empty', desc: 'Height measurement (e.g. 5\'0)' },
    { name: 'birthday', type: 'string', max: '60 chars', default: 'Empty', desc: 'Birthday date (e.g. November 15)' },
    { name: 'bestie', type: 'string', max: '60 chars', default: 'Empty', desc: 'Best friend\'s name (e.g. Moon)' },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-[#100b12] to-stone-900/60 border border-red-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 animate-pulse text-red-500" /> Official API Documentation
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me PNG Generator <span className="text-red-500">API Docs</span>
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Welcome to the complete developer documentation for the <strong>Gothic About Me Image API</strong>. 
            This API generates custom, dynamic PNG image cards on the fly using server-side Sharp and SVG rendering with <strong>Pirata One</strong> gothic typography.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900 hover:bg-red-800 text-white font-medium text-xs sm:text-sm transition shadow-lg shadow-red-950/50"
            >
              <Play className="w-4 h-4" /> Open Live Playground
            </a>
            <a
              href="/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-green-400 border border-green-800/40 font-mono text-xs sm:text-sm transition"
            >
              <ShieldCheck className="w-4 h-4" /> Health Endpoint
            </a>
          </div>
        </div>
      </div>

      {/* Quick API Specs Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0e0e16] border border-stone-800 p-4 rounded-xl space-y-1.5">
          <div className="text-xs text-stone-400 font-mono flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-red-400" /> HTTP Method
          </div>
          <div className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-green-950 border border-green-800/50 text-green-400 text-xs">GET</span>
            /api/about-me
          </div>
        </div>

        <div className="bg-[#0e0e16] border border-stone-800 p-4 rounded-xl space-y-1.5">
          <div className="text-xs text-stone-400 font-mono flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-red-400" /> Response Format
          </div>
          <div className="text-base font-bold text-stone-100 font-mono">
            image/png <span className="text-xs font-normal text-stone-400">(Direct Binary)</span>
          </div>
        </div>

        <div className="bg-[#0e0e16] border border-stone-800 p-4 rounded-xl space-y-1.5">
          <div className="text-xs text-stone-400 font-mono flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-red-400" /> Typography
          </div>
          <div className="text-base font-bold text-red-400 font-mono">
            Pirata One <span className="text-xs font-normal text-stone-400">(Embedded TTF)</span>
          </div>
        </div>

        <div className="bg-[#0e0e16] border border-stone-800 p-4 rounded-xl space-y-1.5">
          <div className="text-xs text-stone-400 font-mono flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-red-400" /> Image Size
          </div>
          <div className="text-base font-bold text-stone-100 font-mono">
            1200 × 1100 px <span className="text-xs font-normal text-stone-400">(HD PNG)</span>
          </div>
        </div>
      </div>

      {/* API Request Endpoint Section */}
      <section className="bg-[#0e0e16] border border-stone-800/80 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
            <Server className="w-5 h-5 text-red-500" />
            Base Endpoint URL
          </h2>
          <span className="text-xs text-green-400 bg-green-950/60 border border-green-800/40 px-2.5 py-1 rounded font-mono">
            200 OK
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-stone-300 text-sm">
            Send a <code className="bg-black/60 text-red-400 px-1.5 py-0.5 rounded font-mono text-xs">GET</code> request to the endpoint with any combination of query parameters. Missing fields will remain blank on the card.
          </p>

          <div className="flex items-center space-x-2 bg-[#09090f] border border-red-950 p-3 rounded-lg font-mono text-xs sm:text-sm text-stone-200 overflow-x-auto">
            <span className="text-red-500 font-bold select-none">GET</span>
            <span className="flex-1 select-all text-red-200">{originUrl}/api/about-me</span>
            <button
              onClick={() => copyToClipboard(`${originUrl}/api/about-me`, 99)}
              className="p-2 hover:bg-stone-800 rounded text-stone-400 hover:text-white transition flex-shrink-0"
              title="Copy Base URL"
            >
              {copiedIndex === 99 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </section>

      {/* Query Parameters Specification */}
      <section className="bg-[#0e0e16] border border-stone-800/80 rounded-xl p-6 shadow-xl space-y-6">
        <div className="border-b border-stone-800/80 pb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
            <Code className="w-5 h-5 text-red-500" />
            Query Parameters Reference
          </h2>
          <span className="text-xs text-stone-400 font-mono">All Parameters Optional</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-300">
            <thead className="text-xs font-mono uppercase bg-[#141420] text-red-400 border-b border-stone-800">
              <tr>
                <th className="px-4 py-3">Parameter</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Max Limit</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-mono text-xs">
              {parameters.map((param, i) => (
                <tr key={i} className="hover:bg-stone-900/40 transition">
                  <td className="px-4 py-3 font-bold text-red-300">{param.name}</td>
                  <td className="px-4 py-3 text-stone-400">{param.type}</td>
                  <td className="px-4 py-3 text-yellow-400/90">{param.max}</td>
                  <td className="px-4 py-3 text-stone-300 font-sans text-xs">{param.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Snippets & Examples */}
      <section className="bg-[#0e0e16] border border-stone-800/80 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-red-500" />
            Code Integration Snippets
          </h2>

          {/* Language selector tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#08080d] p-1 rounded-lg border border-stone-800">
            {(['curl', 'html', 'js', 'python', 'php'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition uppercase ${
                  activeTab === lang
                    ? 'bg-red-950 text-red-300 border border-red-800/60 font-bold'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Snippet display box */}
        <div className="relative bg-[#08080d] border border-stone-900 rounded-xl p-4 overflow-hidden">
          <button
            onClick={() => copyToClipboard(codeSnippets[activeTab], 100)}
            className="absolute top-3 right-3 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700/60 rounded text-xs text-stone-300 hover:text-white font-mono flex items-center gap-1.5 transition z-10"
          >
            {copiedIndex === 100 ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Code
              </>
            )}
          </button>
          <pre className="font-mono text-xs sm:text-sm text-red-200/90 overflow-x-auto p-2 leading-relaxed">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>
      </section>

      {/* Render.com Deployment Guide */}
      <section className="bg-[#0e0e16] border border-stone-800/80 rounded-xl p-6 shadow-xl space-y-6">
        <div className="border-b border-stone-800/80 pb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-500" />
            Deployment Guide for Render.com
          </h2>
          <span className="text-xs text-red-400 font-mono uppercase bg-red-950/80 px-2 py-0.5 rounded border border-red-800/40">
            Zero Configuration Error
          </span>
        </div>

        <p className="text-stone-300 text-sm leading-relaxed">
          This project includes a pre-configured <code className="bg-black/60 text-red-400 px-1.5 py-0.5 rounded font-mono text-xs">render.yaml</code> blueprint that enables instant, error-free deployment on Render.com. Follow these steps to host your own API instance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#08080d] border border-stone-900 p-4 rounded-xl space-y-2">
            <div className="text-xs font-bold text-red-400 font-mono flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-red-400 text-[10px]">1</span>
              Push Code to GitHub
            </div>
            <p className="text-xs text-stone-400 leading-normal">
              Commit and push this entire repository to your GitHub account.
            </p>
          </div>

          <div className="bg-[#08080d] border border-stone-900 p-4 rounded-xl space-y-2">
            <div className="text-xs font-bold text-red-400 font-mono flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-red-400 text-[10px]">2</span>
              New Web Service on Render
            </div>
            <p className="text-xs text-stone-400 leading-normal">
              Log in to <strong className="text-white">Render.com</strong>, click <strong>New +</strong> &rarr; <strong>Web Service</strong>, and connect your GitHub repo.
            </p>
          </div>

          <div className="bg-[#08080d] border border-stone-900 p-4 rounded-xl space-y-2">
            <div className="text-xs font-bold text-red-400 font-mono flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-red-400 text-[10px]">3</span>
              Build & Start Commands
            </div>
            <div className="font-mono text-xs text-stone-300 space-y-1 bg-black/50 p-2 rounded border border-stone-800">
              <div><span className="text-stone-500">Build:</span> npm run build</div>
              <div><span className="text-stone-500">Start:</span> npm start</div>
            </div>
          </div>

          <div className="bg-[#08080d] border border-stone-900 p-4 rounded-xl space-y-2">
            <div className="text-xs font-bold text-red-400 font-mono flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-red-950 border border-red-800 flex items-center justify-center text-red-400 text-[10px]">4</span>
              Environment Variables
            </div>
            <div className="font-mono text-xs text-stone-300 bg-black/50 p-2 rounded border border-stone-800">
              <div>NODE_ENV = production</div>
              <div>PORT = 10000 <span className="text-stone-500">(Auto-configured)</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Troubleshooting */}
      <section className="bg-[#0e0e16] border border-stone-800/80 rounded-xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2 border-b border-stone-800/80 pb-3">
          <HelpCircle className="w-5 h-5 text-red-500" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <h3 className="font-bold text-stone-200">Q: Does the API return JSON or raw image binary?</h3>
            <p className="text-stone-400 leading-relaxed">
              The API returns direct raw <strong className="text-red-400 font-mono">PNG image binary</strong> with <code className="bg-black/50 text-red-300 px-1 py-0.5 rounded font-mono">Content-Type: image/png</code>. You can paste the API URL directly into an <code className="bg-black/50 text-red-300 px-1 py-0.5 rounded font-mono">&lt;img src="..."&gt;</code> tag in any website or Discord bot!
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-stone-200">Q: What happens if a parameter is omitted?</h3>
            <p className="text-stone-400 leading-relaxed">
              If a parameter is missing or left empty, that field will remain blank on the Gothic card. The card structure and gothic labels will still render perfectly.
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-stone-200">Q: How does caching work?</h3>
            <p className="text-stone-400 leading-relaxed">
              To ensure lightning-fast response times under heavy traffic, the server caches recently generated PNG images in memory. Duplicate parameter requests respond instantly from cache.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
