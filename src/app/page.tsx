import Hero from "@/components/Hero";
import Simulator from "@/components/Simulator";
import Features from "@/components/Features";

export const metadata = {
  title: "THE GLASS STRATEGIST - 完全オーダーメイド変形円ミラー",
  description: "空間のノイズを切り落とす。あなただけの「欠けた円」が、完璧な調和を生む。リアルタイムのSVGシミュレーターで理想の比率を見つけてください。",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 overflow-hidden">
      <Hero />
      <Features />
      <Simulator />

      {/* Footer */}
      <footer className="py-12 bg-zinc-950 text-center border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-zinc-600 text-sm font-light">
            © 2026 THE GLASS STRATEGIST. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
