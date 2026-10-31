import Link from "next/link";


const UserInfo = () => {
    
    return (
        <div className="flex gap-2">
           <Link href="/sign-in" className="inline-flex items-center gap-2 rounded-full bg-[#315b45] px-4 py-2 text-md font-bold text-white shadow-sm transition hover:bg-[#254936] hover:shadow-md">
            Sign in
          </Link>
           <Link href="/sign-up" className="inline-flex items-center gap-2 rounded-full bg-[#315b45] px-4 py-2 text-md font-bold text-white shadow-sm transition hover:bg-[#254936] hover:shadow-md">
            Sign up
          </Link>
        </div>
    );
};

export default UserInfo;