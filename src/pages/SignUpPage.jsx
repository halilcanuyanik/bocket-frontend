import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/features/Auth/api/authService';
import logo from '@/assets/images/logo-tr-lit.png';
import Button from '@/components/ui/Button';
import useSnackbar from '@/hooks/useSnackbar';
import Snackbar from '@/components/common/Snackbar';

import nameIcon from '@/assets/icons/name.svg';
import emailIcon from '@/assets/icons/email.svg';
import passwordIcon from '@/assets/icons/password.svg';

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
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
      const response = await signup(formData);

      showSnackbar('Signed Up Successfully!', 'success');

      const role = localStorage.getItem('role');

      if (role === 'admin') setTimeout(() => navigate('/admin'), 1500);
      else if (role === 'user') setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      showSnackbar(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const inputs = [
    { id: 'name', placeholder: 'Name', type: 'text' },
    { id: 'email', placeholder: 'Email', type: 'email' },
    { id: 'password', placeholder: 'Password', type: 'password' },
    {
      id: 'passwordConfirm',
      placeholder: 'Confirm Password',
      type: 'password',
    },
  ];

  const iconMap = {
    name: nameIcon,
    email: emailIcon,
    password: passwordIcon,
    passwordConfirm: passwordIcon,
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center px-6 py-12 lg:px-8 custom-selection">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo} alt="logo" className="mx-auto h-32 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {inputs.map(({ id, placeholder, type }) => {
            return (
              <div key={id} className="relative">
                <img
                  src={iconMap[id]}
                  alt=""
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-80"
                />
                <input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  required
                  value={formData[id]}
                  onChange={handleChange}
                  className="block w-full rounded-lg pl-10 pr-4 py-2.5 text-base text-white outline-3 -outline-offset-3 outline-white/10 placeholder:text-white/80 caret-white/80 focus:outline-3 focus:-outline-offset-3 focus:outline-royal-blue sm:text-sm/6"
                />
              </div>
            );
          })}

          <div className="flex justify-center">
            <Button
              wrapperClass="rounded-md"
              size="lg"
              children="Sign Up"
              disabled={isLoading}
              loading={isLoading}
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already have an account?
          <a
            href="/login"
            className="mx-2 font-semibold text-lively-orange hover:text-lively-orange/80"
          >
            Log In
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

export default SignUpPage;
