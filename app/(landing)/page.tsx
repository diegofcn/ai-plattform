import { LandingNavbar } from "@/components/Landing-Navbar";
import { LandingHero } from "@/components/Landing-Hero";
import { LandingContent } from "@/components/Landing-Content";

const LandingPage = () => {
  return ( 
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
   );
}
 
export default LandingPage;