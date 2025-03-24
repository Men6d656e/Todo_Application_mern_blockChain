"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Web3 } from 'web3'
import Loader from '@/components/Loder';
import { useState } from 'react';
import ABI from '../../../ABI.json';

function page() {

    const [load, setLoad] = useState(false);

    const router = useRouter();
    const contractAddress = useSelector((state) => state.SolidityContract.contractAddress);
    const account = useSelector((state) => state.SolidityContract.account);
    const web3 = new Web3(window.ethereum);

    const handelSubmit = async (event) => {
        event.preventDefault();
        setLoad(true);
        const id = document.querySelector("#id").value;
        const name = document.querySelector("#name").value;
        const date = document.querySelector("#date").value;
        const data = {
            id : id,
            name : name,
            date: date
        }
        const req = await fetch(`http://localhost:3001/api/ethurem/update-task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ date: data })
        })
        const res = await req.json();
        console.log(res);
        if (res.message === 'Task Exist') {
            const contract = new web3.eth.Contract(ABI, contractAddress);
            await contract.methods.updateTask(id,name, date).send({ from: account });
            alert("task updated");
            setLoad(false);
            router.push("/viewAllTasks");

        } else {
            alert("You try to update the task that is not exist");
            setLoad(false);
        }
    }


    return (
        <div className='bg-zinc-900 flex justify-center items-center h-screen'>
            {load ? <Loader /> :<div className='flex flex-col'>
                <form action="" className='flex  flex-col w-[500px] gap-3 text-white p-5 border rounded-sm' >
                    <div className='flex gap-5 justify-between'>
                        <Label htmlFor="id">Enter the ID:</Label>
                        <Input className="w-[300px]" id='id' />

                    </div>
                    <div className='flex gap-5 justify-between'>
                        <Label htmlFor="name">Enter the Task Name:</Label>
                        <Input className="w-[300px]" id='name' />
                    </div>
                    <div className='flex gap-5 justify-between'>

                        <Label htmlFor="date">Enter the Date:</Label>
                        <Input className="w-[300px]" id='date' placeholder="e.g:Mon Mar 25 2025" />
                    </div>
                    <Button className="bg-white text-zinc-950 " type="submit" onClick={handelSubmit} >Update</Button>
                </form>
            </div>}

        </div>
    )
}

export default page