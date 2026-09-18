import * as THREE from 'three';

function validatePositiveDimension(name, value) {
  if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
    throw new Error(`${name} must be a positive number expressed in meters.`);
  }
}

function validateInnerRadius(name, radius) {
  if (radius <= 0) {
    throw new Error(`${name} must stay positive after subtracting the rib thickness.`);
  }
}

/**
 * Build the croisée d'ogive geometry.
 *
 * Input units:
 * - cote_a: extrados side A length in meters
 * - cote_b: extrados side B length in meters
 * - e_nervure: rib thickness in meters
 */
export function createSimpleCroiseeOgive({ cote_a, cote_b, e_nervure }) {
  validatePositiveDimension('cote_a', cote_a);
  validatePositiveDimension('cote_b', cote_b);
  validatePositiveDimension('e_nervure', e_nervure);

  const phi = Math.atan(cote_b / cote_a);
  const diagonale = Math.sqrt(cote_a * cote_a + cote_b * cote_b);
  const hauteur = diagonale / 2;

  const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  const torusMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const torusMaterial3 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const hCube = 0.01;

  const cubeGeometry = new THREE.BoxGeometry(cote_a, hCube, cote_b);
  cubeGeometry.translate(0, -hCube / 2, 0);
  const cube = new THREE.Mesh(cubeGeometry, torusMaterial);

  const croixGeometry1 = new THREE.BoxGeometry(cote_a, 0.01, 0.01);
  const croixGeometry2 = new THREE.BoxGeometry(0.01, 0.01, cote_b);
  croixGeometry1.translate(0, hauteur, 0);
  croixGeometry2.translate(0, hauteur, 0);
  const croix1 = new THREE.Mesh(croixGeometry1, torusMaterial);
  const croix2 = new THREE.Mesh(croixGeometry2, torusMaterial);

  const a1 = cote_a / 2;
  const rTierPoint1 = (a1 * a1 + hauteur * hauteur) / (2 * a1);
  const dx1 = (cote_a / 2) - rTierPoint1;
  const teta1 = Math.asin(hauteur / rTierPoint1);

  const torusTiersPointGeometry01 = new THREE.TorusBufferGeometry(rTierPoint1, e_nervure, 5, 100, teta1);
  torusTiersPointGeometry01.translate(dx1, 0, -(cote_b / 2 - e_nervure));
  const torusTiersPointGeometry02 = new THREE.TorusBufferGeometry(rTierPoint1, e_nervure, 5, 100, teta1);
  torusTiersPointGeometry02.translate(dx1, 0, cote_b / 2 - e_nervure);
  const torusTiersPointGeometry11 = new THREE.TorusBufferGeometry(rTierPoint1, e_nervure, 5, 100, teta1);
  torusTiersPointGeometry11.translate(dx1, 0, cote_b / 2 - e_nervure);
  const torusTiersPointGeometry12 = new THREE.TorusBufferGeometry(rTierPoint1, e_nervure, 5, 100, teta1);
  torusTiersPointGeometry12.translate(dx1, 0, -(cote_b / 2 - e_nervure));

  const torusTiersPoint01 = new THREE.Mesh(torusTiersPointGeometry01, torusMaterial);
  const torusTiersPoint02 = new THREE.Mesh(torusTiersPointGeometry02, torusMaterial);
  const torusTiersPoint11 = new THREE.Mesh(torusTiersPointGeometry11, torusMaterial);
  const torusTiersPoint12 = new THREE.Mesh(torusTiersPointGeometry12, torusMaterial);
  torusTiersPoint02.rotation.z += Math.PI;
  torusTiersPoint02.rotation.x += Math.PI;
  torusTiersPoint12.rotation.z += Math.PI;
  torusTiersPoint12.rotation.x += Math.PI;
  torusTiersPoint01.add(torusTiersPoint02);
  torusTiersPoint01.add(torusTiersPoint11);
  torusTiersPoint01.add(torusTiersPoint12);

  const b = cote_b / 2;
  const rTierPoint2 = (b * b + hauteur * hauteur) / (2 * b);
  const dx2 = (cote_b / 2) - rTierPoint2;
  const teta2 = Math.asin(hauteur / rTierPoint2);
  const rayonTierPoint2 = rTierPoint2 - e_nervure;

  validateInnerRadius('side-b rib radius', rayonTierPoint2);

  const torusTiersPointGeometry21 = new THREE.TorusBufferGeometry(rayonTierPoint2, e_nervure, 5, 100, teta2);
  torusTiersPointGeometry21.translate(dx2, 0, -(cote_a / 2 - e_nervure));
  const torusTiersPointGeometry22 = new THREE.TorusBufferGeometry(rayonTierPoint2, e_nervure, 5, 100, teta2);
  torusTiersPointGeometry22.translate(dx2, 0, cote_a / 2 - e_nervure);
  const torusTiersPointGeometry31 = new THREE.TorusBufferGeometry(rayonTierPoint2, e_nervure, 5, 100, teta2);
  torusTiersPointGeometry31.translate(dx2, 0, cote_a / 2 - e_nervure);
  const torusTiersPointGeometry32 = new THREE.TorusBufferGeometry(rayonTierPoint2, e_nervure, 5, 100, teta2);
  torusTiersPointGeometry32.translate(dx2, 0, -(cote_a / 2 - e_nervure));

  const torusTiersPoint21 = new THREE.Mesh(torusTiersPointGeometry21, torusMaterial2);
  const torusTiersPoint22 = new THREE.Mesh(torusTiersPointGeometry22, torusMaterial2);
  const torusTiersPoint31 = new THREE.Mesh(torusTiersPointGeometry31, torusMaterial2);
  const torusTiersPoint32 = new THREE.Mesh(torusTiersPointGeometry32, torusMaterial2);
  torusTiersPoint22.rotation.z += Math.PI;
  torusTiersPoint22.rotation.x += Math.PI;
  torusTiersPoint32.rotation.z += Math.PI;
  torusTiersPoint32.rotation.x += Math.PI;
  torusTiersPoint21.add(torusTiersPoint22);
  torusTiersPoint21.add(torusTiersPoint31);
  torusTiersPoint21.add(torusTiersPoint32);
  torusTiersPoint21.rotation.y = Math.PI / 2;

  const torusCroiseeGeometry = new THREE.TorusBufferGeometry((diagonale / 2) - e_nervure / 2, e_nervure, 5, 100, Math.PI);
  const torusCroisee1 = new THREE.Mesh(torusCroiseeGeometry, torusMaterial3);
  const torusCroisee2 = new THREE.Mesh(torusCroiseeGeometry, torusMaterial3);
  torusCroisee1.rotation.y += phi;
  torusCroisee2.rotation.y += -phi;

  const cleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.01);
  cleGeometry.translate(0, hauteur, 0);
  const cle = new THREE.Mesh(cleGeometry, torusMaterial);

  cle.add(torusCroisee1);
  cle.add(torusCroisee2);
  cle.add(torusTiersPoint01);
  cle.add(torusTiersPoint21);
  cle.add(cube);
  cle.add(croix1);
  cle.add(croix2);

  return cle;
}

export default createSimpleCroiseeOgive;
