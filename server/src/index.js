// I've add type:module in to package.json which allow me to use import and export in node js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mysql from 'mysql';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// create the database connection using mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fileuploader'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Set up Multer for file uploading
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})
const upload = multer({
    Storage: storage
})
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }

    const sql1 = `SELECT * FROM files`;
    const sql = 'INSERT INTO files (name,size,upload_date) VALUES(?, ?,CURDATE())';
    let fileChecker;
    //check if the file with the same name exist
    connection.query(sql1, (err, result) => {

        fileChecker = result.find(r => r.name === file.originalname);
        if (!fileChecker) {
            // Save file information in MySQL
            connection.query(sql, [file.originalname, file.size], (err, result) => {
                if (err) throw err;
                res.send('File uploaded successfully.');
            });
        } else {
            res.send(`File already exists`);
        }
    })
});

app.get('/api/files', (req, res) => {
    const sql = " SELECT * FROM files"
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.send({ msg: err });
        }
        if (result) {
            res.send(result)
        }
    })
})

app.delete('/api/file/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    console.log(fileId)
    const sql1 = `DELETE FROM files where id = ${fileId}`;
    connection.query(sql1, (err, row) => {
        if (err) throw err;
        res.send(`Data successfully removed`)
    })
});

app.delete('/api/files/deleteAll', (req, res) => {
    const mysql = "DELETE from files";
    connection.query(mysql, (err, rows) => {
        if (err) throw err;
        res.send('All files deleted successfully')
        console.log(rows.affectedRows)
    })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});