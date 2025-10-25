import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/RecordingPage';
import { LandingPage } from './pages/LandingPage';


function App() {


  return <Router>
    <Routes>
      <Route path="*" element={<LandingPage />} />
      <Route path="/recording" element={<MainPage />} />
    </Routes>
  </Router>


}

export default App





