"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home({ params }) {
  const [owner, setOwner] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const { userId } = React.use(params);
  const router = useRouter();
  useEffect(() => {
    const ownerDtails = sessionStorage.getItem("ownerDtails");
    if (ownerDtails) {
        setOwner(JSON.parse(ownerDtails)); // 세션에서 데이터 가져오기
    }
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // 로딩 상태 설정
    
    
    try {
      const response = await fetch(`http://localhost:8080/api/owners/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(owner), // owner 객체를 JSON으로 보내기
      });
      
      console.log(response);
      

      const updatedOwner = await response.json(); // 업데이트된 pet 정보를 가져옵니다.
      console.log(updatedOwner);
      
      setOwner(updatedOwner); // 상태 업데이트
      alert("Owner information updated successfully");
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
    setOwner((prevOwner) => ({
      ...prevOwner,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>owner edit</h1>
      {isError && <p style={{ color: "red" }}>{isError}</p>}
      {owner ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
            <label >First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={owner.firstName || ""}
                onChange={handleInputChange}
                className={"border p-2"}
              />
              <label>Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={owner.lastName || ""}
                onChange={handleInputChange}
                className={"border p-2"}
              />
               <label >Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={owner.address || ""}
                onChange={handleInputChange}
                className={"border p-2"}
              />
               <label >City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={owner.city || ""}
                onChange={handleInputChange}
                className={"border p-2"}
              />
            <label >Telephone</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={owner.telephone || ""}
                onChange={handleInputChange}
                className={"border p-2"}
              />
            </div>
            <div>
              <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer" type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Owner"}
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
