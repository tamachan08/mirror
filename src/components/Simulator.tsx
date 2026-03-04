"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Info, ShoppingCart } from "lucide-react";

export default function Simulator() {
    const [diameter, setDiameter] = useState<number>(600); // 300 to 1500mm
    const [cutDistance, setCutDistance] = useState<number>(100); // Distance from edge (min 100)
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const MIN_DIAMETER = 300;
    const MAX_DIAMETER = 1500;
    const MIN_CUT = 100;
    const BASE_PRICE_PER_SQM = 45000; // ¥45,000 per sq meter
    const CUT_FEE = 4000; // Flat fee for the straight cut
    const SHIPPING = 2500;

    // Validate and calculate
    useEffect(() => {
        let currentError = null;
        if (diameter < MIN_DIAMETER || diameter > MAX_DIAMETER) {
            currentError = `直径は${MIN_DIAMETER}mmから${MAX_DIAMETER}mmの間で指定してください。`;
        }

        // Ensure cut distance from the edge is within [100, diameter - 100]
        // so that at least 100mm of mirror remains
        if (cutDistance < MIN_CUT || cutDistance >= diameter - MIN_CUT) {
            if (diameter < MIN_CUT * 2) {
                currentError = `直径が${MIN_CUT * 2}mm未満の場合、切断加工はできません。`;
            } else {
                currentError = `端からの切断距離は${MIN_CUT}mmから${diameter - MIN_CUT}mmの範囲で指定してください（最低100mmの幅を残す必要があります）。`;
            }
        }

        setError(currentError);

        if (!currentError) {
            // Pricing uses true area
            const r_m = (diameter / 1000) / 2;
            const fullArea = Math.PI * Math.pow(r_m, 2);

            let segmentAreaM2 = 0;
            if (cutDistance < diameter / 2) {
                // calculate area of the piece cut off
                const d_m = r_m - (cutDistance / 1000);
                const theta = 2 * Math.acos(d_m / r_m);
                segmentAreaM2 = 0.5 * Math.pow(r_m, 2) * (theta - Math.sin(theta));
            } else {
                // shape is more than half cut off. segmentArea becomes the part KEPT.
                // mathematical equivalent: calculate the area of the smaller remaining segment.
                const remainingCutDistance = diameter - cutDistance;
                const d_m = r_m - (remainingCutDistance / 1000);
                const theta = 2 * Math.acos(d_m / r_m);
                const KeptSegmentArea = 0.5 * Math.pow(r_m, 2) * (theta - Math.sin(theta));
                segmentAreaM2 = fullArea - KeptSegmentArea;
            }

            const actualAreaM2 = fullArea - segmentAreaM2;
            const glassPrice = actualAreaM2 * BASE_PRICE_PER_SQM;
            setPrice(Math.round(glassPrice + CUT_FEE + 15000));
        }
    }, [diameter, cutDistance]);

    const radius_mm = diameter / 2;
    const cut_x_from_center = radius_mm - cutDistance;
    const scaleFactor = 400 / diameter;
    const mappedCutLine = cut_x_from_center * scaleFactor;
    const radius = 200; // SVG scale mapping

    // SVG points for the cut circle. Origin at center (200, 200). Cut is vertical.
    const yIntersect = Math.sqrt(Math.max(0, Math.pow(radius, 2) - Math.pow(mappedCutLine, 2))) || 0;

    return (
        <section id="simulator" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-4">ミリ単位の完璧な調和</h2>
                    <p className="text-zinc-400">リアルタイムシミュレーターで、理想の比率を見つけてください。</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left: Input Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-zinc-800">
                            <Settings className="w-5 h-5 text-amber-500" />
                            <h3 className="text-xl font-medium text-white">寸法指定</h3>
                        </div>

                        <div className="space-y-8">
                            {/* Diameter Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-zinc-300 font-medium tracking-wide">鏡の直径 (mm)</label>
                                    <span className="text-xl text-white font-light tracking-wider bg-zinc-950 px-3 py-1 rounded-md border border-zinc-800">
                                        {diameter}<span className="text-sm text-zinc-500 ml-1">mm</span>
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={MIN_DIAMETER}
                                    max={MAX_DIAMETER}
                                    value={diameter}
                                    onChange={(e) => setDiameter(Number(e.target.value))}
                                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                                <div className="flex justify-between text-xs text-zinc-500">
                                    <span>{MIN_DIAMETER}mm</span>
                                    <span>{MAX_DIAMETER}mm</span>
                                </div>
                            </div>

                            {/* Cut Distance Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-zinc-300 font-medium tracking-wide">端からの切断距離 (mm)</label>
                                    <span className="text-xl text-white font-light tracking-wider bg-zinc-950 px-3 py-1 rounded-md border border-zinc-800">
                                        {cutDistance}<span className="text-sm text-zinc-500 ml-1">mm</span>
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={MIN_CUT}
                                    max={diameter - MIN_CUT}
                                    value={cutDistance}
                                    onChange={(e) => setCutDistance(Number(e.target.value))}
                                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                                <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                                    数値が100に近いほど「少しだけ欠けた円」、{diameter / 2}を超えると「半分以上大きく欠けた形状」になります。（最低100mmの幅を残すように制限しています）
                                </p>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-6 p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3">
                                <Info className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-red-400 text-sm leading-relaxed">{error}</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Right: SVG Preview & Pricing */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        {/* SVG Visualizer */}
                        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center mb-10">
                            <div className="absolute inset-0 bg-zinc-900/20 rounded-full border border-zinc-800/50 border-dashed" />

                            <svg width="100%" height="100%" viewBox="0 0 400 400" className="drop-shadow-2xl z-10 overflow-visible transition-all duration-300 ease-out">
                                {/* Mirror Body */}
                                <path
                                    d={`
                    M ${200 + mappedCutLine} ${200 - yIntersect}
                    A 200 200 0 ${mappedCutLine >= 0 ? 1 : 0} 0 ${200 + mappedCutLine} ${200 + yIntersect}
                    Z
                  `}
                                    fill="url(#mirror-gradient)"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="2"
                                    className="transition-all duration-300 ease-out"
                                />

                                {/* The "Cut" line highlight */}
                                <line
                                    x1={200 + mappedCutLine}
                                    y1={200 - yIntersect}
                                    x2={200 + mappedCutLine}
                                    y2={200 + yIntersect}
                                    stroke="rgba(251,191,36,0.6)" // Amber
                                    strokeWidth="3"
                                    className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                />

                                <defs>
                                    <linearGradient id="mirror-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#cbd5e1" />
                                        <stop offset="50%" stopColor="#f8fafc" />
                                        <stop offset="50.1%" stopColor="#e2e8f0" />
                                        <stop offset="100%" stopColor="#94a3b8" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Dimensions overlay */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-zinc-500 font-mono tracking-wider">
                                Ø {diameter}mm
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
                            <div className="flex justify-between items-end mb-6 pb-6 border-b border-zinc-800">
                                <div>
                                    <p className="text-sm text-zinc-400 mb-1">お見積り金額 (税込)</p>
                                    <div className="text-4xl font-light text-white tracking-tight">
                                        {error ? "---" : `¥${price.toLocaleString()}`}
                                    </div>
                                </div>
                                <div className="text-right text-xs text-zinc-500 space-y-1">
                                    <p>加工費・縁研磨込</p>
                                    <p>梱包・配送費一律 ¥15,000</p>
                                </div>
                            </div>

                            <button
                                disabled={!!error}
                                className="w-full py-4 bg-amber-500 text-amber-950 font-medium rounded-xl hover:bg-amber-400 transition-colors duration-300 disabled:bg-zinc-800 disabled:text-zinc-600 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span>この仕様でカートに追加</span>
                            </button>

                            <p className="text-center text-xs text-zinc-500 mt-4 underline decoration-zinc-700 underline-offset-4 cursor-pointer hover:text-zinc-300">
                                5枚以上の大口発注・法人様はこちら
                            </p>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
