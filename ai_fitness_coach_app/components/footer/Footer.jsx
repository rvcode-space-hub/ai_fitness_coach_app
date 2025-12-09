import React from 'react';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      
      {/* Orange Glass Gradient + Blur Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(10,90,180,0.3), rgba(0,0,0,0.9))",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)"
        }}
      />

      {/* Actual content */}
      <div className="relative z-10 text-gray-200">
        <div className="max-w-7xl mx-auto px-5 py-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-8 h-8 text-orange-500" />
                <h3 className="text-2xl font-bold text-white">AI FITNESS COACH</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Transform your fitness. Transform your <br /> life — with AI.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/workout-plans" className="hover:text-orange-400 transition">Workout Plans</Link></li>
                <li><Link href="/nutrition" className="hover:text-orange-400 transition">Nutrition Guide</Link></li>
                <li><Link href="/tracker" className="hover:text-orange-400 transition">Progress Tracker</Link></li>
                <li><Link href="/exercises" className="hover:text-orange-400 transition">Exercise Library</Link></li>
                <li><Link href="/community" className="hover:text-orange-400 transition">Community</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-orange-400 transition">Help Center</Link></li>
                <li><Link href="/faqs" className="hover:text-orange-400 transition">FAQs</Link></li>
                <li><Link href="/privacy" className="hover:text-orange-400 transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-orange-400 transition">Terms of Service</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-300">© 2025 FitCoach AI. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/cookies" className="hover:text-orange-400 transition">Cookie Policy</Link>
              <Link href="/sitemap" className="hover:text-orange-400 transition">Sitemap</Link>
              <Link href="/accessibility" className="hover:text-orange-400 transition">Accessibility</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
