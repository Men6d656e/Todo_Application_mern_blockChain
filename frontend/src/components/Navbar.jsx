import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='bg-green-950 flex p-5 justify-between  text-white '>
        <div className='font-bold'>
            TODO APPLICATION
        </div>
        <div className='flex gap-6'>
            <Link href="/createTask" >Create </Link>
            <Link href="/deleteTask" >Delete </Link>
            <Link href="/updateTask" >Update </Link>
            <Link href="/viewTask" >View </Link>
            <Link href="/viewAllTasks" >View All </Link>
        </div>
    </div>
  )
}

export default Navbar