// import React from 'react'
import { useContext, useEffect, useState } from "react"
import DialogBox from "../components/DialogBox"
import Navbar from "../components/Navbar"
import Tasks from "../components/Tasks"
import { DarkContext } from "../context/DarkMode"

function Home() {

    const [dialogOpen, setDialogOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const [tasks, setTasks] = useState([]);
    const [filteredData, setFilteredTasks] = useState([]);
    const [id, setId] =  useState()
    const [type, setType] = useState()
    const [isUpdated, setIsUpdated] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)

    const { isDark } = useContext(DarkContext);

    const fetchData = async () => {
      try {
          setLoading(true)
          setIsEmpty(false)
          setErr(false)
          const data = await fetch( `${import.meta.env.VITE_API_URL}/tasks`, {
              headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
             }});
          const res = await data.json();
          if(!data.ok){
            setLoading(false)
            return console.log(res)
          } else {
              setTasks(res.results)
              setFilteredTasks(res.results)
              if(res.results.length <= 0) {
                setIsEmpty(true)
              }
              setLoading(false)
            }
      } catch (error) {
          setLoading(false)
          setErr(true)
      }
  }

    useEffect(() => {
        fetchData()
    }, [isUpdated])

    const dialogToggle = (isOpened, msg, id, type) => {
      setDialogOpen(isOpened)
      setMsg(msg)
      setId(id)
      setType(type)
    }


  return (
    <div className={` ${isDark ? 'bg-[#121212]' : 'bg-slate-100'}  h-screen w-full flex-col gap-10 flex justify-center items-center relative`}>
        <Navbar handleData={setFilteredTasks} data={tasks} />
        <Tasks dialogToggle={dialogToggle} handleData={setFilteredTasks} filteredData={filteredData} isEmpty={isEmpty} loading={loading} err={err}/>
        {dialogOpen && <DialogBox msg={msg} dialogToggle={setDialogOpen} id={id} type={type} setIsUpdated={setIsUpdated}/>}
    </div>
  )
}

export default Home