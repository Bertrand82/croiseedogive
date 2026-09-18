const MATERIAL_TEXTURE_KEYS = [
  'alphaMap',
  'aoMap',
  'bumpMap',
  'displacementMap',
  'emissiveMap',
  'envMap',
  'gradientMap',
  'lightMap',
  'map',
  'metalnessMap',
  'normalMap',
  'roughnessMap',
  'specularMap'
];

function disposeTextureValue(value, disposedTextures, visitedValues) {
  if (!value || typeof value !== 'object') {
    return;
  }

  if (visitedValues.has(value)) {
    return;
  }

  visitedValues.add(value);

  if (value.isTexture && typeof value.dispose === 'function') {
    if (!disposedTextures.has(value)) {
      disposedTextures.add(value);
      value.dispose();
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => disposeTextureValue(entry, disposedTextures, visitedValues));
    return;
  }

  Object.values(value).forEach((entry) => disposeTextureValue(entry, disposedTextures, visitedValues));
}

function disposeMaterial(material, disposedTextures) {
  if (!material) {
    return;
  }

  const visitedValues = new WeakSet();

  MATERIAL_TEXTURE_KEYS.forEach((key) => {
    disposeTextureValue(material[key], disposedTextures, visitedValues);
  });

  disposeTextureValue(material.uniforms, disposedTextures, visitedValues);
  disposeTextureValue(material.userData, disposedTextures, visitedValues);

  if (typeof material.dispose === 'function') {
    material.dispose();
  }
}

export default function disposeObject3D(object3D) {
  if (!object3D || typeof object3D.traverse !== 'function') {
    return;
  }

  const disposedTextures = new WeakSet();

  object3D.traverse((node) => {
    if (node.geometry && typeof node.geometry.dispose === 'function') {
      node.geometry.dispose();
    }

    if (Array.isArray(node.material)) {
      node.material.forEach((material) => disposeMaterial(material, disposedTextures));
      return;
    }

    disposeMaterial(node.material, disposedTextures);
  });
}
