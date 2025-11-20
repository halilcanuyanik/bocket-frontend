import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/venues');
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button onClick={() => handleClick()} className="p-2 bg-black text-white">
        Venues
      </button>
    </div>
  );
}

export default AdminPage;
