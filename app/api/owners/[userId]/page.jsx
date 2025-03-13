import OwnerDetailsTable from "@/components/OwnerDetailsTable";

async function fetchOwnerDetails(id) {
    const res = await fetch(
      `http://localhost:8080/api/owners/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch owners");
    return res.json();
  }

  export default async function OwnersPage({ params }) {
    const {userId} = await params;
    console.log(userId);
    
    const data  = await fetchOwnerDetails(userId);
    return <OwnerDetailsTable ownerDtails={data} userId={userId}/>;
  }