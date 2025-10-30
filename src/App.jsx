import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About';
import AnimeDetail from './components/AnimeDetail';
import AnimeList from './components/AnimeList';
import Dashboard from './components/Dashboard';
import EpisodeList from './components/EpisodeList';
import Genres from './components/Genres';
import Login from './components/Login';
import Player from './components/PlayerNew';
import Schedule from './components/Schedule';
import Search from './components/SearchNew';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anime-list" element={<AnimeList />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/search" element={<Search />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/episodes/:id" element={<EpisodeList />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/player/:id/:episode" element={<Player />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
