// components/OwnersTable.jsx (클라이언트 컴포넌트)
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OwnersTable({ owners, totalPages, currentPage, lastName }) {
  const router = useRouter();
  const [searchLastName, setSearchLastName] = useState(lastName);

  const handlePageChange = (newPage) => {
    router.push(`/api/owners?page=${newPage}&lastName=${encodeURIComponent(searchLastName)}`);
  };

  const handleSearch = (param) => {
    console.log(param);
    
    router.push(`/api/owners/${param}`);
  };

  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">Telephone</th>
            <th className="border border-gray-300 px-4 py-2">Pets</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.id}>
              <td onClick={() => handleSearch(owner.id)} className="border border-gray-300 px-4 py-2 cursor-pointer">{owner.firstName}  {owner.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.address}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.city}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.telephone}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.pets.map(pet => pet.name).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div >
      <div className="flex justify-center">
      <Link href={"/"} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer">Home</Link>
      </div>  
    </div>
  );
}
