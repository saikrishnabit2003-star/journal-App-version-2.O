
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Loginpage from "./components/Loginpage"
import Fontpage from './components/Fontpage'
import Uploadpage from "./components/Uploadpage"
import Thirdpage from './components/Thirdpage'
import AvailableJournal from './components/AvailableJournal'
import AssociateEditor from './components/AssociateEditor'
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"
import Header from "./Header"

import { useEffect, useState } from 'react'

function App() {


// const isLoggedIn = localStorage.getItem("authToken");
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  if (localStorage.getItem("authToken")) {
    setIsLoggedIn(true);
  }
}, []);

  return (
    <>
    
     <BrowserRouter>
     {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}

     
     
     <Routes>
      <Route path='/' element={<Loginpage setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/Homepage' element={<ProtectedRoute><Fontpage /></ProtectedRoute>}/>
      <Route path='/Uploadpage' element={<ProtectedRoute><Uploadpage /></ProtectedRoute>}/>
      <Route path='/Thirdpage' element={<ProtectedRoute><Thirdpage /></ProtectedRoute>}/>
      <Route path='/AvailableJournal' element={<ProtectedRoute><AvailableJournal /></ProtectedRoute>}/>
      <Route path='/AssociateEditor' element={<ProtectedRoute><AssociateEditor /></ProtectedRoute>}/>
     </Routes>
    
     </BrowserRouter>
    </>
  )
}

export default App
