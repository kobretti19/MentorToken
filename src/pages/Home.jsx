import CompanyLogos from "../components/homecomponents/CompanyLogos";
import Features from "../components/homecomponents/Features";
import LaptopDetail from "../components/homecomponents/LaptopDetail";
import Screenshoot from "../components/homecomponents/Screenshoot";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-10  space-y-6">
      <LaptopDetail />
      <CompanyLogos />
      <div className="flex flex-col items-center justify-center">
        <p>More than 25+ Startups around the </p>
        <p>world trusted Mentor Token.</p>
      </div>
      <Features />
      <Screenshoot />
    </div>
  );
}
