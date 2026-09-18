import BgComponent from './BgComponent';
import BgCalculVoute from './BgCalculVoute';
import BgThreeScene from './BgThreeScene';

function enableSynchronousSetState(component) {
  component.setState = updater => {
    const partialState = typeof updater === 'function'
      ? updater(component.state, component.props)
      : updater;

    component.state = {
      ...component.state,
      ...partialState
    };
  };
}

describe('parameter propagation', () => {
  it('BgComponent forwards the merged control data to its parent', () => {
    const updateParam = jest.fn();
    const component = new BgComponent({ updateParam });

    enableSynchronousSetState(component);
    component.handleUpdate({ cote_a: 250 });

    expect(updateParam).toHaveBeenCalledWith(
      expect.objectContaining({
        cote_a: 250,
        cote_b: 200,
        e_nervure: 10,
        nbBriqueNervureParMetre: 5
      })
    );
  });

  it('BgCalculVoute computes a new object without mutating the source data', () => {
    const component = new BgCalculVoute({ updateParam: jest.fn() });
    const input = {
      cote_a: 200,
      cote_b: 300,
      e_nervure: 10,
      nbBriqueNervureParMetre: 5,
      prixUnitaireBriqueNervure: 2.7,
      nbBriqueVoutinParMetre2: 6.5,
      prixUnitaireBriqueVoutin: 5.45
    };

    const result = component.calculVoute(input);

    expect(result).not.toBe(input);
    expect(input.diagonale).toBeUndefined();
    expect(result.diagonale).toBeDefined();
    expect(result.cote_a).toBe(200);
    expect(result.cote_b).toBe(300);
  });

  it('BgCalculVoute forwards the merged parameter object to its parent', () => {
    const updateParam = jest.fn();
    const component = new BgCalculVoute({ updateParam });

    enableSynchronousSetState(component);
    component.updateParam({ cote_a: 320, e_nervure: 12 });

    expect(component.state.data).toEqual(
      expect.objectContaining({
        cote_a: 320,
        cote_b: 200,
        e_nervure: 12,
        nbBriqueVoutinParMetre2: 6.5
      })
    );
    expect(updateParam).toHaveBeenCalledWith(
      expect.objectContaining({
        cote_a: 320,
        cote_b: 200,
        e_nervure: 12
      })
    );
  });

  it('BgThreeScene rebuilds the geometry from a parameter object', () => {
    const component = new BgThreeScene({});
    component.scene = {
      remove: jest.fn(),
      add: jest.fn()
    };
    component.croiseeOgive = 'old-ogive';
    component.createSimpleCroiseeOgive = jest.fn(() => 'new-ogive');

    enableSynchronousSetState(component);
    component.updateParam({ cote_a: 300, cote_b: 250, e_nervure: 12 });

    expect(component.state.data).toEqual(
      expect.objectContaining({
        cote_a: 300,
        cote_b: 250,
        e_nervure: 12,
        prixUnitaireBriqueVoutin: 5.45
      })
    );
    expect(component.scene.remove).toHaveBeenCalledWith('old-ogive');
    expect(component.createSimpleCroiseeOgive).toHaveBeenCalledWith(3, 2.5, 0.12);
    expect(component.scene.add).toHaveBeenCalledWith('new-ogive');
  });
});
