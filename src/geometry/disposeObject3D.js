// Recursively disposes geometries, materials and their textures on a THREE.Object3D tree.
function disposeMaterial(material) {
  if (!material) {
    return;
  }

  const materials = Array.isArray(material) ? material : [material];

  materials.forEach((mat) => {
    if (!mat) {
      return;
    }

    Object.keys(mat).forEach((key) => {
      const value = mat[key];
      if (value && typeof value.dispose === 'function') {
        value.dispose();
      }
    });

    if (typeof mat.dispose === 'function') {
      mat.dispose();
    }
  });
}

export function disposeObject3D(object3D) {
  if (!object3D) {
    return;
  }

  if (object3D.geometry && typeof object3D.geometry.dispose === 'function') {
    object3D.geometry.dispose();
  }

  disposeMaterial(object3D.material);

  if (Array.isArray(object3D.children)) {
    object3D.children.forEach((child) => disposeObject3D(child));
  }
}

export default disposeObject3D;
