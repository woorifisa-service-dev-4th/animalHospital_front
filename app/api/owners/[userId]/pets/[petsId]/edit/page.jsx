"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PetDetailPage({ params }) {
  const [pet, setPet] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const { userId, petsId } = React.use(params);
  const router = useRouter();
  useEffect(() => {
    console.log("11");
    const storedPet = sessionStorage.getItem("selectedPet");
    const storedUserName = sessionStorage.getItem("userName");
    if (storedPet) {
      setPet(JSON.parse(storedPet)); // 세션에서 데이터 가져오기
    }
    if (storedUserName) {
      setUserName(storedUserName); // 유저 이름도 세션에서 가져오기
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // 로딩 상태 설정
    
    
    try {
      const response = await fetch(`http://localhost:8080/api/owners/${userId}/pets/${petsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet), // pet 객체를 JSON으로 보내기
      });
      
      console.log(response);
      

      const updatedPet = await response.json(); // 업데이트된 pet 정보를 가져옵니다.
      console.log(updatedPet);
      
      setPet(updatedPet); // 상태 업데이트
      alert("Pet information updated successfully");
      router.push(`/api/owners/${userId}`);
      
    } catch (error) {
      setIsError(error.message); // 에러 처리
      console.error(error);
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Pet details</h1>
      {isError && <p style={{ color: "red" }}>{isError}</p>}
      {pet ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={pet.name || ""}
                onChange={handleInputChange}
                placeholder="Enter Pet Name"
                className={"border p-2"}
              />
         
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={pet.birthDate || ""}
                onChange={handleInputChange}
                className={"border p-2"}
              />
           
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={pet.type || ""}
                onChange={handleInputChange}
                className={"border p-2"}
              >
                <option value="">Select Pet Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
              </select>
            </div>

            <div>
              <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer" type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Pet"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex justify-center">
      <Link href={"/"} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer">Home</Link>
      </div>  
    </div>
  );
}
