import './App.css'
import CustomRoutes from './routes/CustomRoutes';
import { Link } from 'react-router-dom';

function App() {

  return (
    <div className='main-body'>
      <Link to={'/'} className='main-head'><h1>PokeDex</h1></Link>
      <CustomRoutes/>
    </div>
  )
}

export default App;
