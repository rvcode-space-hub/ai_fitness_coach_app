import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-black">
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="/fit-individual-doing-sport.jpg"
                    alt="Fitness Hero Background"
                    fill               // 🔥 Next.js way for full background image
                    priority           // Faster loading for hero section
                    className="object-cover object-center  brightness-75 oppacity-90"
                />
            </div>
            {/* TEXT OVER IMAGE */}
            <div className="relative z-10 text-left max-w-3xl px-6">

                <span className="inline-block mb-4 text-lg font-bold text-orange-400">
                    WELCOME TO AI FITNESS COACH
                </span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-extrabold text-white drop-shadow-xl">
                    UNLOCK YOUR STRONGEST SELF<br /> WITH AI-POWERED TRAINING
                </h1>

                <p className="mt-6 text-lg text-white/85 max-w-xl drop-shadow-lg">
                    Experience personalized workouts, smart nutrition insights, and real-time coaching — powered by advanced AI built to maximize your results.
                </p>

                <div className="mt-8 flex items-center gap-6">
                    <Link
                        href="#get-started"
                        className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold shadow-md    my-2 transition"
                    >
                        GET STARTED
                    </Link>

                </div>

            </div>

            {/* DARK GRADIENT OVERLAY (optional stronger effect) */}
            <div className="absolute inset-0 bg-black/30"></div>
        </section>
    )
}
