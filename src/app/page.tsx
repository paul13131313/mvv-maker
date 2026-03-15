"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <p className="text-sm tracking-[0.3em] text-gray-400 mb-8">
          MVV MAKER
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-navy text-center leading-tight mb-6">
          御社の
          <span className="text-gold">VISION</span>
          は
          <br />
          どこから？
        </h1>
        <p className="text-gray-500 text-lg md:text-xl text-center mb-12 max-w-lg">
          いくつかの質問に答えるだけで、
          <br className="md:hidden" />
          AIがMVVを生成します
        </p>
        <Link
          href="/create"
          className="bg-navy text-white px-12 py-4 text-lg font-bold tracking-wider hover:bg-navy-light transition-colors rounded-sm"
        >
          無料でつくる
        </Link>
      </section>

      {/* Plan Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-center text-2xl font-bold text-navy mb-12 tracking-wider">
          PLAN
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="border-2 border-navy p-8 text-center">
            <p className="text-sm tracking-[0.2em] text-gray-400 mb-2">FREE</p>
            <p className="text-3xl font-black text-navy mb-6">無料</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-8">
              <li>MVV自動生成</li>
              <li>画像ダウンロード</li>
              <li>何度でも再生成可能</li>
            </ul>
            <Link
              href="/create"
              className="inline-block bg-navy text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-navy-light transition-colors rounded-sm"
            >
              無料でつくる
            </Link>
          </div>

          {/* Pro */}
          <div className="border border-gray-200 p-8 text-center opacity-60">
            <p className="text-sm tracking-[0.2em] text-gray-400 mb-2">PRO</p>
            <p className="text-xl font-bold text-gray-400 mb-6">Coming Soon</p>
            <ul className="text-sm text-gray-400 space-y-2 mb-8">
              <li>社長インタビュー記事</li>
              <li>ブランドストーリー生成</li>
              <li>複数パターン比較</li>
            </ul>
            <span className="inline-block bg-gray-200 text-gray-400 px-8 py-3 text-sm font-bold tracking-wider cursor-not-allowed rounded-sm">
              準備中
            </span>
          </div>

          {/* Premium */}
          <div className="border border-gray-200 p-8 text-center opacity-60">
            <p className="text-sm tracking-[0.2em] text-gray-400 mb-2">PREMIUM</p>
            <p className="text-xl font-bold text-gray-400 mb-6">Coming Soon</p>
            <ul className="text-sm text-gray-400 space-y-2 mb-8">
              <li>プロのコピーライターが制作</li>
              <li>ヒアリング・提案・納品</li>
              <li>CI/VI一式対応可</li>
            </ul>
            <a
              href="mailto:paul13131313@gmail.com?subject=MVVメーカー Premium プランについて"
              className="inline-block border border-gray-300 text-gray-400 px-8 py-3 text-sm font-bold tracking-wider cursor-not-allowed rounded-sm"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 tracking-wider">
        MVV MAKER — AI STUDIO PAUL
      </footer>
    </div>
  );
}
