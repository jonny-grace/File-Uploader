import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        console.log(selectedFile)
        const formData = new FormData();

        //check if the size of the uploaded file is more that 10MB before sending to the server
        if (selectedFile.size > 10000000) {
            alert('File Size should be less then 10 MB');
        } else {
            formData.append('file', selectedFile);
        }
        console.log(formData)
        try {
            await axios.post('http://localhost:5000/upload', formData)
                .then((response) => {
                    // console.log(response.data);
                    alert(response.data);
                })

        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        }
    };
    return (
        <div className='file_uploader_container'>
            <label>Upload Your File</label>
            <form onSubmit={onFileUpload}>
                <input className='input-filled' type="file" name="file" onChange={onFileChange} />
                <input className='upload-button' type="submit" value="Upload" />
            </form>

        </div>
    )
}

export default FileUploader