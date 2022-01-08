import logo from './logo.svg';
//import './App.css';
import Register from '../src/components/index/register'
import Menu from '../src/components/menu/menu'
import { HashRouter, Route, Routes } from "react-router-dom"
import './styles/index/style.css'

function App() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Register></Register>}></Route>
        <Route exact path="/api/successlogin" element={<Menu></Menu>}></Route>
      </Routes>
    </HashRouter>
    </>
  );
}

export default App;
