import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MVVメーカー | 御社のVISIONはどこから？",
  description: "いくつかの質問に答えるだけで、AIがミッション・ビジョン・バリュー・パーパスを生成します",
  metadataBase: new URL("https://mvv-maker.vercel.app"),
  openGraph: {
    title: "MVVメーカー | 御社のVISIONはどこから？",
    description: "いくつかの質問に答えるだけで、AIがミッション・ビジョン・バリュー・パーパスを生成します",
    images: [{ url: "https://og-api-self.vercel.app/api/og?title=MVV%20MAKER&category=AI%20Tools", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
