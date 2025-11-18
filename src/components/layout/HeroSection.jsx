import img from '@/assets/images/splash.png';
import logo from '@/assets/images/logo-tr-lit.png';
import Button from '@/components/ui/Button';

function HeroSection() {
  return (
    <div className="relative w-full max-w-[100vw] bg-black flex justify-center items-center overflow-hidden">
      <div className="w-full overflow-hidden 2xl:h-[600px] relative">
        <img
          src={img}
          alt="splash-image"
          className="w-full h-full opacity-70 blur-xs object-cover object-center"
        />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_70%)] pointer-events-none"></div>
      </div>

      <div className="absolute flex flex-col px-12 gap-4">
        <h2 className="font-bold">Unleash the Night. Your Stage Awaits.</h2>

        <p className="text-white font-semibold">
          <span className="font-extrabold">
            Don't just see the show, live it.
          </span>{' '}
          Get the real scoop with verified ratings and lock in your tickets
          before they vanish.
        </p>

        <Button
          size="sm"
          children="Log In"
          to="/login"
          wrapperClass="rounded-lg self-start"
        />
      </div>

      <img
        src={logo}
        alt="logo"
        className="absolute bottom-6 right-12 w-16 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] sm:w-20 sm:right-18 sm:bottom-9 md:w-24 md:right-20 md:bottom-10 lg:w-28 lg:right:24 lg:bottom-12"
      />
    </div>
  );
}

export default HeroSection;
