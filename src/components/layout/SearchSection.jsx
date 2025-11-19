import SearchBox from '@/components/ui/SearchBox';

export default function SearchSection() {
  return (
    <section className="relative w-screen max-h-128 p-6 flex flex-col gap-4 items-center">
      <p className="text-md font-semibold text-gray-300">SEARCH</p>
      <SearchBox />
    </section>
  );
}
