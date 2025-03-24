"use client";
import {Web3} from 'web3';
import { Button } from "@/components/ui/button";
import {  useDispatch } from 'react-redux';
import {setContract} from '@/store/ContractSlice.js';
import { useRouter } from "next/navigation";




function Wallet() {

    const router = useRouter();

    const dispatch = useDispatch();

    const connectWallet = async () => {
        try {
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                console.log(accounts);
                const contractAddress = "0x64AB50eE67fB22dae560A8663c31fB1C3eE1f278";
                // const contract = new web3.eth.Contract(ABI, contractAddress);
                // console.log(contract);    
                dispatch(setContract({ contractAddress:contractAddress,account:accounts[0]}));
                router.push("viewAllTasks");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='bg-zinc-900 flex w-full justify-center items-center h-screen'>
        <Button className="text-zinc-950 bg-white" onClick={connectWallet}>Connect Wallet</Button>
    </div>
  )
}

export default Wallet