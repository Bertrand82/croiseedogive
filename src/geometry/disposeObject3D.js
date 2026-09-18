function disposeMaterial(material) {
  if (!material) {
    return;
  }

  const visited = new WeakSet();

  const disposeOwnedTextures = (value) => {
    if (!value || typeof value !== 'object') {
      return;
    }

    if (visited.has(value)) {
      return;
    }

    visited.add(value);

    if (value.isTexture && typeof value.dispose === 'function') {
      value.dispose();
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(disposeOwnedTextures);
      return;
    }

    Object.values(value).forEach(disposeOwnedTextures);
  };

  Object.keys(material).forEach((key) => {
    disposeOwnedTextures(material[key]);
  });

  if (material.userData) {
    disposeOwnedTextures(material.userData);
  }

  if (typeof material.dispose === 'function') {
    material.dispose();
  }
}

export default function disposeObject3D(object3D) {
  if (!object3D || typeof object3D.traverse !== 'function') {
    return;
  }

  object3D.traverse((node) => {
    if (node.geometry && typeof node.geometry.dispose === 'function') {
      node.geometry.dispose();
    }

    if (Array.isArray(node.material)) {
      node.material.forEach(disposeMaterial);
      return;
    }

    disposeMaterial(node.material);
  });
}
