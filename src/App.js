import logo from './logo.svg';
//import './App.css';
import Register from '../src/components/index/register'
import Dash from '../src/components/menu/dash'
import { BrowserRouter, Route, Routes} from "react-router-dom"
import './styles/index/style.css'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Register></Register>}></Route>
          <Route exact path="/api/successlogin" element={<Dash></Dash>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
