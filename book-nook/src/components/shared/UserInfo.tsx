import Link from "next/link";


const UserInfo = () => {
    
    return (
        <div>
           <Link href="/add-book" className="inline-flex items-center gap-2 rounded-full bg-[#315b45] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#254936] hover:shadow-md">
            Sign in
          </Link>
        </div>
    );
};

export default UserInfo;