// import OwnersTable from "@/components/OwnersTable";

// async function fetchOwners(page = 1, size = 5, lastName = "") {
//     const res = await fetch(
//       `http://localhost:8080/api/owners?page=${page}&size=${size}&lastName=${encodeURIComponent(lastName)}`,
//       { cache: "no-store" }
//     );
//     if (!res.ok) throw new Error("Failed to fetch owners");
//     return res.json();
//   }

//   export default async function OwnersPage({ searchParams }) {
//     const page = await searchParams?.page ? Number(searchParams.page) : 1;
//     const lastName = await searchParams?.lastName || "";
//     console.log(page);
//     const data = await fetchOwners(page, 5, lastName);
  
//     return <OwnersTable owners={data.content} totalPages={data.totalPages} currentPage={page} lastName={lastName} />;
//   }

import OwnersTablee from "@/components/OwnersTablee";

async function fetchOwners(lastName = "") {
    const res = await fetch(
      `http://localhost:8080/api/owners?size=100&lastName=${encodeURIComponent(lastName)}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch owners");
    const dd = await res.json();
    console.log(dd.content);
    
    return dd;
}

export default async function OwnersPage({ searchParams }) {
    const lastName = await searchParams?.lastName || "";
    const data = await fetchOwners(lastName);
    const page = 1;  // 초기 페이지는 1로 설정
    console.log(Math.ceil(data.content.length / 5));
    
    return <OwnersTablee owners={data.content} totalPages={Math.ceil(data.content.length / 5)} currentPage={page} lastName={lastName} />;
}