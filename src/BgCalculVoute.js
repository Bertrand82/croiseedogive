import React, { Component } from 'react';
import BgComponent from './BgComponent';
import calculateVoute from './domain/calculateVoute';

const initialData = {
    cote_a: 200,
    cote_b: 200,
    e_nervure: 10,
    titre: ' Croisée d\'ogive ',
    nbBriqueNervureParMetre: 5,
    prixUnitaireBriqueNervure: 2.7,
    nbBriqueVoutinParMetre2: 6.5,
    prixUnitaireBriqueVoutin: 5.45
};

class BgCalculVoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: initialData,
        };
    }

    updateParam = (newParams) => {
        const mergedData = { ...this.state.data, ...newParams };
        this.setState({ data: mergedData });
        // Transmit the freshly merged data, not the stale pre-setState state
        this.props.updateParam(mergedData);
    }


    render() {
        var data = calculateVoute(this.state.data);

        return (

            <section>
                <h2>Paramètres :</h2>
                <table border="1">
                    <tr>
                        <td>titre:</td><td> {data.titre}</td><td></td>
                    </tr>
                    <tr>
                        <td>Coté a:</td>
                        <td> {data.cote_a}</td>
                        <td>Longueur d'un coté en cm (extrados)</td>
                    </tr>
                    <tr>
                        <td>Coté b:</td>
                        <td> {data.cote_b}</td>
                        <td>Longueur de l'autre coté en cm (extrados) </td>
                    </tr>
                    <tr>
                        <td>Epaisseur Nervure:</td>
                        <td> {data.e_nervure}</td>
                        <td>Epaisseur des nervures en cm</td>
                    </tr>
                    <tr>
                        <td>Diagonale :</td>
                        <td> {data.diagonale}</td>
                        <td>Longueur de la diagonale (extrados)</td>
                    </tr>
                    <tr>
                        <td>Hauteur :</td><td> {data.hauteurExtrados}</td>
                        <td>Hauteur (extrados)</td>
                    </tr>
                    <tr>
                        <td>Position centre a : </td>
                        <td> {data.centre_a}</td>
                        <td>Permet de dessiner le coffrage du coté a . (voir rayon plus bas)</td>
                    </tr>
                    <tr>
                        <td>Position centre b :</td><td>  {data.centre_b}</td><td></td>
                    </tr>
                    <tr>
                        <td>rayon  a:</td>
                        <td>{data.rayon_a}</td>
                        <td>Permet de dessiner le coffrage du coté a . (Avec la position du centre a)</td>
                    </tr>
                    <tr>
                        <td>rayon  b:</td>
                        <td>{data.rayon_b}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>rayon  diagonale:</td>
                        <td>{data.rayonDiagonale}</td>
                        <td>Permet de dessiner le coffrage de la croisee</td>
                    </tr>
                    <tr>
                        <td>Longueur totale arrêtes:</td>
                        <td>{data.longueurTotaleArrete}</td>
                        <td>Permet d'estimer le nombre de briques necessaires pour les arrêtes</td>
                    </tr>
                    <tr>
                        <td>Surface totale voutins:</td>
                        <td>{data.surfaceTotaleVoutins}</td>
                        <td>Permet d'estimer le nombre de briques necessaires pour la constructions des voutins</td>
                    </tr>
                    <tr>
                        <td>Nervures : Nombre de briques / m:</td>
                        <td>{data.nbBriqueNervureParMetre}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Prix unitaire brique nervure:</td>
                        <td>{data.prixUnitaireBriqueNervure}</td>
                        <td>Euros</td>
                    </tr>
                    <tr>
                        <td>Nb total de briques nervure:</td>
                        <td>{data.nbTotalBriquesNervures}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Prix total  briques nervure:</td>
                        <td>{data.prixTotalBriquesNervures}</td>
                        <td>Euros</td>
                    </tr>
                    <tr>
                        <td>Prix unitaire brique voutin:</td>
                        <td>{data.prixUnitaireBriqueVoutin}</td>
                        <td>Euros</td>
                    </tr>

                    <tr>
                        <td>Voutins : Nombre de briques / m2:</td>
                        <td>{data.nbBriqueVoutinParMetre2}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Nb total de briques voutins:</td>
                        <td>{data.nbTotalBriquesVoutins}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Prix total  briques voutins:</td>
                        <td>{data.prixTotalBriquesVoutins}</td>
                        <td>Euros</td>
                    </tr>
                    <tr>
                        <td>prixTotalBriques:</td>
                        <td>{data.prixTotalBriques}</td>
                        <td>Euros</td>
                    </tr>



                </table>
                <BgComponent updateParam={this.updateParam} />

            </section>
        );

    }

}
export default BgCalculVoute;