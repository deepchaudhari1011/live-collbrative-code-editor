import { useState } from 'react'
import './App.css'
import Home  from './comonents/Home'
import Editorpage from './comonents/Editorpage'
import { Routes , Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'



function App() {
  const [count, setCount] = useState(0)

  return <>

<Toaster position='top-center'></Toaster>

<Routes>
<Route path="/" element={<Home />} />
<Route path="/editor/:roomId" element={<Editorpage />} />
 </Routes>


    
    </>
  
}

export default App
