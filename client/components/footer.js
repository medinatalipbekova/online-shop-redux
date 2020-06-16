import React from 'react'

const Footer = () => {
  return (
    <footer className="  border-b-2  text-end w-full sticky">
      <div className="container mx-auto px-2">
        <div className="mt-4 border-b-2 border-black flex flex-col items-end">
          <div className="sm:w-2/3  py-2 text-center">.</div>
        </div>
        <p className="text-sm text-black font-bold mb-2">© 2020 by Madina Talip</p>
      </div>
    </footer>
  )
}
Footer.propTypes = {}

export default Footer
