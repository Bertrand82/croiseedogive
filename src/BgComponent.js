import 'react-dat-gui/dist/index.css';

import DatGui, {
  DatNumber,
  DatString,
  DatButton,
  DatFolder
} from 'react-dat-gui';
import React, { Component } from 'react';

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
      nbBriqueNervureParMetre:5,     
      prixUnitaireBriqueNervure:2.7,
      nbBriqueVoutinParMetre2:6.5,
      prixUnitaireBriqueVoutin:5.45
    };

    this.state = {
      data: initialState,
      defaultData: initialState
    };
  }


  // Update current state with changes from controls
  handleUpdate = newData => {
    this.setState(prevState => ({
      data: { ...prevState.data, ...newData }
    })
    );
    // Update parent
    this.props.updateParam(this.state.data);
  }

  render() {
    const { data, defaultData } = this.state;

    return (
      <main style={{ marginRight: '350px' }}>

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
          <DatFolder title="Brique Nervures">
            <DatNumber
              path="nbBriqueNervureParMetre"
              label="Nb Briques / metre"
              min={2}
              max={50}
              step={0.1}
            />
            <DatNumber
              path="prixUnitaireBriqueNervure"
              label="Prix Unitaire "
              min={0.5}
              max={20}
              step={0.1}
            />

          </DatFolder>
          <DatFolder title="Briques Voutins">
            <DatNumber
              path="nbBriqueVoutinParMetre2"
              label="Nb Briques / m2"
              min={2}
              max={100}
              step={0.1}
            />
            <DatNumber
              path="prixUnitaireBriqueVoutin"
              label="Prix Unitaire "
              min={0.5}
              max={20}
              step={0.1}
            />

          </DatFolder>
        </DatGui>
      </main>
    );
  }
}

export default BgComponent;