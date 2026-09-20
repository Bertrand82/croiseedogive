import * as THREE from 'three';
import createCroiseeOgive from './createCroiseeOgive';

describe('createCroiseeOgive', () => {
  it('returns a THREE.Object3D without throwing for valid dimensions', () => {
    let result;

    expect(() => {
      result = createCroiseeOgive(2, 2, 0.1);
    }).not.toThrow();

    expect(result).toBeInstanceOf(THREE.Object3D);
  });

  it('produces a group with the expected number of top-level children', () => {
    const result = createCroiseeOgive(2, 1.5, 0.1);

    // cube, croix1, croix2, torusTiersPoint01, torusTiersPoint21, torusCroisee1, torusCroisee2
    expect(result.children.length).toBe(7);
  });
});
