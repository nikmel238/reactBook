import './App.css';
import Discovery from './components/Discovery';
import Excel from './components/Excel';

let headers = localStorage.getItem(`headers`);
let data = localStorage.getItem(`data`);

if (!headers) {
  headers = [`Title`, `Year`, `Rating`, `Comments`];
  data = [[`Red whine`, `2021`, `3`, `meh`]];
}

const isDiscovery = window.location.pathname.replace(/\//g, ``) === `discovery`;

function App() {
  if (isDiscovery) {
    return <Discovery />
  }
  return (
    <div>
      <Excel headers={headers} initialData={data}/>      
    </div>
  );
}

export default App;
