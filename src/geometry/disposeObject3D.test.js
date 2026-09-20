import disposeObject3D from './disposeObject3D';

function createMockMesh({ withTexture = false } = {}) {
  const geometry = { dispose: jest.fn() };
  const texture = withTexture ? { dispose: jest.fn() } : undefined;
  const material = { dispose: jest.fn(), map: texture };

  return { geometry, material, children: [] };
}

describe('disposeObject3D', () => {
  it('does not throw on null/undefined input', () => {
    expect(() => disposeObject3D(null)).not.toThrow();
    expect(() => disposeObject3D(undefined)).not.toThrow();
  });

  it('does not throw on a simple object without geometry/material', () => {
    expect(() => disposeObject3D({ children: [] })).not.toThrow();
  });

  it('calls dispose() on geometry and material of a simple mesh', () => {
    const mesh = createMockMesh();

    disposeObject3D(mesh);

    expect(mesh.geometry.dispose).toHaveBeenCalledTimes(1);
    expect(mesh.material.dispose).toHaveBeenCalledTimes(1);
  });

  it('calls dispose() on textures referenced by the material', () => {
    const mesh = createMockMesh({ withTexture: true });

    disposeObject3D(mesh);

    expect(mesh.material.map.dispose).toHaveBeenCalledTimes(1);
    expect(mesh.material.dispose).toHaveBeenCalledTimes(1);
  });

  it('recursively disposes children geometries and materials', () => {
    const child = createMockMesh();
    const parent = createMockMesh();
    parent.children = [child];

    disposeObject3D(parent);

    expect(parent.geometry.dispose).toHaveBeenCalledTimes(1);
    expect(child.geometry.dispose).toHaveBeenCalledTimes(1);
    expect(child.material.dispose).toHaveBeenCalledTimes(1);
  });

  it('handles an array of materials (multi-material mesh)', () => {
    const materialA = { dispose: jest.fn() };
    const materialB = { dispose: jest.fn() };
    const mesh = { geometry: { dispose: jest.fn() }, material: [materialA, materialB], children: [] };

    disposeObject3D(mesh);

    expect(materialA.dispose).toHaveBeenCalledTimes(1);
    expect(materialB.dispose).toHaveBeenCalledTimes(1);
  });
});
