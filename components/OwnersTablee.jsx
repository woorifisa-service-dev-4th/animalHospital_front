"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OwnersTablee({ owners, totalPages, currentPage, lastName }) {
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const router = useRouter();
  const handleNext = () => {
    if (currentPageState < totalPages) {
      setCurrentPageState(currentPageState + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageState > 1) {
      setCurrentPageState(currentPageState - 1);
    }
  };
  const handleSearch = (param) => {
    console.log(param);
    
    router.push(`/api/owners/${param}`);
  };
  const itemsPerPage = 5;
  const startIndex = (currentPageState - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOwners = owners.slice(startIndex, endIndex);
  
  
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
          {displayedOwners.map(owner => (
            <tr key={owner.id}>
              <td onClick={() => handleSearch(owner.id)} className="border border-gray-300 px-4 py-2 cursor-pointer">{owner.firstName} {owner.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.address}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.city}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.telephone}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.pets.map(pet => pet.name).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={handlePrev} disabled={currentPageState === 1} className="bg-blue-500 text-white px-4 py-2 rounded">
          Previous
        </button>
        <span>{currentPageState} / {totalPages}</span>
        <button 
        onClick={handleNext} disabled={currentPageState === totalPages} 
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Next
        </button>
      </div>
      <div className="flex justify-center">
      <Link href={"/"} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer">Home</Link>
      </div>  
    </div>
  );
}
