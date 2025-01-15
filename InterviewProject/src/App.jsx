import './App.css'
import DashBoard from './components/Dashboard/DashBoard'
import Navbar from './components/Navbard/Navbar'

function App() {

  return (
    <>
      <div className='w-full h-full flex flex-col justify-center items-center bg-[#F5F5F5]'>
        <Navbar/>
        <DashBoard/>
      </div>
    </>
  )
}

export default App
