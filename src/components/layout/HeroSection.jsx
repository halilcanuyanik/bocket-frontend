import img from '@/assets/images/splash.png';
import logo from '@/assets/images/logo-bw-tr-lit.png';
import SearchBox from '@/components/ui/Searchbox';

function HeroSection() {
  return (
    <div className="w-full max-w-[100vw] relative bg-black flex justify-center items-center overflow-hidden">
      <div className="w-full overflow-hidden 2xl:h-[600px] relative">
        <img
          src={img}
          alt="splash-image"
          className="w-full h-full opacity-70 blur-xs object-cover object-center"
        />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_70%)] pointer-events-none"></div>
      </div>

      <img
        src={logo}
        alt="logo"
        className="absolute bottom-6 right-12 h-12 sm:h-16 md:h-18 lg:h-21"
      />

      <div className="absolute w-full h-full flex flex-col justify-center items-center gap-6 px-4">
        <h1 className="text-3xl font-[800] sm:text-4xl md:text-5xl custom-selection text-center">
          Your Next Vibe Awaits
        </h1>
        <SearchBox />
      </div>
    </div>
  );
}

export default HeroSection;
