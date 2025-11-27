import { useState } from 'react';
import Search from '@/components/common/Search';

export default function PerformersPage() {
  const [performers, setPerformers] = useState([]);

  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col items-center p-6">
      <Search
        endpoint={`/performers`}
        onSuggestionsChange={setPerformers}
        placeholder="Performers..."
      />
    </section>
  );
}
