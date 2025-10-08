import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import ServicesSection from "../components/ServicesSection";
import ProjectsSection from "../components/ProjectsSection";
import YearsOfExperienceSection from "../components/YearsOfExperienceSection";
import TeamSection from "../components/TeamSection";
import BoardMembersSection from "../components/BoardMembersSection";
import GetMoreWithUsSection from "../components/GetMoreWithUsSection";
import PublicationsSection from "../components/PublicationsSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <ServicesSection />
      <ProjectsSection />
      <YearsOfExperienceSection />
      <TeamSection />
      <BoardMembersSection />
      <GetMoreWithUsSection />
      <PublicationsSection />
      <Footer />
    </main>
  );
}
