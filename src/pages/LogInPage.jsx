import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { login } from '@/features/Auth/api/authService';
import logo from '@/assets/images/logo-tr-lit.png';
import Button from '@/components/ui/Button';

function LogInPage() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const data = await login(formData);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] bg-gray-900 flex flex-col justify-center px-6 py-12 lg:px-8 custom-selection">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo} alt="Bocket logo" className="mx-auto h-32 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-white"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/forgotPassword"
                  className="font-semibold text-coral-red hover:text-coral-red/80"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo sm:text-sm/6"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              wrapperClass="rounded-md"
              size="lg"
              children={isLoading ? 'Logging In...' : 'Log In'}
              disabled={isLoading}
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already have an account?
          <a
            href="/signup"
            className="mx-2 font-semibold text-lively-orange hover:text-lively-orange/80"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LogInPage;
