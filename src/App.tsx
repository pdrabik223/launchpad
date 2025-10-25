import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecordingPage } from './pages/RecordingPage';
import { LandingPage } from './pages/LandingPage';
import { ReplayPage } from './pages/ReplayPage';


function App() {


  return <Router>
    <Routes>
      <Route path="*" element={<LandingPage />} />
      <Route path="/recording" element={<RecordingPage />} />
      <Route path="/replay" element={<ReplayPage />} />
    </Routes>
  </Router>


}

export default App





