import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import Ticker from "@/components/Ticker";
import Publication from "@/components/Publication";
import PublicationsTable from "@/components/PublicationsTable";
import Footer from "@/components/Footer";
import FramerBadge from "@/components/FramerBadge";

export default function Home() {
  return (
    <main className="relative bg-paper">
      <Header />
      <Hero />
      <Intro />
      <Projects />
      <Ticker />
      <Publication />
      <PublicationsTable />
      <Footer />
      <FramerBadge />
    </main>
  );
}
