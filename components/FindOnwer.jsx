"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
export default function FindOnwer() {
const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
const handleSubmit = (e) =>{
    e.preventDefault(); // 기본 폼 제출 방지
    router.push(`/api/owners?lastName=${encodeURIComponent(lastName)}`);
}
//   const handleSubmit = (e) => {
//     e.preventDefault();  // 기본 폼 제출 방지 (페이지 리로드 방지)
//     router.push(`/owners?lastName=${encodeURIComponent(lastName)}`);
//     // 유효성 검사 통과 시 URL로 이동
// };

    return (
        <div>
        <form onSubmit={handleSubmit} className="form-horizontal" id="search-owner-form">
           
                    <label className="">Last name</label>
                    <div className="">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} // 입력값 업데이트
                            className={"border p-2"}
                        />
                        {errorMessage && <span className="help-inline text-danger">{errorMessage}</span>}
                    </div>

         

            
                    <button type="submit" className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer my-3" onClick={handleSubmit}>
                        find user
                    </button>
         
        </form>
        
    </div>
    );
  }
  