'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home=()=> {
  const router = useRouter();
  useEffect(() => {
    async function route() {
        router.push("./home");
    }
    route();
}, []);
  
}

export default Home;