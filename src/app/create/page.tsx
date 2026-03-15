"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    id: "company_name",
    label: "会社名（または事業名）を教えてください",
    type: "text" as const,
    placeholder: "例: 株式会社サンプル",
    required: true,
  },
  {
    id: "industry",
    label: "業種を選んでください",
    type: "select" as const,
    options: [
      "IT・テクノロジー",
      "製造業",
      "小売・EC",
      "飲食・サービス",
      "医療・ヘルスケア",
      "教育",
      "不動産・建設",
      "金融",
      "コンサルティング",
      "クリエイティブ・メディア",
      "その他",
    ],
    required: true,
  },
  {
    id: "business",
    label: "事業内容を一言で教えてください",
    type: "text" as const,
    placeholder: "例: 中小企業向けのクラウド会計ソフトを開発",
    required: true,
  },
  {
    id: "values_input",
    label: "大切にしていることは何ですか？",
    type: "text" as const,
    placeholder: "例: お客様の声を第一に、スピード感、誠実さ",
    required: true,
  },
  {
    id: "goal",
    label: "3年後にどうなっていたいですか？",
    type: "text" as const,
    placeholder: "例: 業界シェアNo.1、全国展開、社員100人",
    required: true,
  },
  {
    id: "tone",
    label: "MVVのトーンを選んでください",
    type: "select" as const,
    options: [
      "情熱的で力強い",
      "知的で洗練された",
      "親しみやすくカジュアル",
      "堅実で信頼感のある",
    ],
    required: true,
  },
];

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [otherIndustry, setOtherIndustry] = useState("");

  const current = QUESTIONS[step];
  const totalSteps = QUESTIONS.length;
  const currentValue = answers[current.id] || "";

  const canProceed = () => {
    if (current.id === "industry" && currentValue === "その他") {
      return otherIndustry.trim().length > 0;
    }
    return currentValue.trim().length > 0;
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const finalAnswers = { ...answers };
      if (finalAnswers.industry === "その他") {
        finalAnswers.industry = otherIndustry;
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalAnswers),
      });

      if (!res.ok) {
        throw new Error("生成に失敗しました");
      }

      const data = await res.json();
      sessionStorage.setItem("mvv_result", JSON.stringify(data));
      sessionStorage.setItem("mvv_company", finalAnswers.company_name);
      router.push("/result");
    } catch (error) {
      console.error(error);
      alert("MVVの生成に失敗しました。もう一度お試しください。");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-navy rounded-full animate-spin mb-8" />
        <p className="text-2xl font-bold text-navy mb-2">MVVを生成中...</p>
        <p className="text-gray-400 text-sm">AIが最適なMVVを作成しています</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-6">
        <button
          onClick={() => router.push("/")}
          className="text-sm tracking-[0.2em] text-gray-400 hover:text-navy transition-colors"
        >
          MVV MAKER
        </button>
      </header>

      {/* Progress */}
      <div className="max-w-lg mx-auto w-full px-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 tracking-wider">
            STEP {step + 1} / {totalSteps}
          </span>
        </div>
        <div className="h-0.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-navy transition-all duration-500"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <div className="max-w-lg w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-10 leading-relaxed">
            {current.label}
          </h2>

          {current.type === "text" && (
            <input
              type="text"
              value={currentValue}
              onChange={(e) =>
                setAnswers({ ...answers, [current.id]: e.target.value })
              }
              placeholder={current.placeholder}
              className="w-full border-b-2 border-gray-200 focus:border-navy outline-none text-lg py-3 transition-colors bg-transparent text-navy placeholder:text-gray-300"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing && canProceed()) {
                  if (step === totalSteps - 1) {
                    handleGenerate();
                  } else {
                    handleNext();
                  }
                }
              }}
              autoFocus
            />
          )}

          {current.type === "select" && (
            <div className="space-y-3">
              {current.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setAnswers({ ...answers, [current.id]: option });
                    if (option !== "その他") {
                      setTimeout(() => {
                        if (step < totalSteps - 1) {
                          setStep(step + 1);
                        }
                      }, 300);
                    }
                  }}
                  className={`w-full text-left px-6 py-4 border transition-colors rounded-sm text-sm ${
                    currentValue === option
                      ? "border-navy bg-navy text-white"
                      : "border-gray-200 text-gray-600 hover:border-navy hover:text-navy"
                  }`}
                >
                  {option}
                </button>
              ))}
              {current.id === "industry" && currentValue === "その他" && (
                <input
                  type="text"
                  value={otherIndustry}
                  onChange={(e) => setOtherIndustry(e.target.value)}
                  placeholder="業種を入力してください"
                  className="w-full border-b-2 border-gray-200 focus:border-navy outline-none text-lg py-3 transition-colors bg-transparent text-navy placeholder:text-gray-300 mt-4"
                  autoFocus
                />
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-16">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`text-sm tracking-wider px-6 py-3 transition-colors ${
                step === 0
                  ? "text-gray-200 cursor-not-allowed"
                  : "text-gray-400 hover:text-navy"
              }`}
            >
              ← 戻る
            </button>

            {step === totalSteps - 1 ? (
              <button
                onClick={handleGenerate}
                disabled={!canProceed()}
                className={`px-10 py-3 text-sm font-bold tracking-wider rounded-sm transition-colors ${
                  canProceed()
                    ? "bg-gold text-white hover:bg-gold-light"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                MVVを生成する
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-10 py-3 text-sm font-bold tracking-wider rounded-sm transition-colors ${
                  canProceed()
                    ? "bg-navy text-white hover:bg-navy-light"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                次へ →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
