import * as THREE from 'three';
import createSimpleCroiseeOgive from './createCroiseeOgive';

describe('createSimpleCroiseeOgive', () => {
  it('returns a Three.js object without relying on the DOM', () => {
    const previousDocument = global.document;

    global.document = undefined;

    try {
      const object3D = createSimpleCroiseeOgive({
        cote_a: 2,
        cote_b: 3,
        e_nervure: 0.1
      });

      expect(object3D).toBeInstanceOf(THREE.Object3D);
    } finally {
      global.document = previousDocument;
    }
  });

  it('preserves the expected top-level geometry structure', () => {
    const object3D = createSimpleCroiseeOgive({
      cote_a: 2,
      cote_b: 3,
      e_nervure: 0.1
    });

    expect(object3D).toBeInstanceOf(THREE.Mesh);
    expect(object3D.geometry.type).toBe('CylinderGeometry');
    expect(object3D.children).toHaveLength(7);
    expect(object3D.children[0].geometry.parameters.arc).toBeCloseTo(Math.PI);
    expect(object3D.children[1].geometry.parameters.arc).toBeCloseTo(Math.PI);
  });
});
