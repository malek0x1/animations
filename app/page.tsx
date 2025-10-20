import { ClientsCarousel } from "./components/client-carousel";
import { Header } from "./components/header";
import { HeroSection } from "./components/hero";
import { AnimatedHeadline } from "./components/hero-title";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-white z-10">
          <p className="text-sm md:text-base mb-2 md:mb-4 opacity-90">
            Welcome To TenTwenty Farms
          </p>
          <AnimatedHeadline
            text={`From Our Farms
To Your Hands`}
            className="text-4xl md:text-7xl font-bold leading-tight text-left"
            wordDelay={0.15}
            wordDuration={0.6}
          />
        </div>
      </HeroSection>
      <section className="pt-16 md:pt-24 px-6 bg-[#F8F8F8]">
        <div className="max-w-2xl mx-auto text-center md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Quality Products
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>
      <ClientsCarousel />
    </div>
  );
}
