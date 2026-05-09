"use client";

import { motion } from "framer-motion";

export default function AnimatedBrand() {
    return (
        <div className="relative inline-block">
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 18, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1 }}
                className="relative"
            >
                <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-[-0.05em]">
                    <span className="brand-text relative z-10">
                        Arilla Soft
                    </span>

                    {/* shadow layer */}
                    <span className="absolute inset-0 text-slate-900/5 blur-sm translate-x-[1px] translate-y-[1px]">
                        Arilla Soft
                    </span>
                </h1>


                <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-full bg-violet-500/10 blur-3xl" />
            </motion.div>
        </div>
    );
}