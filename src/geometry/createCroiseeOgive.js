import * as THREE from 'three';

// Pure geometry builder: no DOM, no React, no renderer dependency.
// Dimensions are expressed in meters, matching the previous inline implementation.
export function createCroiseeOgive(cote1, cote2, epaisseur) {
  const ep = epaisseur;
  const phi = Math.atan(cote2 / cote1);
  const diagonale = Math.sqrt(cote1 * cote1 + cote2 * cote2);
  const hauteur = diagonale / 2;

  const torusMmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  const torusMmaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const torusMmaterial3 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const hCube = 0.01;
  const cubeGeometry = new THREE.CubeGeometry(cote1, hCube, cote2);
  cubeGeometry.translate(0, -hCube / 2, 0);
  const cube = new THREE.Mesh(cubeGeometry, torusMmaterial);
  const croixGeometry1 = new THREE.CubeGeometry(cote1, 0.01, 0.01);
  const croixGeometry2 = new THREE.CubeGeometry(0.01, 0.01, cote2);
  croixGeometry1.translate(0, hauteur, 0);
  croixGeometry2.translate(0, hauteur, 0);
  const croix1 = new THREE.Mesh(croixGeometry1, torusMmaterial);
  const croix2 = new THREE.Mesh(croixGeometry2, torusMmaterial);

  const a1 = cote1 / 2;
  const rTierPoint1 = (a1 * a1 + hauteur * hauteur) / (2 * a1);
  const dx1 = ((cote1 / 2) - rTierPoint1);
  const teta1 = Math.asin(hauteur / rTierPoint1);

  const torusTiersPointGeometry01 = new THREE.TorusBufferGeometry(rTierPoint1, ep, 5, 100, teta1);
  torusTiersPointGeometry01.translate(dx1, 0, -(cote2 / 2 - ep));
  const torusTiersPointGeometry02 = new THREE.TorusBufferGeometry(rTierPoint1, ep, 5, 100, teta1);
  torusTiersPointGeometry02.translate(dx1, 0, cote2 / 2 - ep);
  const torusTiersPointGeometry11 = new THREE.TorusBufferGeometry(rTierPoint1, ep, 5, 100, teta1);
  torusTiersPointGeometry11.translate(dx1, 0, cote2 / 2 - ep);
  const torusTiersPointGeometry12 = new THREE.TorusBufferGeometry(rTierPoint1, ep, 5, 100, teta1);
  torusTiersPointGeometry12.translate(dx1, 0, -(cote2 / 2 - ep));
  const torusTiersPoint01 = new THREE.Mesh(torusTiersPointGeometry01, torusMmaterial);
  const torusTiersPoint02 = new THREE.Mesh(torusTiersPointGeometry02, torusMmaterial);
  const torusTiersPoint11 = new THREE.Mesh(torusTiersPointGeometry11, torusMmaterial);
  const torusTiersPoint12 = new THREE.Mesh(torusTiersPointGeometry12, torusMmaterial);
  torusTiersPoint02.rotation.z += Math.PI;
  torusTiersPoint02.rotation.x += Math.PI;
  torusTiersPoint12.rotation.z += Math.PI;
  torusTiersPoint12.rotation.x += Math.PI;
  torusTiersPoint01.add(torusTiersPoint02);
  torusTiersPoint01.add(torusTiersPoint11);
  torusTiersPoint01.add(torusTiersPoint12);

  const b = cote2 / 2;
  const rTierPoint2 = (b * b + hauteur * hauteur) / (2 * b);
  const dx2 = ((cote2 / 2) - rTierPoint2);
  const teta2 = Math.asin(hauteur / rTierPoint2);
  const torusTiersPointGeometry21 = new THREE.TorusBufferGeometry(rTierPoint2 - ep, ep, 5, 100, teta2);
  torusTiersPointGeometry21.translate(dx2, 0, -(cote1 / 2 - ep));
  const torusTiersPointGeometry22 = new THREE.TorusBufferGeometry(rTierPoint2 - ep, ep, 5, 100, teta2);
  torusTiersPointGeometry22.translate(dx2, 0, cote1 / 2 - ep);
  const torusTiersPointGeometry31 = new THREE.TorusBufferGeometry(rTierPoint2 - ep, ep, 5, 100, teta2);
  torusTiersPointGeometry31.translate(dx2, 0, cote1 / 2 - ep);
  const torusTiersPointGeometry32 = new THREE.TorusBufferGeometry(rTierPoint2 - ep, ep, 5, 100, teta2);
  torusTiersPointGeometry32.translate(dx2, 0, -(cote1 / 2 - ep));
  const torusTiersPoint21 = new THREE.Mesh(torusTiersPointGeometry21, torusMmaterial2);
  const torusTiersPoint22 = new THREE.Mesh(torusTiersPointGeometry22, torusMmaterial2);
  const torusTiersPoint31 = new THREE.Mesh(torusTiersPointGeometry31, torusMmaterial2);
  const torusTiersPoint32 = new THREE.Mesh(torusTiersPointGeometry32, torusMmaterial2);
  torusTiersPoint22.rotation.z += Math.PI;
  torusTiersPoint22.rotation.x += Math.PI;
  torusTiersPoint32.rotation.z += Math.PI;
  torusTiersPoint32.rotation.x += Math.PI;

  torusTiersPoint21.add(torusTiersPoint22);
  torusTiersPoint21.add(torusTiersPoint31);
  torusTiersPoint21.add(torusTiersPoint32);
  torusTiersPoint21.rotation.y = Math.PI / 2;

  const torusCroiseeGeometry = new THREE.TorusBufferGeometry((diagonale / 2) - ep / 2, ep, 5, 100, Math.PI);
  const torusCroisee1 = new THREE.Mesh(torusCroiseeGeometry, torusMmaterial3);
  const torusCroisee2 = new THREE.Mesh(torusCroiseeGeometry, torusMmaterial3);
  torusCroisee1.rotation.y += phi;
  torusCroisee2.rotation.y += -phi;
  const cleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.01);
  cleGeometry.translate(0, hauteur, 0);
  const cle = new THREE.Mesh(cleGeometry, torusMmaterial);

  cle.add(torusCroisee1);
  cle.add(torusCroisee2);
  cle.add(torusTiersPoint01);
  cle.add(torusTiersPoint21);
  cle.add(cube);
  cle.add(croix1);
  cle.add(croix2);

  return cle;
}

export default createCroiseeOgive;
