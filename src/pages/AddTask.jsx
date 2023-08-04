import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddTask() {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleAddTask = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const taskData = {
        name: name,
        description: desc,
        status: false
    }
    const requestOptions = {
        method: 'POST',
        headers: {
           'content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        body: JSON.stringify(taskData)
    }
    const login = await fetch( `${import.meta.env.VITE_API_URL}/task`, requestOptions);
    const res = await login.json();
    if(!login.ok){
      setLoading(false)
       return console.log(res)
    }  else {
        setLoading(false)
        localStorage.setItem('auth', res.results._id);
        navigate('/'); // Navigate only when the login is successful
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message);
    }
  }

  return (
    <div className=" bg-gray-900 flex justify-center items-center h-screen w-full">
      <form className=" h-80 w-64 rounded-md flex flex-col px-3 justify-center gap-5 bg-violet-800" onSubmit={handleAddTask}>
        <span className=" font-bold text-center text-lg text-white">New Task</span>
        <label htmlFor="name" className=" text-white font-semibold">Name</label>
        <input type="text" id="name" className=" text-white outline-none border-b-[2px] border-white bg-transparent" onChange={(e)=> setName(e.target.value)} required/>
        <label htmlFor="desc" className=" text-white font-semibold" >Description</label>
        <input type="text" id="desc" className=" text-white outline-none border-b-[2px] border-white bg-transparent" onChange={(e)=> setDesc(e.target.value)} required/>
        <div className=" flex w-full justify-between">
          <Link to='/' className=" text-center w-[48%] py-2 bg-red-500 text-white">cancel</Link>
          <button className=" w-[48%] py-2 bg-gray-800 text-white">{loading ? 'creating..' : 'create'}</button>
        </div>
      </form>
    </div>
  )
}

export default AddTask