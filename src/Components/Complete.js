import React from 'react'

function Complete({ complete,  handleDelete , handleRemove}) {

    return (
        <>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {complete.map((e, i) => (
                        <tr className='font-bold' key={i}>
                            <td>{i + 1}</td>
                            <td>{e.title}</td>
                            <td>{e.disc}</td>
                            <td>
                                <button  className='border-2 border-black pl-2 pr-2 hover:animate-pulse' onClick={() => handleDelete(e._id)} >Delete</button> &nbsp;
                                <button  className='border-2 border-black pl-2 pr-2 hover:animate-pulse' onClick={() => handleRemove(e._id)} >Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default Complete