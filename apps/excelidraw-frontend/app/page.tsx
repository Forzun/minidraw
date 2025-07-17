import MiniHero from "@/components/miniHero";
import ShootingStar from "@/components/shootingStarButton";
import TopNav from "@/components/topNav";

export default function Home() {
  return (
    <div className="md:flex items-center justify-center min-h-screen h-full container-wrapper mask-x-from-60% mask-x-to-90% ">
      <div className="flex flex-col items-center justify-center ">
        <TopNav />
        <ShootingStar />
        <MiniHero />
      </div>
    </div>
  );
}
