"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useState } from "react";
import Loader from "@/components/Loder.jsx";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Web3 } from 'web3';

import ABI from '../../../ABI.json';


function page() {

  const [load, setload] = useState(false);
  const router = useRouter();
  const contractAddress = useSelector((state) => state.SolidityContract.contractAddress);
  const account = useSelector((state) => state.SolidityContract.account);
  const web3 = new Web3(window.ethereum);

  const HandelSubmit = async (event) => {
    try {
      event.preventDefault();
      setload(true);
      const taskId = document.querySelector("#taskId").value;
      const contract = new web3.eth.Contract(ABI, contractAddress);
      await contract.methods.deleteTask(taskId).send({from:account});
      alert("task deleted successfully");
      setload(false);
      router.push("/viewAllTasks");
    } catch (error) {
      console.log(error);
      setload(false);
    }
  }
  return (
    <div className="flex flex-col gap-5justify-center items-center text-white bg-zinc-900 h-screen">
      {load ? <Loader /> :
        <>
          <form action="" onSubmit={HandelSubmit} className="flex gap-5 flex-col mt-10">
            <Label htmlFor="taskId">Enter the Id</Label>
            <Input id='taskId' />
            <Button className="bg-white text-zinc-950" type="submit" >Delete</Button>
          </form>
        </>}
    </div>
  )
}

export default page