import img from '@/assets/images/splash-wo.png';
import logo from '@/assets/images/bocket-bw-wo-bg-lit.png';
import SearchBox from '@/components/ui/Searchbox';
import Button from '@/components/ui/Button';

function SplashScreen() {
  return (
    <div className="w-full relative bg-black flex justify-center items-center">
      <img
        src={img}
        alt="splash-image"
        className="w-full h-auto opacity-70 lg:w-150 xl:w-200 2xl:w-240 blur-xs"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-100 pointer-events-none"></div>
      <img
        src={logo}
        alt="logo"
        className="absolute bottom-0 right-0 h-12 mx-10 my-4 sm:h-16 md:h-18 lg:h-21"
      />
      <div className="absolute w-full h-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-bright-orange font-[800] sm:text-4xl md:text-5xl">
          Your Next Vibe Awaits
        </h1>
        <SearchBox />
        <Button />
      </div>
    </div>
  );
}

export default SplashScreen;
