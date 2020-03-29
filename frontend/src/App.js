/* Além do React devo importar o useState */
import React  from 'react';

import './global.css'
//importe do meu componente
import Rotas from './routes'


export default function App(){

  return (
    <Rotas />
  );
}





//JSX (JavaScript XML -> Sintaxe do html)
/*function App() {
  /**
   * Este é o conceito de estado.
   * A variárvel + a função para alterar o estado
   * da variável.
   */
  /*const [contador, setCounter] = useState(0);

  function increment(){
    setCounter(contador +  1)
    console.log(contador)
  }
  
  return (
    
    <Header> Chamada do meu componente, 
    logo posso passar as propriedade
    < Header title="Semana OmniStack"/>
    
    <div>
      
      <Header>Contator: {contador}</Header>
      <button onClick={increment}>Incrementar</button>

     </div>
  );
}

export default App;*/
