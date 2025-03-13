import FindOnwer from "@/components/FindOnwer"
import Link from "next/link";
export default function Home() {
    return (
      <div>
        <FindOnwer />
        <Link href={`/api/owners/new`} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer">Add Owner</Link>
      </div>
    );
  }
  