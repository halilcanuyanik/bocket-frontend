import img from '@/assets/images/splash.png';
import logo from '@/assets/images/logo-bw-tr-lit.png';
import SearchBox from '@/components/ui/Searchbox';
import Button from '@/components/ui/Button';

function LandingPage() {
  return (
    <div className="w-full relative bg-black flex justify-center items-center">
      <img
        src={img}
        alt="splash-image"
        className="w-full h-auto opacity-70 lg:w-150 xl:w-200 2xl:w-240 blur-xs"
      />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_70%)] pointer-events-none"></div>
      <img
        src={logo}
        alt="logo"
        className="absolute bottom-0 right-0 h-12 m-4 sm:h-16 md:h-18 lg:h-21"
      />
      <div className="absolute w-full h-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-[800] sm:text-4xl md:text-5xl custom-selection">
          Your Next Vibe Awaits
        </h1>
        <SearchBox />
        <Button
          wrapperClass="absolute top-0 right-0 m-4"
          to="/login"
          children="Log In"
          size="sm"
        />
      </div>
    </div>
  );
}

export default LandingPage;
