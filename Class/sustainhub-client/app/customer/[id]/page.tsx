'use client';
import { useRouter } from "next/router";

const CustomerPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return(
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <p>Customer Page: {id}</p>
        </div>
    );
}

export default CustomerPage;