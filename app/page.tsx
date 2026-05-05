import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { Usps } from "@/components/sections/usps";
import { FabricBreak } from "@/components/sections/fabric-break";
import { PackOfFour } from "@/components/sections/pack-of-4";
import { Lifestyle } from "@/components/sections/lifestyle";
import { Antibact } from "@/components/sections/antibact";
import { VsCotton } from "@/components/sections/vs-cotton";
import { Gift } from "@/components/sections/gift";
import { Faq } from "@/components/sections/faq";
import { CtaStrip } from "@/components/sections/cta-strip";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex-1 relative z-10">
        <Hero />
        <MarqueeStrip />
        <Usps />
        <FabricBreak
          image="/assets/lifestyle/L1_gym_man.png"
          alt="POLOTENCE на шее в зале — макро текстура микрофибры"
          text="Один цикл. Никакого запаха."
          subtext="Плотное переплетение микрофибры. Без сертификатов и серебра — просто структура волокна."
        />
        <PackOfFour />
        <Lifestyle />
        <Antibact />
        <VsCotton />
        <FabricBreak
          image="/assets/main_photo/main_C_bag_hero_with_towel.png"
          alt="POLOTENCE pack — упаковка с 4 свёрнутыми полотенцами"
          text="Premium-комплект. В подарок."
          subtext="4 шт в брендированном zip-bag. Каждое со своей резинкой и логотипом."
        />
        <Gift />
        <Faq />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
