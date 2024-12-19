import React from 'react';
import { FaTerminal } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';

const Header = () => {
  return (
    <header>
      <div className='flex justify-between px-14 py-10'>
        <div className='flex space-x-8 font-semibold items-center'>
          <a>Home</a>
          <a 
            data-tooltip-id="blog"
            data-tooltip-content="Coming Soon!"
            className='text-green-400 hover:text-al-primary'
          >
          Blog
          </a>
          <Tooltip
            id="blog"
            place="right"
            offset={-20}
          />
        </div>
        <div>
          <button
            type="button"
            data-tooltip-id="sudoers"
            data-tooltip-content="Coming Soon!"
            // onClick={() => {
            //   window.open('https://discord.gg/Hwc27FdTe8', '_blank');
            // }}
            className='flex align-middle items-center space-x-2 shadow-lg font-semibold rounded-lg py-2 px-4 bg-al-background transition duration-300 hover:shadow-sm hover:shadow-al-primary'>
            <span className='font-mono'>sudoers</span>
            <i className='text-sm'><FaTerminal /></i>
          </button>
          <Tooltip
            id="sudoers"
            place="bottom"
          />
        </div>
      </div>
    </header> 
  )
}

export default Header