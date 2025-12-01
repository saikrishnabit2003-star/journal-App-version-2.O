
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Loginpage from "./components/Loginpage"
import Fontpage from './components/Fontpage'
import Uploadpage from "./components/Uploadpage"
import Thirdpage from './components/Thirdpage'
import AvailableJournal from './components/AvailableJournal'
import AssociateEditor from './components/AssociateEditor'
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"

function App() {




  return (
    <>
    
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Loginpage/>}/>
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
