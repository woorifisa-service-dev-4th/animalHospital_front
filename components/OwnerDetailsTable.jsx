// components/OwnersTable.jsx (클라이언트 컴포넌트)
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OwnerDetailsTable({ ownerDtails, userId }) {
  const router = useRouter();
  const handleEditChange = (petsId, pet) => {
    sessionStorage.setItem("selectedPet", JSON.stringify(pet));
    router.push(`/api/owners/${userId}/pets/${petsId}/edit`);  //pet 수정
  };

  const handleEditUserChange = () =>{
    sessionStorage.setItem("ownerDtails", JSON.stringify(ownerDtails));
    console.log(ownerDtails);
    
    router.push(`/api/owners/${userId}/edit`);
  }
  const handleAddPetChange = () =>{
    router.push(`/api/owners/${userId}/pets`);
  }

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
            <tr key={ownerDtails.id}>
              <td className="border border-gray-300 px-4 py-2">{ownerDtails.firstName} {ownerDtails.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{ownerDtails.address}</td>
              <td className="border border-gray-300 px-4 py-2">{ownerDtails.city}</td>
              <td className="border border-gray-300 px-4 py-2">{ownerDtails.telephone}</td>
              <td className="border border-gray-300 px-4 py-2">{ownerDtails.pets.map(pet => pet.name).join(", ")}</td>
            </tr>
        </tbody>
        
      </table>
      <div className="flex">
        <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer" onClick={()=>handleEditUserChange()}>Edit Owner</button>
        <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer ml-5" onClick={()=>handleAddPetChange()}>Add New Pet</button>
        
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">BirthDate</th>
            <th className="border border-gray-300 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {ownerDtails.pets.map((pet) => (
            <tr key={pet.id}>
              <td className="border border-gray-300 px-4 py-2">{pet.name}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.type}</td>
              <td className="border border-gray-300 px-4 py-2">{pet.birthDate}</td>
              <td className="border border-gray-300 px-4 py-2"><button key={pet.id}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          onClick={() => handleEditChange(pet.id,pet)}
        >
          edit
        </button></td>
             
            </tr>
          ))}
        </tbody>
        
      </table>
      <div className="flex justify-center">
      <Link href={"/"} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer">Home</Link>
      </div>    
    </div>
    
  );
}
