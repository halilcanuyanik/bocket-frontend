import { useNavigate } from "react-router-dom";

function Button() {
  const navigate = useNavigate();

  const handleSignClick = () => {
    navigate("/signin");
  };

  return (
    <button
      className="absolute top-0 right-0 text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-deep-blue via-purple to-electric-blue my-4 mx-8 cursor-pointer sm:text-2xl md:text-3xl items-center hover:border-b-2 hover:border-bright-orange transition-all ease-linear"
      onClick={handleSignClick}
    >
      Sign In
    </button>
  );
}

export default Button;
