
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Fontpage from './components/Fontpage'
import Uploadpage from "./components/Uploadpage"
import Thirdpage from './components/Thirdpage'
import AvailableJournal from './components/AvailableJournal'
import AssociateEditor from './components/AssociateEditor'
import "./App.css"
function App() {


  return (
    <>
    <div className='top'></div>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Fontpage/>}/>
      <Route path='/Uploadpage' element={<Uploadpage/>}/>
      <Route path='/Thirdpage' element={<Thirdpage/>}/>
      <Route path='/AvailableJournal' element={<AvailableJournal/>}/>
      <Route path='/AssociateEditor' element={<AssociateEditor/>}/>
     </Routes>
     </BrowserRouter>
     <div className='bottom'></div>
    </>
  )
}

export default App
