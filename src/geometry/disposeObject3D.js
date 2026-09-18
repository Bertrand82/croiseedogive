function disposeMaterial(material) {
  if (!material) {
    return;
  }

  Object.values(material).forEach((value) => {
    if (value && value.isTexture && typeof value.dispose === 'function') {
      value.dispose();
    }
  });

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
