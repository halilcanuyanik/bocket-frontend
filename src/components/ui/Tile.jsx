import { formatCurrency } from '../../utils/currencyFormatter';
import Button from '@/components/ui/Button';

function Tile({ day, hour, venueName, address, price, currency, onClick }) {
  return (
    <>
      <div
        className="h-24 py-2 px-6 grid grid-cols-[30%_40%_30%] grid-rows-[1fr_1fr] gap-x-4 items-center whitespace-nowrap rounded-xl overflow-hidden transition hover:border-gray-100 hover:border-inset-[0.5px] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_-4px_6px_-1px_rgba(0,0,0,0.05)] cursor-pointer"
        onClick={onClick}
      >
        <span className="col-start-1 col-span-1 row-start-1 row-span-1">
          <b>{day}</b>
        </span>
        <span className="col-start-2 col-span-1 row-start-1 row-span-1 truncate">
          <b>{venueName}</b>
        </span>
        <span className="col-start-1 col-span-1 row-start-2 row-span-1 ">
          {hour}
        </span>
        <span className="col-start-2 col-span-1 row-start-2 row-span-1 truncate">
          {address}
        </span>
        <Button
          wrapperClass="col-start-3 col-span-1 row-start-1 row-span-2 justify-self-center rounded-lg"
          size="sm"
        >
          Buy {formatCurrency(currency)}
          {price}
        </Button>
      </div>
    </>
  );
}

export default Tile;
