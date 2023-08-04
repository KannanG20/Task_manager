/* eslint-disable react/prop-types */
// import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faBars, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { DarkContext } from '../context/DarkMode'
import { faLightbulb, faMoon } from '@fortawesome/free-regular-svg-icons'

// eslint-disable-next-line react/prop-types
function Navbar({ handleData, data }) {
    const [toggle, setToggle] = useState(false)
    const [query, setQuery] = useState('')
    const { isDark, toggleDarkMode } = useContext(DarkContext);

    const toggleMode = () => {
      setToggle(false)
      toggleDarkMode()
    };

 const handleFilter = () => {
    // Sort tasks based on updatedAt date in ascending order
    // eslint-disable-next-line react/prop-types
    const sortedTasks = data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    setToggle(false)
    handleData([...sortedTasks]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
        handleData(data);
      } else {
        const filtered = data.filter((item) =>
          item.name?.toLowerCase().includes(query.toLowerCase())
        );
        handleData(filtered)
      }
  }

  return (
    <div className={` px-5 relative md:px-10 h-14 md:h-20 w-[95%] md:w-[80%] ${isDark ? 'bg-gray-700' : 'bg-purple-500'}  shadow-md shadow-gray-300 rounded-md flex justify-between items-center`}>
        <h1 className="text-white font-semibold hidden md:flex text-xs md:text-xl">TASK MANAGER</h1>
        <div className="md:flex justify-center items-center hidden gap-2">
            <form onSubmit={handleSearch}>
                <input type="search"  placeholder="search" className=" px-3 rounded-sm outline-none py-2 border-none" onChange={(e)=> setQuery(e.target.value)}/>
            </form>
            <button to='/add' className="rounded-sm bg-white px-4 py-2 text-black font-semibold" onClick={toggleMode}>{isDark ? <FontAwesomeIcon icon={faLightbulb} size='lg'/> : <FontAwesomeIcon icon={faMoon} size='lg'/>}</button>
            <button to='/add' className="rounded-sm bg-white px-4 py-2 text-black font-semibold"><FontAwesomeIcon icon={faFilter} size='lg' onClick={handleFilter}/></button>
            <Link to='/add' className="rounded-sm bg-white px-4 py-2 text-black">Add Task</Link>
        </div>
        <div className="md:hidden flex gap-2 items-center w-full">
            <div className=' bg-white px-3  flex items-center w-full'>
                <FontAwesomeIcon icon={faSearch} onClick={handleSearch}/>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="search" className=" px-3 py-1 rounded-sm w-full outline-none border-none" onChange={(e)=> setQuery(e.target.value)}/>
                </form>
            </div>
            <span onClick={() => setToggle(prev => !prev)}>
                {toggle ? 
                    <FontAwesomeIcon icon={faXmark} color='white' size='lg'/>
                    :
                    <FontAwesomeIcon icon={faBars} color='white' size='lg' />
                }
            </span>
        </div>
        {toggle && 
            <div className={`absolute -bottom-32 right-5 ${isDark ? 'bg-gray-700 text-white' : 'bg-purple-500'} flex flex-col z-50 `}>
                <button className='py-2 px-5 text-white border-b-white border-b-[1px]' onClick={toggleMode}>{isDark ? 'Light Mode' : 'Dark Mode'}</button>
                <button className='py-2 px-5 text-white border-b-white border-b-[1px]' onClick={handleFilter}>Filter</button>
                <Link to='/add' className='py-2 px-5 text-white'>Add Task</Link>
            </div>
        }
    </div>
  )
}

export default Navbar