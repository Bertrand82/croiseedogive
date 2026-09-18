import * as THREE from 'three';
import disposeObject3D from './disposeObject3D';

describe('disposeObject3D', () => {
  it('recursively disposes geometries, materials and textures', () => {
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const texture = new THREE.Texture();
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const childMaterial = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, [material, childMaterial]);

    const geometryDisposeSpy = jest.spyOn(geometry, 'dispose');
    const textureDisposeSpy = jest.spyOn(texture, 'dispose');
    const materialDisposeSpy = jest.spyOn(material, 'dispose');
    const childMaterialDisposeSpy = jest.spyOn(childMaterial, 'dispose');

    group.add(new THREE.Group().add(mesh));

    disposeObject3D(group);

    expect(geometryDisposeSpy).toHaveBeenCalledTimes(1);
    expect(textureDisposeSpy).toHaveBeenCalledTimes(1);
    expect(materialDisposeSpy).toHaveBeenCalledTimes(1);
    expect(childMaterialDisposeSpy).toHaveBeenCalledTimes(1);
  });
});
