"use client";
import Loader from "@/components/Loder.jsx";
import { useEffect, useState } from "react";

function page() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        const allTasks = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/etherum/view-all-task",{
                    method : "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data1 = await res.json();
                // console.log(data1)
                if(data1.status == 200){
                    console.log(data1.TaskList);
                    setdata(data1.TaskList);
                }
            } catch (error) {
                console.log(error)
            }
        }
        allTasks();
        // console.log(data)
    },[])

  return (
    <div className="flex  flex-col justify-center items-center bg-zinc-900 h-screen">

        {
            data.length > 0 ? 
            <div className="flex flex-col"> 
            <div className="flex font-bold text-white p-2">
                <div className="w-[50px]">Id</div>
                <div className="w-[300px]">Name</div>
                <div className="w-[300px]">Date</div>
            </div>
            {

            data?.map((tasks , i) => (
                <div key={i}  className="flex  border rounded-sm my-2 p-2 text-green-500">
                    <div className="w-[50px]">{tasks.id}</div>
                    <div className="w-[300px]">{tasks.name}</div>
                    <div className="w-[300px]">{tasks.date}</div>
                </div>
            ))
        }

            </div> : 
            <Loader />
        } 
    </div>
  )
}

export default page