"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OwnerForm = ({params}) => {
    const router = useRouter();
    const { userId } = React.use(params);
    const onSubmit = async (formData) => {
        try {
          const response = await fetch(`http://localhost:8080/api/owners/${userId}/pets`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // pet 객체를 JSON으로 보내기
          });
          
          const addedOwner = await response.json(); // 업데이트된 pet 정보를 가져옵니다.
          console.log(addedOwner);
          
          alert("Pet information added successfully");
          
        } catch (error) {
          console.error(error);
        } finally {
            router.push(`/api/owners/${userId}`);
        }
      };
  const [formData, setFormData] = useState({
    name:  "",
    type:  "",
    birthDate:  "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 폼 검증 로직 추가 가능
    onSubmit(formData);
    
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label >Add Pet</label>
        <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={"border p-2"}
              />
        <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={"border p-2"}
              />
        <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={"border p-2"}
              >
                <option value="">Select Pet Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
              </select>
        

       
      </div>

      <div>
        <div >
          <button type="submit" className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer">
          Add Pet
          </button>
        </div>
      </div>
      <div className="flex justify-center">
      <Link href={"/"} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer">Home</Link>
      </div>  
    </form>
    
  );
};

export default OwnerForm;
