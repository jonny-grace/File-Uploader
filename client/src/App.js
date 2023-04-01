import './App.css';
import FileUploader from './Components/FileUploader';
import Footer from './Components/Footer';
import Header from './Components/Header';
import TableData from './Components/TableData';
function App() {

  return (
    <div className="App">
      <Header />
      <div className='file_container'>
        <div className='list_of_files'>
          <h2>List of Uploaded files</h2>
          <TableData />
        </div>
        <FileUploader />
      </div>
      <Footer />

    </div>
  );


}


export default App;
