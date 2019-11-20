import React from 'react';
import './App.css';
import Quiz from "./Quiz";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h2>Vivium Quiz</h2>
     <Quiz/>
      </header>
    </div>
  );
}

export default App;
