import './App.css';
import Home from './components/Home';
import SignUp from './components/singupForm/SignUp';
import { Routes, Route} from 'react-router-dom'
import Categories from './components/categories/Categories';
import Entertainment from './components/Entertainment/Entertainment';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/home' element={ <Home /> } />
        <Route path='/categories' element={<Categories />} />
        <Route path='/entertainment' element={<Entertainment /> } />
      </Routes>
      
    </div>
  );
}

export default App;
