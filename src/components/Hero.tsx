"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20 md:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-zinc-900/50 border border-zinc-800 text-amber-500/90 text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                        完全オーダーメイド・変形円ミラー
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-8 leading-tight">
                        空間のノイズを切り落とす。<br />
                        あなただけの<span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">「欠けた円」</span>が、<br />
                        完璧な調和を生む。
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                >
                    壁面のコンセント、柱、建具。あらゆる障害物を避けて美しく収まる、極限まで研ぎ澄まされたエッジ。<br />
                    ミリ単位で切断位置を指定できるシミュレーターで、あなたの部屋に最も美しい比率を見つけてください。
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-8 py-4 bg-white text-zinc-950 font-medium rounded-full hover:bg-zinc-200 transition-colors duration-300 w-full sm:w-auto flex items-center justify-center gap-2 group"
                    >
                        <span>シミュレーターを起動</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>

                    <button className="px-8 py-4 bg-zinc-900 text-white font-medium rounded-full border border-zinc-800 hover:bg-zinc-800 transition-colors duration-300 w-full sm:w-auto">
                        設置事例を見る
                    </button>
                </motion.div>
            </div>

            {/* Decorative semi-circle indicating the "cut edge" theme */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-screen max-w-6xl h-64 border-t border-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)] rounded-t-[100%] pointer-events-none"
            />
        </section>
    );
}
