import React from 'react'
import { 
  FaTiktok,
  FaYoutube,
  FaInstagram,

} from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className='w-full absolute bottom-0'>
      <div className='flex mt-44 w-full p-4 justify-between px-14'>
        <div className='flex items-center'>
          <p><span>Powered by </span><i className='font-semibold'>Community</i></p>
        </div>
        <div className='flex space-x-4 items-center'>
          <p className='font-semibold'>Follow Us:</p>
          <FaTiktok 
            size={24}
          />
          <FaYoutube
            size={32}
          />
          <FaInstagram
            size={32}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer