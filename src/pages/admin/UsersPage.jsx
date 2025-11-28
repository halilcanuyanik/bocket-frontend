// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Search from '@/components/common/Search';

const roleColors = {
  admin: 'bg-lively-orange',
  user: 'bg-black',
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  return (
    <section className="w-screen min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full h-24 flex justify-between items-center px-4">
        <h1 className="text-black font-bold text-4xl">Users</h1>
        <Search
          endpoint={`/users`}
          onSuggestionsChange={setUsers}
          placeholder="Users..."
        />
      </div>

      <div className="w-full h-16 px-4 grid grid-cols-4 items-center border-b-1 border-gray-300 font-bold">
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
      </div>

      {users.map((u) => {
        return (
          <div className="group w-full h-16 mt-4 rounded-md grid grid-cols-4 items-center px-4 hover:bg-gray-50 hover:shadow-sm transition-all ease-linear cursor-pointer truncate">
            <span>{u.name}</span>
            <span>{u.email}</span>
            <span className="flex gap-2">
              <div
                className={`w-6 h-6 rounded-full ${roleColors[`${u.role}`]}`}
              ></div>
              {u.role}
            </span>
            <button className="w-12 h-8 text-black font-extrabold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              ...
            </button>
          </div>
        );
      })}
    </section>
  );
}
