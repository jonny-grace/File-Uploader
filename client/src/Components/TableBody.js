import React from 'react'

function TableBody({ allfiles, deleteFile }) {
    return (
        <tbody>
            {

                allfiles.map(file => {

                    const uploadDate = (new Date(file.upload_date)).toLocaleDateString();
                    return (

                        <tr className="active-row" key={file.id}>
                            <td>{file.name}</td>
                            <td>{file.size}</td>
                            <td>{uploadDate}
                                <span onClick={() => { deleteFile(file.id) }}>X</span>
                            </td>

                        </tr>
                    )
                })
            }

        </tbody>
    )
}

export default TableBody