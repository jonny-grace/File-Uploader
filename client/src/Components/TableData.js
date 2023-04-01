import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableBody from './TableBody';
import TablesHead from './TablesHead';
function TableData() {
    const [allfiles, setAllFiles] = useState([])
    let counter = allfiles.length;

    //fetch all files
    useEffect(() => {
        axios.get('http://localhost:5000/api/files')
            .then(function (response) {
                setAllFiles(response.data)
            })
    }, [allfiles])

    // delete selected file
    async function deleteFile(id) {

        await axios.delete(`http://localhost:5000/api/file/${id}`);
        alert('1 File successfuly Removed');
    }

    //delete all files
    async function deleteAll() {

        await axios.delete(`http://localhost:5000/api/files/deleteAll`);
        alert(' all Files deleted successfully');
    }

    return (
        <>
            <table className="styled-table">
                <TablesHead />
                <TableBody allfiles={allfiles} deleteFile={deleteFile} />

            </table>
            {counter > 1 && <span className="delete_all" onClick={deleteAll}>Delete All</span>}
            <div>
                {counter === 0 ? <h3>No File Available</h3> : <h3>Total Number of Files:{counter}</h3>}
            </div>
        </>
    )
}

export default TableData;