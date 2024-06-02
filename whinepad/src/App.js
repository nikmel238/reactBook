import Excel from './components/Excel';

let headers = localStorage.getItem(`headers`);
let data = localStorage.getItem(`data`);

if (!headers) {
  headers = [`Title`, `Year`, `Rating`, `Comments`];
  data = [[`Red whine`, `2021`, `3`, `meh`]];
}

function App() {
  return (
    <div>
      <Excel headers={headers} initialData={data}/>      
    </div>
  );
}

export default App;
