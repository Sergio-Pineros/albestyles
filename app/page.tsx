import { About } from "@/components/About";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { Reviews } from "@/components/Reviews";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Services } from "@/components/Services";
import { Ticker } from "@/components/Ticker";
import { Visit } from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        <Intro />
        <Services />
        <Gallery />
        <About />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
