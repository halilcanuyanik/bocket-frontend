import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/features/Auth/api/authService';
import logo from '@/assets/images/logo-tr-lit.png';
import Button from '@/components/ui/Button';
import useSnackbar from '@/hooks/useSnackbar';
import Snackbar from '@/components/common/Snackbar';

function LogInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await login(formData);
      showSnackbar('Logged in successfully!', 'success');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      showSnackbar(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const inputs = [
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
  ];

  return (
    <div className="h-[100vh] bg-gray-900 flex flex-col justify-center px-6 py-12 lg:px-8 custom-selection">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo} alt="logo" className="mx-auto h-32 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {inputs.map(({ id, label, type }) => {
            return (
              <div key={id}>
                <label className="block text-sm font-medium text-white">
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  required
                  value={formData[id]}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo sm:text-sm/6"
                />
              </div>
            );
          })}
          <div className="flex justify-center">
            <Button
              wrapperClass="rounded-md"
              size="lg"
              children="Log In"
              disabled={isLoading}
              loading={isLoading}
              onClick={handleSubmit}
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Don't have an account?
          <a
            href="/signup"
            className="mx-2 font-semibold text-lively-orange hover:text-lively-orange/80"
          >
            Sign Up
          </a>
        </p>
      </div>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={closeSnackbar}
      />
    </div>
  );
}

export default LogInPage;
