import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* Navbar */}
      <DashboardHeader />

      {/* Add padding-top so Hero is not hidden behind fixed navbar */}
      <div className="pt-20">
        <Hero />
      </div>

      {/* Footer */}
      <Footer />

    </main>
  );
}
