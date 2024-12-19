import React from 'react'
import { FaDiscord } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className='pt-48 px-14 my-32 space-y-10'>
      <h1 className='font-mono text-5xl'>Akademi Linux</h1>
      <button
        type="button"
        onClick={() => {
          window.open('https://discord.gg/Hwc27FdTe8', '_blank');
        }}
        className='flex align-middle items-center space-x-2 shadow-lg font-semibold rounded-lg py-2 px-4 bg-al-background transition duration-300 hover:shadow-sm hover:shadow-al-primary'>
        <span>Gabung Discord</span>
        <i className='text-2xl'><FaDiscord /></i>
      </button>
    </div>
  )
}

export default Hero