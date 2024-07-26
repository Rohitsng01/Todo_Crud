import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Row from './Row'
import Complete from './Complete'

function Input() {
    const User = {
        title: '',
        disc: '',
    }
    const [data, setData] = useState(User)
    const [complete, setComplete] = useState([])
    const [task, setTask] = useState([])
    const [edit, setEdit] = useState(null)
    const [loading , setLoading] = useState(true)

    const inputhandle = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value,  })
    }
    

    useEffect(() => {
        axios.get('http://localhost:5000/api/get')
            .then(res => {
                const tasks = res.data;
                setTask(tasks.filter(task => task.status === 'todo'));
                setComplete(tasks.filter(task => task.status === 'complete'));
                setLoading(false)
            })
            .catch(error => console.log(error));
    }, [task]);


    const completeHandle = async(id) => {
        try {
            console.log(id)
            const completedTask = task.find((t) => t._id === id);
            if (completedTask) {
                const res = await axios.post(`http://localhost:5000/api/complete/${id}`, { ...completedTask, status: 'complete' });
                setTask(task.filter((t) => t._id !== id));
                setComplete([...complete, res.data]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleRemove = async(id) => {
        const removedTask = complete.find((t) => t._id === id);
        if (removedTask) {
            const res = await axios.post(`http://localhost:5000/api/complete/${id}`, { ...removedTask, status: 'todo' });
            setComplete(complete.filter((t) => t._id !== id));
            setTask([...task, res.data]);
        }
    };

    const handleSubmit = async() => {
        if (edit) {
            try {
                const res = await axios.put(`http://localhost:5000/api/update/${edit}`, data)
                setTask(task.map(e => e._id === edit ? res.data : e))
                setData(User)
                setEdit(null)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const res = await axios.post('http://localhost:5000/api/create', data)
                setTask([...task, res.data])
                setData({title:'',disc:'',})

            } catch (error) {
                console.log(error)
            }

        }
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/delete/${id}`);
            setTask(task.filter(t => t._id !== id),
            setComplete(complete.filter(e => e._id !== id)));
        } catch (error) {
            console.log(error);
        }
    };
    const updateHandle = (e) => {
        setData({ title: e.title, disc: e.disc, status:e.status })
        setEdit(e._id)
    }
    if(loading){
        return <h1>Loading...</h1>
    }



    return (
        <div>
            <>
                <input className='mt-4 font-bold border-2 text-black text-center mr-3 border-black'
                    type="text"
                    placeholder="Enter your Task"
                    name='title'
                    value={data.title}
                    onChange={inputhandle}
                />
                <input className='mt-4 font-bold border-2 text-black text-center mr-3 border-black'
                    type="text"
                    placeholder="Enter your Task Disc...."
                    name='disc'
                    value={data.disc}
                    onChange={inputhandle}
                />
                <button className='mt-4 border-b-2  border-t-2 font-bold text-xl text-black text-center mr-3 border-black'
                 onClick={handleSubmit} >{edit ? "Update" : 'Add'}</button>
            </>
            <>
                <h1 className=' mt-8 font-bold text-2xl border-b-4 border-t-4 border-red-950' >Task section</h1>
                <Row task={task} updateHandle={updateHandle} handleDelete={handleDelete} completeHandle={completeHandle}/>
            </>
            <>
           <h1 className=' mt-8 font-bold text-2xl border-b-4 border-t-4 border-red-950' >Complete section</h1> 
            <Complete complete={complete} handleDelete={handleDelete} handleRemove={handleRemove}  />
            </>
        </div>

    )
}

export default Input