import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home'
import { Test } from './pages/Test'
import { Navbar } from './components/Navbar'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import './App.css';

function App() {
  return (
      <div className=' h-full p-4 bg-gray-100 text-gray-900'>
        <Header />
        <Router>
          <Navbar />          
          <Routes>
            <Route path='/test' element={<Test />} />
            <Route path='/*' element={<Home />} />
          </Routes>
        </Router>
        <Footer />
      </div>
  );
}

export default App;

/*
   Install Tailwind CSS with Create React App
   https://tailwindcss.com/docs/guides/create-react-app
*/