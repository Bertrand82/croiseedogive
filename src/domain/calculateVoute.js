// Pure calculation module for the "croisée d'ogives" vault.
// No React, no mutation of inputs: every function returns new values.

function calculDiagonale({ cote_a, cote_b }) {
  const dia2 = cote_a * cote_a + cote_b * cote_b;
  const dia = Math.sqrt(dia2);
  return Number.parseFloat(dia).toFixed(0);
}

function calculHauteurExtrados(diagonale) {
  return diagonale / 2;
}

function calculCentre(cote, hauteur) {
  const a = cote / 2;
  const rTierPoint = (a * a + hauteur * hauteur) / (2 * a);
  return Number.parseFloat(rTierPoint).toFixed(0);
}

function calculRayon(centre, e) {
  return centre - e;
}

function calculRayonDiagonale(diagonale, e_nervure) {
  return diagonale / 2 - e_nervure;
}

function calculLongueurTotaleNervureArreteCote(hauteur, centre, rayon) {
  const alpha = Math.asin(hauteur / centre);
  return 2 * alpha * rayon;
}

function calculLongueurTotaleNervureDiagonale(rayonDiagonale) {
  return rayonDiagonale * Math.PI;
}

function calculLongueurArreteTotal({
  longueurTotaleArreteCote_a,
  longueurTotaleArreteCote_b,
  longueurTotaleArreteDiagonale
}) {
  let l = 0;
  l += 2 * longueurTotaleArreteCote_a;
  l += 2 * longueurTotaleArreteCote_b;
  l += 2 * longueurTotaleArreteDiagonale;
  return Number.parseFloat(l).toFixed(0);
}

function calculSurfaceTotaleVoutins({
  longueurTotaleArreteCote_a,
  longueurTotaleArreteCote_b,
  cote_a,
  cote_b
}) {
  let s = 0;
  s += longueurTotaleArreteCote_a * cote_b / 2;
  s += longueurTotaleArreteCote_b * cote_a / 2;
  return Number.parseFloat(s).toFixed(0);
}

function calculNbTotalBriquesNervures({ longueurTotaleArrete, nbBriqueNervureParMetre }) {
  const n = longueurTotaleArrete * nbBriqueNervureParMetre / 100;
  return Number.parseFloat(n).toFixed(0);
}

function calculNbTotalBriquesVoutins({ surfaceTotaleVoutins, nbBriqueVoutinParMetre2 }) {
  const n = surfaceTotaleVoutins * nbBriqueVoutinParMetre2 / 100 / 100;
  return Number.parseFloat(n).toFixed(0);
}

function calculPrixTotalBriquesNervures({ nbTotalBriquesNervures, prixUnitaireBriqueNervure }) {
  const total = nbTotalBriquesNervures * prixUnitaireBriqueNervure;
  return Number.parseFloat(total).toFixed(0);
}

function calculPrixTotalBriquesVoutins({ nbTotalBriquesVoutins, prixUnitaireBriqueVoutin }) {
  const total = nbTotalBriquesVoutins * prixUnitaireBriqueVoutin;
  return Number.parseFloat(total).toFixed(0);
}

function calculPrixTotal({
  nbTotalBriquesNervures,
  prixUnitaireBriqueNervure,
  nbTotalBriquesVoutins,
  prixUnitaireBriqueVoutin
}) {
  let total = 0;
  total += nbTotalBriquesNervures * prixUnitaireBriqueNervure;
  total += nbTotalBriquesVoutins * prixUnitaireBriqueVoutin;
  return Number.parseFloat(total).toFixed(2);
}

// Takes the raw user params and returns a NEW object with every derived value.
// The input object is never mutated.
export function calculateVoute(params) {
  const result = { ...params };

  result.diagonale = calculDiagonale(result);
  result.hauteurExtrados = calculHauteurExtrados(result.diagonale);
  result.centre_a = calculCentre(result.cote_a, result.hauteurExtrados);
  result.centre_b = calculCentre(result.cote_b, result.hauteurExtrados);
  result.rayon_a = calculRayon(result.centre_a, result.e_nervure);
  result.rayon_b = calculRayon(result.centre_b, result.e_nervure);
  result.rayonDiagonale = calculRayonDiagonale(result.diagonale, result.e_nervure);
  result.longueurTotaleArreteCote_a = calculLongueurTotaleNervureArreteCote(
    result.hauteurExtrados,
    result.centre_a,
    result.rayon_a
  );
  result.longueurTotaleArreteCote_b = calculLongueurTotaleNervureArreteCote(
    result.hauteurExtrados,
    result.centre_b,
    result.rayon_b
  );
  result.longueurTotaleArreteDiagonale = calculLongueurTotaleNervureDiagonale(result.rayonDiagonale);
  result.longueurTotaleArrete = calculLongueurArreteTotal(result);
  result.surfaceTotaleVoutins = calculSurfaceTotaleVoutins(result);
  result.nbTotalBriquesNervures = calculNbTotalBriquesNervures(result);
  result.prixTotalBriquesNervures = calculPrixTotalBriquesNervures(result);
  result.nbTotalBriquesVoutins = calculNbTotalBriquesVoutins(result);
  result.prixTotalBriquesVoutins = calculPrixTotalBriquesVoutins(result);
  result.prixTotalBriques = calculPrixTotal(result);

  return result;
}

export default calculateVoute;
