
// eslint-disable-next-line react/prop-types
function DialogBox({ msg, dialogToggle, id, type, setIsUpdated }) {

  const handleOperation = () => {
      if (type === 'delete') {
        handleDelete()
      }else {
        handleUpdate()
      }
      dialogToggle(false)
  }

  const handleDelete = async () => {
    try {
        const delData = await fetch( `${import.meta.env.VITE_API_URL}/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }});
        const res = await delData.json();
        if(!delData.ok){
           return console.log('error:', res)
        } 
        setIsUpdated(prev => !prev)
    } catch (error) {
        console.log(error.message)
    }
    
}
const handleUpdate = async () => {
  try {
    const updatedData = {
      updatedAt: new Date().toLocaleDateString('en-GB'),
      status: true
    };
    const updateData = await fetch(`${import.meta.env.VITE_API_URL}/task/${id}`, {
      method: 'PUT', 
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(updatedData), 
    });

    const res = await updateData.json();
    if (!updateData.ok) {
      return console.log('error:', res);
    }
    setIsUpdated(prev => !prev)
  } catch (error) {
    console.log(error.message);
  }
}
    
  return (
    <div className='h-screen w-full backdrop-blur-sm flex justify-center items-center absolute'>
        <div className=' md:w-auto px-5 w-[90%] h-auto py-5 md:py-10 bg-gray-300 rounded-md flex justify-center gap-8 flex-col items-center'>
            <span className=" font-semibold">{msg}</span>
            <div className=' flex w-full justify-end gap-3 items-center'>
                <button className=" bg-red-500 px-3 py-2 text-white rounded-sm" onClick={() => dialogToggle(false)}>cancel</button>
                <button className=" bg-green-400 px-3 py-2 text-white rounded-sm" onClick={handleOperation}>confirm</button>
            </div>
        </div>
    </div>
  )
}

export default DialogBox