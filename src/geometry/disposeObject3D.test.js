import * as THREE from 'three';
import disposeObject3D from './disposeObject3D';

describe('disposeObject3D', () => {
  it('returns safely for non-Object3D inputs', () => {
    expect(() => disposeObject3D(null)).not.toThrow();
    expect(() => disposeObject3D({})).not.toThrow();
  });

  it('recursively disposes a mesh with a single material', () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const texture = new THREE.Texture();
    const material = new THREE.MeshBasicMaterial();
    material.userData.extraTextures = [texture];
    const mesh = new THREE.Mesh(geometry, material);

    const geometryDisposeSpy = jest.spyOn(geometry, 'dispose');
    const textureDisposeSpy = jest.spyOn(texture, 'dispose');
    const materialDisposeSpy = jest.spyOn(material, 'dispose');

    disposeObject3D(mesh);

    expect(geometryDisposeSpy).toHaveBeenCalledTimes(1);
    expect(textureDisposeSpy).toHaveBeenCalledTimes(1);
    expect(materialDisposeSpy).toHaveBeenCalledTimes(1);
  });

  it('disposes shared textures only once across the same object graph', () => {
    const group = new THREE.Group();
    const sharedTexture = new THREE.Texture();
    const firstMaterial = new THREE.MeshBasicMaterial({ map: sharedTexture });
    const secondMaterial = new THREE.MeshBasicMaterial({ map: sharedTexture });

    group.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), firstMaterial));
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), secondMaterial));

    const sharedTextureDisposeSpy = jest.spyOn(sharedTexture, 'dispose');

    disposeObject3D(group);

    expect(sharedTextureDisposeSpy).toHaveBeenCalledTimes(1);
  });

  it('recursively disposes geometries, materials and textures', () => {
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const texture = new THREE.Texture();
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const childMaterial = new THREE.MeshBasicMaterial();
    childMaterial.userData.extraTextures = [new THREE.Texture()];
    const mesh = new THREE.Mesh(geometry, [material, childMaterial]);

    const geometryDisposeSpy = jest.spyOn(geometry, 'dispose');
    const textureDisposeSpy = jest.spyOn(texture, 'dispose');
    const materialDisposeSpy = jest.spyOn(material, 'dispose');
    const childMaterialDisposeSpy = jest.spyOn(childMaterial, 'dispose');
    const childTextureDisposeSpy = jest.spyOn(childMaterial.userData.extraTextures[0], 'dispose');

    group.add(new THREE.Group().add(mesh));

    disposeObject3D(group);

    expect(geometryDisposeSpy).toHaveBeenCalledTimes(1);
    expect(textureDisposeSpy).toHaveBeenCalledTimes(1);
    expect(materialDisposeSpy).toHaveBeenCalledTimes(1);
    expect(childMaterialDisposeSpy).toHaveBeenCalledTimes(1);
    expect(childTextureDisposeSpy).toHaveBeenCalledTimes(1);
  });
});
