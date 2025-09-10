import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext'; 
import Login from './pages/Login';
import AdminDash from './pages/AdminDash';
import UserDash from './pages/UserDash';
import Items from './pages/Items';
import Info from './pages/Info';
import Zones from './pages/Zones';
import ItemsAnalysis from './pages/ItemsAnalysis';
import ZoneAnalysis from './pages/ZoneAnalysis';
import ZoneInfo from './pages/ZoneInfo';

function App() {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/user" element={<UserDash />} />
          <Route path="/items" element={<Items />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/itemanalysis" element={<ItemsAnalysis />} />
          <Route path="/zoneanalysis" element={<ZoneAnalysis />} />
          <Route path="/info" element={<Info />} />
          <Route path="/zoneinfo" element={<ZoneInfo />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
