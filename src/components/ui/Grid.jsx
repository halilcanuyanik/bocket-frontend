import { useNavigate } from 'react-router-dom';
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';
import capacityIcon from '@/assets/icons/capacity.svg';

function Grid({ id, name, address, city, country, capacity }) {
  const navigate = useNavigate();

  const features = [
    { icon: venueIcon, label: name },
    { icon: addressIcon, label: address },
    { icon: locationIcon, label: `${city}, ${country}` },
    { icon: capacityIcon, label: capacity },
  ];

  return (
    <div
      tabIndex={0}
      className="
        h-48 w-48 p-3 bg-white rounded-lg shadow-sm 
        flex flex-col justify-between text-xs
        relative group outline-none
      "
    >
      <div className="flex flex-col gap-2">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <img src={f.icon} className="w-4 h-4" />
            <span className="truncate">{f.label}</span>
          </div>
        ))}
      </div>

      <button
        className="
          absolute bottom-2 right-2 px-3 py-1 rounded-md 
          text-white bg-black text-[10px]
          opacity-0 group-hover:opacity-100 group-focus:opacity-100
          transition-opacity cursor-pointer
        "
        onClick={() => navigate(`/admin/venues/${id}`)}
      >
        Edit
      </button>
    </div>
  );
}

export default Grid;
