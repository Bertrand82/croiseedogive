
import BgThreeScene from './BgThreeScene';



import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Croisée d'ogive</h2>        
      </header>
      
      <div>
        <section> 
          <div>Cette application permet de définir les valeurs caractéristiques d'une croisée d'ogive.</div>
          <div>Les  paramètres d'entrée sont : côté a, côté b, épaisseur des arrêtes.</div>
          <div>Les sorties sont les differents rayons de courbure et centres de courbure des coffrages.</div>
          <div>Le nombre total de briques et le prix global sont évalués également .</div>

        </section>
      <BgThreeScene />
      </div>
      
    </div>
  );
}

export default App;
