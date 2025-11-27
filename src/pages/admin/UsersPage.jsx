import { useState } from 'react';
import Search from '@/components/common/Search';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  return (
    <section className="w-screen flex-1 bg-gray-100 flex flex-col items-center p-6">
      <Search
        endpoint={`/users`}
        onSuggestionsChange={setUsers}
        placeholder="Users..."
      />
    </section>
  );
}
