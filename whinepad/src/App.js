import Excel from './components/Excel';

function App() {
  return (
    <div>
      <Excel headers={[`Name`, `Year`]} initialData={[[`Charles`, `1859`], [`Charles`, `1859`]]}/>      
    </div>
  );
}

export default App;
