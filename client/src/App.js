import './App.css';
import {useState} from 'react';
import { Router } from '@reach/router';
import AllPirates from './views/allpirates';
import SinglePirate from './views/singlepirate';
import AddPirate from './views/addpirate';


function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="App">
      <Router>
        <AllPirates path="/pirates" loaded={loaded} setLoaded={setLoaded}/>
        <SinglePirate path="/pirates/:id" loaded={loaded} setLoaded={setLoaded}/>
        <AddPirate path="/pirate/new" loaded={loaded} setLoaded={setLoaded}/>
      </Router>
    </div>
  );
}

export default App;
