"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useState } from "react";
import Loader from "@/components/Loder.jsx";




function page() {

    const [load, setload] = useState(false);
    const [task, settask] = useState('');

    const HandelSubmit = async (event) => {
        try {
            event.preventDefault();
            setload(true);
            const taskId = document.querySelector("#taskId").value;
            const res = await fetch(`http://localhost:3001/api/etherum/view-task/${taskId}` ,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            if(data.status === 200){
                settask(data.taskObj);
            }
            setload(false);
        } catch (error) {
            console.log(error);
            setload(false);
        }
    }
  return (
    <div className="flex flex-col gap-5justify-center items-center text-white bg-zinc-900 h-screen"> 
        { load ? <Loader/> : 
        <>
        <form action="" onSubmit={HandelSubmit} className="flex gap-5 flex-col mt-10">
            <Label htmlFor="taskId">Enter the Id</Label>
            <Input id='taskId'   />
            <Button className="bg-white text-zinc-950" type="submit" >View</Button>
        </form> 
        </>}
        {
            task && <>
            <div className="flex flex-col gap-3 text-white border rounded-sm mt-20 p-5">
                <h1 className="text-green-500 text-center font-bold">Task</h1>
                <div><span className="font-black mr-3" >Id:</span>{task.NumId}</div>
                <div><span className="font-black mr-3" >Name:</span>{task.name}</div>
                <div><span className="font-black mr-3" >Date:</span>{task.date}</div>
            </div>
            </>
        }
    </div>
  )
}

export default page