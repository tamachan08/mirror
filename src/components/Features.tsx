"use client";

import { motion } from "framer-motion";
import { Ruler, ShieldCheck, Sparkles } from "lucide-react";

const features = [
    {
        icon: <Ruler className="w-8 h-8 text-amber-500" />,
        title: "1mm単位の完全オーダー",
        description: "コンセントや柱、建具との干渉を避けるため、あなたの空間に合わせた完璧なサイズの鏡を展開します。妥協のないフィット感を実現します。"
    },
    {
        icon: <Sparkles className="w-8 h-8 text-amber-500" />,
        title: "至高のクリアカットエッジ",
        description: "硝子専門の熟練職人による手作業の研磨。ただの加工技術ではなく、ガラスの断面が光を反射する美しいアートピースに生まれ変わります。"
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
        title: "安心の国内自社工場生産",
        description: "受注から切断、特殊研磨、厳重な梱包・配送までを自社で一貫対応。ハイクオリティなカスタム製品を最短納期で確実にお届けします。"
    }
];

export default function Features() {
    return (
        <section className="py-32 bg-zinc-950 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light text-white mb-6"
                    >
                        ただの鏡ではない、<br />空間を洗練させる<span className="text-amber-500 font-medium">「余白」</span>の創造。
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg max-w-2xl mx-auto"
                    >
                        既製品の鏡に空間を合わせる時代は終わりました。障害物を避けて美しく収まる、完全オーダーメイドの変形円ミラー。
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                            className="bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-3xl hover:bg-zinc-900/80 hover:border-zinc-700 transition-colors duration-500 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-medium text-white mb-4 tracking-wide">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed font-light">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
