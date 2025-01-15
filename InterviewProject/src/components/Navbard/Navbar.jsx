import React from 'react'
import url from '../../assets/6116f8e9d28c4435320ec830a2238020.png'
import { IoSettings } from "react-icons/io5";
import { Button } from '../ui/button';
import { FaCaretDown } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const Navbar = () => {

  const navbar = [
    { id: 1, name: "Setting" },
    { id: 2, name: "DashBoard" },
  ];

  return (
    <div className='bg-[#404041] w-full h-full py-3 text-white flex justify-between items-center px-5'>
      {/* right  */}
      <div className='flex gap-4 justify-center items-center'>
        <img src={url} className='w-[40px]' alt="" />
        <span>Admin Console</span>
        <button className='bg-white text-black px-2 rounded-xl'>ADMIN VIEW</button>
      </div>


      {/* left  */}
      <div className='flex justify-center items-center gap-4'>
        <div className='flex justify-center items-center gap-3'><IoSettings className='text-[#FF9926]'/> Support</div>
        <div>
        <DropdownMenu>
              <DropdownMenuTrigger className="my-2 sm:text-xs">
                <button className="ml-auto sm:text-xs py-2 rounded-md px-2 bg-[#242424] flex justify-center items-center gap-3 text-white">
                  {" "}
                  <div className='w-[30px] h-[30px] rounded-full bg-white'></div>
                  <span className="mr-16">Jane</span>{" "}
                  <FaCaretDown className="text-[#FF9926]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navbar.map((dealer) => (
                  <DropdownMenuItem
                    key={dealer.id}
                    onClick={() => console.log(`Selected: ${dealer.name}`)}
                  >
                    {dealer.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

    </div>
  )
}

export default Navbar
