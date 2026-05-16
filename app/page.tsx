import { BuildingCompeting } from "@/components/BuildingCompeting";
import { Canopy } from "@/components/Canopy";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Modera } from "@/components/Modera";
import { Nav } from "@/components/Nav";
import { Research } from "@/components/Research";
import { StatsRow } from "@/components/StatsRow";
import { Truckside } from "@/components/Truckside";

/**
 * Single long-scroll editorial page. Section order is deliberate: Modera leads
 * the Work section, Canopy gets the most real estate, Truckside closes it.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsRow />
        <Modera />
        <Canopy />
        <Truckside />
        <Research />
        <Education />
        <BuildingCompeting />
      </main>
      <Footer />
    </>
  );
}
