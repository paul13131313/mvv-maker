"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface MVVResult {
  mission: string;
  vision: string;
  values: { keyword: string; description: string }[];
  purpose: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<MVVResult | null>(null);
  const [company, setCompany] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("mvv_result");
    const storedCompany = sessionStorage.getItem("mvv_company");
    if (!stored) {
      router.push("/create");
      return;
    }
    setResult(JSON.parse(stored));
    setCompany(storedCompany || "");
  }, [router]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExportImage = async () => {
    if (!cardRef.current) return;
    const { default: html2canvas } = await import("html2canvas-pro");
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = `${company || "MVV"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-navy rounded-full animate-spin" />
      </div>
    );
  }

  const allText = `【${company} MVV】

■ Mission（使命）
${result.mission}

■ Vision（展望）
${result.vision}

■ Value（価値観）
${result.values.map((v) => `・${v.keyword}: ${v.description}`).join("\n")}

■ Purpose（存在意義）
${result.purpose}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="px-6 py-6 bg-white">
        <button
          onClick={() => router.push("/")}
          className="text-sm tracking-[0.2em] text-gray-400 hover:text-navy transition-colors"
        >
          MVV MAKER
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-navy text-center mb-2">
          {company}
        </h1>
        <p className="text-center text-sm text-gray-400 tracking-wider mb-12">
          MISSION / VISION / VALUE / PURPOSE
        </p>

        {/* MVV Cards - Export Target */}
        <div ref={cardRef} className="bg-white p-8 md:p-12 space-y-10">
          {/* Mission */}
          <div className="border-l-4 border-navy pl-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs tracking-[0.3em] text-gray-400 font-bold">
                MISSION — 使命
              </h2>
              <button
                onClick={() => copyToClipboard(result.mission, "mission")}
                className="text-xs text-gray-300 hover:text-navy transition-colors"
              >
                {copied === "mission" ? "✓ copied" : "copy"}
              </button>
            </div>
            <p className="text-lg md:text-xl text-navy leading-relaxed font-medium">
              {result.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="border-l-4 border-gold pl-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs tracking-[0.3em] text-gray-400 font-bold">
                VISION — 展望
              </h2>
              <button
                onClick={() => copyToClipboard(result.vision, "vision")}
                className="text-xs text-gray-300 hover:text-navy transition-colors"
              >
                {copied === "vision" ? "✓ copied" : "copy"}
              </button>
            </div>
            <p className="text-lg md:text-xl text-navy leading-relaxed font-medium">
              {result.vision}
            </p>
          </div>

          {/* Values */}
          <div className="border-l-4 border-gray-200 pl-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs tracking-[0.3em] text-gray-400 font-bold">
                VALUE — 価値観
              </h2>
              <button
                onClick={() =>
                  copyToClipboard(
                    result.values
                      .map((v) => `${v.keyword}: ${v.description}`)
                      .join("\n"),
                    "values"
                  )
                }
                className="text-xs text-gray-300 hover:text-navy transition-colors"
              >
                {copied === "values" ? "✓ copied" : "copy"}
              </button>
            </div>
            <div className="space-y-5">
              {result.values.map((v, i) => (
                <div key={i}>
                  <p className="text-base font-bold text-navy mb-1">
                    {v.keyword}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div className="border-l-4 border-navy pl-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs tracking-[0.3em] text-gray-400 font-bold">
                PURPOSE — 存在意義
              </h2>
              <button
                onClick={() => copyToClipboard(result.purpose, "purpose")}
                className="text-xs text-gray-300 hover:text-navy transition-colors"
              >
                {copied === "purpose" ? "✓ copied" : "copy"}
              </button>
            </div>
            <p className="text-lg md:text-xl text-navy leading-relaxed font-medium">
              {result.purpose}
            </p>
          </div>

          {/* Watermark */}
          <p className="text-center text-[10px] text-gray-200 tracking-[0.3em] pt-4">
            Generated by MVV MAKER — AI STUDIO PAUL
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <button
            onClick={() => copyToClipboard(allText, "all")}
            className="px-8 py-3 border border-navy text-navy text-sm font-bold tracking-wider hover:bg-navy hover:text-white transition-colors rounded-sm"
          >
            {copied === "all" ? "✓ コピーしました" : "すべてコピー"}
          </button>
          <button
            onClick={handleExportImage}
            className="px-8 py-3 bg-navy text-white text-sm font-bold tracking-wider hover:bg-navy-light transition-colors rounded-sm"
          >
            画像で保存
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 mt-12">
          <button
            onClick={() => router.push("/create")}
            className="text-sm text-gray-400 hover:text-navy transition-colors tracking-wider"
          >
            もう一度つくる →
          </button>
        </div>

        {/* Pro/Premium Banner */}
        <div className="mt-16 border border-gray-200 p-8 text-center rounded-sm">
          <p className="text-xs tracking-[0.2em] text-gray-400 mb-2">
            COMING SOON
          </p>
          <p className="text-lg font-bold text-navy mb-2">
            もっと本格的なMVVが必要ですか？
          </p>
          <p className="text-sm text-gray-400 mb-6">
            プロのコピーライターが御社のMVVを制作する
            <br />
            Premiumプランを準備中です
          </p>
          <a
            href="mailto:paul13131313@gmail.com?subject=MVVメーカー Premium プランについて"
            className="inline-block border border-gold text-gold px-8 py-3 text-sm font-bold tracking-wider hover:bg-gold hover:text-white transition-colors rounded-sm"
          >
            お問い合わせ
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 tracking-wider">
        MVV MAKER — AI STUDIO PAUL
      </footer>
    </div>
  );
}
