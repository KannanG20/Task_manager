/* eslint-disable react/prop-types */
// import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from "react";
import { DarkContext } from "../context/DarkMode";

function Tasks({ dialogToggle, filteredData, isEmpty, loading, err }) {

    const { isDark } = useContext(DarkContext);

    const itemsPerPage = 8

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const maxPaginationLinks = 5;
  
    const halfMaxLinks = Math.floor(maxPaginationLinks / 2);
    let startIndex = currentPage - halfMaxLinks;
    let endIndex = currentPage + halfMaxLinks;
  
    if (startIndex < 1) {
      startIndex = 1;
      endIndex = Math.min(totalPages, maxPaginationLinks);
    }
    if (endIndex > totalPages) {
      endIndex = totalPages;
      startIndex = Math.max(1, totalPages - maxPaginationLinks + 1);
    }
  
  
    // Handle page change
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  
    // Generate pagination links
    const paginationLinks = [];
    for (let i = startIndex; i <= endIndex; i++)  {
      paginationLinks.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active text-red-600' : ''}
        >
          {i}
        </button>
      );
    }
  

  return (
    <div className={` ${isDark ? 'bg-gray-700 text-white' : 'bg-white'} md:overflow-hidden overflow-x-scroll h-[80%] w-[95%] md:w-[80%] rounded-md shadow-md shadow-gray-400 `}>
        <table className="w-full relative">
            <thead>
                <tr className=" h-10 border-b-[2px] border-black">
                    <th>Name</th>
                    <th>Description</th>
                    <th>Updated At</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            {loading ?              
                <div className=" flex justify-center w-full items-center h-full absolute"><span>Fetching Data...</span></div>
                :
                err ? 
                 <div className=" flex justify-center w-full items-center h-full absolute text-red-500"><span>something went wrong, try again</span></div>
                :
                isEmpty ? 
                
                    <div className=" flex justify-center w-full items-center h-full absolute"><span>No Tasks</span></div>
                  :
                <tbody>
                        {filteredData   
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map((item) => (
                            <tr className= {` h-16  ${isDark ? 'bg-[#121212] text-white border-white' : 'bg-slate-100 border-black'} border-b-[1px] `} key={item._id} >
                                <td  className=" font-medium text-center">{item.name}</td>
                                <td className=" font-medium text-center">{item.description}</td>
                                <td className=" font-medium text-center">{item.updatedAt}</td>
                                <td className={`font-medium text-center ${item.status ? 'text-green-500' :'text-red-500'}`}>{item.status ? 'completed' : 'pending'}</td>
                                <td className=" font-medium text-center space-x-3">
                                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => dialogToggle(true, "Confirm, If you want to update the task status as completed?", item._id, 'update' )}/>
                                        <FontAwesomeIcon icon={faTrash} color='red' onClick={() => dialogToggle(true, "Confirm, If you want to delete the task?", item._id, 'delete' )} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            }
        </table>
        <div className=" flex gap-2 py-3 w-full justify-center items-center">
            {currentPage > 1 && (
            <button  className=' text-black' onClick={() => handlePageChange(currentPage - 1)}>{"<"}</button>
            )}
            
                {paginationLinks}
            
            {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>{">"}</button>
            )}
      </div>
    </div>
  )
}

export default Tasks