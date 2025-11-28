// LOGO & ICONS
import venueIcon from '@/assets/icons/venue.svg';
import addressIcon from '@/assets/icons/address.svg';
import locationIcon from '@/assets/icons/location.svg';
import capacityIcon from '@/assets/icons/capacity.svg';

export default function VenueInfoBar({ venue }) {
  return (
    <div className="h-16 flex items-center justify-between z-50">
      <div className="flex items-center gap-4 pl-4 mr-4">
        <span className="flex gap-2">
          <img src={venueIcon} alt="" />
          {venue.name}
        </span>

        <span className="flex gap-2">
          <img src={addressIcon} alt="" />
          {venue.address}
        </span>

        <span className="flex gap-2">
          <img src={locationIcon} alt="" />
          {venue.city}, {venue.country}
        </span>

        <span className="flex gap-2">
          <img src={capacityIcon} alt="" />
          {venue.capacity}
        </span>
      </div>
    </div>
  );
}
