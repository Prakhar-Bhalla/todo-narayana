import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Completed } from './components/Completed';
import { Navbar } from './components/Navbar';
import { Todos } from './components/Todos';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Todos/>}></Route>
        <Route path='/completed' element={<Completed/>}></Route>
      </Routes>
    </div>
  );
}

export default App;