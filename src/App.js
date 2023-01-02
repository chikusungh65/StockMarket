import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Navbar from './components/HomeScreen/Navbar';
import WatchListScreen from './components/WatchList/WatchListScreen';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={ <HomeScreen/>}/>
    <Route path="/watchlist" element={ <WatchListScreen/>}/>
    </Routes>
  </BrowserRouter>
  );
}



export default App;
