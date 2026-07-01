import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authenticaton from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';
import MeetingLobby from './pages/MeetingLobby';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<Authenticaton />} />
        <Route path='/home' element={<HomeComponent />} />
        <Route path='/history' element={<History />} />
        <Route path='/lobby/:roomId' element={<MeetingLobby/>} />
        <Route path='/room/:roomId'element={<VideoMeetComponent/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
