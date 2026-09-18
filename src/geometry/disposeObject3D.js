function disposeMaterial(material) {
  if (!material) {
    return;
  }

  const visited = new WeakSet();

  const disposeOwnedTextures = (value) => {
    if (!value || typeof value !== 'object') {
      return;
    }

    if (value.isTexture && typeof value.dispose === 'function') {
      value.dispose();
      return;
    }

    if (visited.has(value)) {
      return;
    }

    visited.add(value);

    if (Array.isArray(value)) {
      value.forEach(disposeOwnedTextures);
      return;
    }

    Object.values(value).forEach(disposeOwnedTextures);
  };

  disposeOwnedTextures(material);

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
