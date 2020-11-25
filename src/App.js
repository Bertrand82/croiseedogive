
import BgThreeScene from './BgThreeScene';



import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Croisée d'ogive</h2>        
      </header>
      
      <div>
        <div>Cette application permet de définir les valeurs caractéristiques d'une croisee d'ogive en fonction de 3 parametres d'entrée: côté a, côté b, épaisseur des arrêtes</div>
      <BgThreeScene />
      </div>
      
    </div>
  );
}

export default App;
