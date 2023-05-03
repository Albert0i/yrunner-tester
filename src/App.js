import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home'
import { Test } from './pages/Test'
import { Navbar } from './components/Navbar'
import './App.css';

function App() {
  return (
      <div className='min-h-screen w-auto p-4 bg-gray-100 text-gray-900 '>
        <div className='text-2xl text-center'>YRunner</div>        
        <Router>
          <Navbar />          
          <Routes>
            <Route path='/test' element={<Test />} />
            <Route path='/*' element={<Home />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;

/*
   Install Tailwind CSS with Create React App
   https://tailwindcss.com/docs/guides/create-react-app
*/