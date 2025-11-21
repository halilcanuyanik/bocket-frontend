import img from '@/assets/images/splash.png';
import logo from '@/assets/images/logo-tr-lit.png';
import Button from '@/components/ui/Button';

function HeroSection() {
  return (
    <div className="relative w-full max-w-screen bg-black flex justify-center items-center overflow-hidden">
      <div className="w-full overflow-hidden lg:h-[600px] relative">
        <img
          src={img}
          alt="splash-image"
          className="w-full h-full opacity-70 blur-xs object-cover object-center"
        />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_70%)] pointer-events-none"></div>
      </div>

      <div className="absolute flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 lg:flex-row">
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="w-24 sm:w-36 md:w-48 lg:w-56 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] "
          />
        </div>
        <div className="flex flex-col justify-center px-12 sm:px-16 md:px-20 lg:px-0 gap-4 sm:text-xl sm:leading-8 md:text-2xl lg:text-3xl lg:w-172 lg:leading-10">
          <h2 className="font-extrabold ">
            Unleash the Night. Your Stage Awaits.
          </h2>

          <p className="text-white">
            <span className="font-bold">Don't just see the show, live it.</span>{' '}
            Get the real scoop with verified ratings and lock in your tickets
            before they vanish.
          </p>

          <Button
            size="responsive"
            children="Log In"
            to="/login"
            wrapperClass="rounded-lg self-start"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
