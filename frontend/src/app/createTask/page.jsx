"use client";

import { DatePickerDemo } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ABI from "../../../ABI.json";
import {Web3} from 'web3';
import { useRouter } from "next/navigation";
import Loader from "@/components/Loder.jsx";




function page() {

  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const contractAddress = useSelector((state) => state.SolidityContract.contractAddress);
  const account = useSelector((state) => state.SolidityContract.account);
  const web3 = new Web3(window.ethereum);



  const HandelSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const name = document.querySelector("#name").value;
    const formatedDate = String(date).split(" ").slice(0, 4).join(" ");

    // console.log(contractAddress, account);


    const req = await fetch(`http://localhost:3001/api/ethurem/create-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ date: formatedDate, name: name })
    });

    const res = await req.json();
    console.log(res);
    if (res.status != 200) {
      alert(res.message);
      setLoading(false);
    }
    if (res.status == 200) {
      const contract = new web3.eth.Contract(ABI, contractAddress);
      // console.log(contract);   
      const taskCreate = await contract.methods.createTask(name,formatedDate).send({from:account});
      alert("task added");
      router.push("/viewAllTasks");
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center text-white bg-zinc-900 h-screen">
     { loading ? <Loader /> : <form action="" onSubmit={HandelSubmit} className="flex gap-2 flex-col">
        <Label htmlFor="name">Enter the Task Name</Label>
        <Input id='name' />
        <Label >Select Date</Label>
        <DatePickerDemo className="" setDate={setDate} date={date} />
        <div className="w-full flex flex-col">
          <Button className="bg-white text-gray-950" type="submit" >new</Button>
        </div>
      </form>}
    </div>
  )
}

export default page