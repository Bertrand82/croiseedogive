import 'react-dat-gui/dist/index.css';

import DatGui, {
  DatNumber,
  DatString,
  DatButton
} from 'react-dat-gui';
import React, { Component } from 'react';

import BgParam from './BgParametres';
import ThreeSceneBg from './BgThreeScene';
/**
 * Demonstrates presets that extend the default preset (initial state)
 * as well as presets which extend the current state
 */
class BgComponent extends Component {
  constructor(props) {
    super(props);

    const initialState = {
      cote_a: 200,
      cote_b: 200,
      e_nervure: 10,
      titre: ' Croisée d\'ogive ',
    };

    this.state = {
      data: initialState,
      defaultData: initialState
    };
  }
  // Update Component Parent
  handleButtonClick = () => {
    console.log("Button was clicked.");
    this.props.updateParam(this.state.data.cote_a, this.state.data.cote_b, this.state.data.e_nervure);

  };

  // Update current state with changes from controls
  handleUpdate = newData =>{
    this.setState(prevState => ({
      data: { ...prevState.data, ...newData }
    })
    );
    this.handleButtonClick();
  }

  render() {
    const { data, defaultData } = this.state;

    return (
      <main style={{ marginRight: '350px' }}>
        <BgParam data={data} />

        <DatGui data={data} onUpdate={this.handleUpdate}>

           <DatNumber 
            path="cote_a"
            label="Coté a (cm)"
            min={100}
            max={600}
            step={1}            
          />
          <DatNumber
            path="cote_b"
            label="Coté b (cm)"
            min={100}
            max={600}
            step={1}
          />
          <DatNumber
            path="e_nervure"
            label="e_nervure (cm)"
            min={1}
            max={50}
            step={1}
          />
         
        </DatGui>
      </main>
    );
  }
}

export default BgComponent;