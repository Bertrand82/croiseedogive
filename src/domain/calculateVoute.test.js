import calculateVoute from './calculateVoute';

describe('calculateVoute', () => {
  const params = {
    cote_a: 200,
    cote_b: 200,
    e_nervure: 10,
    nbBriqueNervureParMetre: 5,
    prixUnitaireBriqueNervure: 2.7,
    nbBriqueVoutinParMetre2: 6.5,
    prixUnitaireBriqueVoutin: 5.45
  };

  it('computes the expected derived values for a known set of inputs', () => {
    const result = calculateVoute(params);

    expect(result.diagonale).toBe('283');
    expect(result.hauteurExtrados).toBe(141.5);
    expect(result.centre_a).toBe('150');
    expect(result.centre_b).toBe('150');
    expect(result.rayon_a).toBe(140);
    expect(result.rayon_b).toBe(140);
    expect(result.rayonDiagonale).toBe(131.5);
    expect(result.longueurTotaleArrete).toBe('2207');
    expect(result.surfaceTotaleVoutins).toBe('69022');
    expect(result.nbTotalBriquesNervures).toBe('110');
    expect(result.nbTotalBriquesVoutins).toBe('45');
    expect(result.prixTotalBriquesNervures).toBe('297');
    expect(result.prixTotalBriquesVoutins).toBe('245');
    expect(result.prixTotalBriques).toBe('542.25');
  });

  it('does not mutate the input params object', () => {
    const input = { ...params };
    const inputSnapshot = { ...input };

    calculateVoute(input);

    expect(input).toEqual(inputSnapshot);
  });

  it('returns a new object distinct from the input', () => {
    const result = calculateVoute(params);

    expect(result).not.toBe(params);
  });
});
