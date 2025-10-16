import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <main className="grid h-[100vh] place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold text-coral-red custom-selection">
          404
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl custom-selection">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8 custom-selection">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md cursor-pointer bg-coral-red px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-flame-red/80 custom-selection"
            onClick={handleClick}
          >
            Go back home
          </button>
          <a
            href="#"
            className="text-sm font-semibold text-white custom-selection"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
