import RoomBook from './components/RoomBook'
import AdminDelete from './components/AdminDelete'
import ViewData from './components/ViewData';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const openClose = () => {
    if(document.querySelector('.sideBar').style.left == '0px')
    document.querySelector('.sideBar').style.left = '-100vw'
    else
    document.querySelector('.sideBar').style.left = '0'
  }
  return (
    <div className="App">

        <div className='sideBar'>
          <span className='shade'></span>
          <h1>ADMIN</h1>
          <span>
            <i class="fa-solid fa-house"></i>
            <a href="/">DASHBOARD</a>
          </span>
          <span>
            <i class="fa-solid fa-pen-to-square"></i>
            <a href="/booknewroom">BOOK NEW ROOM</a>
          </span>
          <span>
            <i class="fa-solid fa-right-from-bracket"></i>
            <a href="#">LOGOUT</a>
          </span>
        </div>
        <div className='main_container'>
          <span id='heading'>
            <h3 id='welcome'>Welcome, </h3><h3>Admin</h3>
            <span id='oc' onClick={openClose}><i class="fa-solid fa-bars"></i></span>
          </span>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<ViewData />} />
                <Route path="/booknewroom" element={<RoomBook />} />
            </Routes>
          </BrowserRouter>
         
        </div>
        {/* <div className='content_container'> */}
            {/* <RoomBook /> */}
            {/* <AdminDelete /> */}
            {/* <ViewData /> */}
        {/* </div> */}
        
    </div>
  );
}

export default App;
