import React, { Component } from 'react';
import BgComponent from './BgComponent';
class BgCalculVoute extends Component {
    constructor(props) {
        super(props);

        const initialState = {
            cote_a: 200,
            cote_b: 200,
            e_nervure: 10,
            titre: ' Croisée d\'ogive ',
            nbBriqueNervureParMetre: 5,
            prixUnitaireBriqueNervure: 2.7,
            nbBriqueVoutinParMetre2: 6.5,
            prixUnitaireBriqueVoutin: 5.45
        };

        this.state = {
            data: initialState,
        };
    }

    calculDiagonale(data) {
        var dia2 = data.cote_a * data.cote_a + data.cote_b * data.cote_b;
        var dia = Math.sqrt(dia2);
        return Number.parseFloat(dia).toFixed(0);
    }
    calculHauteurExtrados(data) {
        var h = data.diagonale / 2;
        return h;
    }

    calculCentre(cote, hauteur) {
        var a = cote / 2;
        var rTierPoint = (a * a + hauteur * hauteur) / (2 * a);
        return Number.parseFloat(rTierPoint).toFixed(0);
    }
    calculRayon(centre, e) {
        var r = centre - e;
        return r;
    }

    calculRayonDiagonale(data) {
        return data.diagonale / 2 - data.e_nervure;
    }

    calculLongueurTotaleNervureArreteCote(hauteur, centre, rayon) {
        var alpha = Math.asin(hauteur / centre);
        var l = 2 * alpha * rayon;
        console.log(" longueurTotaleNervureArreteCote " + l);
        return l;
    }

    calculLongueurTotaleNervureDiagonale(data) {
        return data.rayonDiagonale * Math.PI;
    }

    calculLongueurArreteTotal = function (data) {
        var hExtrados = data.hauteurExtrados;
        var l = 0;
        l += 2 * data.longueurTotaleArreteCote_a;
        l += 2 * data.longueurTotaleArreteCote_b;
        l += 2 * data.longueurTotaleArreteDiagonale;
        return Number.parseFloat(l).toFixed(0);;
    }

    calculSurfaceTotaleVoutins(data) {
        var hExtrados = data.hauteurExtrados;
        var l_a = data.longueurTotaleArreteCote_a;
        var l_b = data.longueurTotaleArreteCote_b;
        var s = 0;
        s += l_a * data.cote_b / 2;
        s += l_b * data.cote_a / 2;
        return Number.parseFloat(s).toFixed(0);
    }

    calculNbTotalBriquesNervures(data) {
        var n = data.longueurTotaleArrete * data.nbBriqueNervureParMetre / 100;
        return Number.parseFloat(n).toFixed(0);
    }

    calculNbTotalBriquesVoutins(data) {
        var n = data.surfaceTotaleVoutins * data.nbBriqueVoutinParMetre2 / 100 / 100;
        return Number.parseFloat(n).toFixed(0);
    }
    calculPrixTotalBriquesNervures(data) {
        var total = data.nbTotalBriquesNervures * data.prixUnitaireBriqueNervure;
        return Number.parseFloat(total).toFixed(0);
    }
    calculPrixTotalBriquesVoutins(data) {
        var total = data.nbTotalBriquesVoutins * data.prixUnitaireBriqueVoutin;
        return Number.parseFloat(total).toFixed(0);
    }
    calculPrixTotal(data){
        var total = 0;
        
        total+=  data.nbTotalBriquesNervures * data.prixUnitaireBriqueNervure;
        total+=  data.nbTotalBriquesVoutins * data.prixUnitaireBriqueVoutin;
        return Number.parseFloat(total).toFixed(2);
    }
    calculVoute(data) {
        data.diagonale = this.calculDiagonale(data);
        data.hauteurExtrados = this.calculHauteurExtrados(data);
        data.centre_a = this.calculCentre(data.cote_a, data.hauteurExtrados);
        data.centre_b = this.calculCentre(data.cote_b, data.hauteurExtrados);
        data.rayon_a = this.calculRayon(data.centre_a, data.e_nervure);
        data.rayon_b = this.calculRayon(data.centre_b, data.e_nervure);
        data.rayonDiagonale = this.calculRayonDiagonale(data);
        data.longueurTotaleArreteCote_a = this.calculLongueurTotaleNervureArreteCote(data.hauteurExtrados, data.centre_a, data.rayon_a)
        data.longueurTotaleArreteCote_b = this.calculLongueurTotaleNervureArreteCote(data.hauteurExtrados, data.centre_b, data.rayon_b)
        data.longueurTotaleArreteDiagonale = this.calculLongueurTotaleNervureDiagonale(data);
        data.longueurTotaleArrete = this.calculLongueurArreteTotal(data);
        data.surfaceTotaleVoutins = this.calculSurfaceTotaleVoutins(data);
        data.nbTotalBriquesNervures = this.calculNbTotalBriquesNervures(data);
        data.prixTotalBriquesNervures = this.calculPrixTotalBriquesNervures(data);
        data.nbTotalBriquesVoutins = this.calculNbTotalBriquesVoutins(data);
        data.prixTotalBriquesVoutins = this.calculPrixTotalBriquesVoutins(data);
        data.prixTotalBriques = this.calculPrixTotal(data);
        return data;
    }

    updateParam = (d) => {
        console.log("updateParam2 ----- a: " + d.cote_a + "  b: " + d.cote_b + "  e: " + d.e_nervure);
        var newData = this.state.data;
        newData.cote_a = d.cote_a;
        newData.cote_b = d.cote_b;
        newData.e_nervure = d.e_nervure;
        newData.nbBriqueNervureParMetre = d.nbBriqueNervureParMetre;
        newData.prixUnitaireBriqueNervure = d.prixUnitaireBriqueNervure;
        newData.nbBriqueVoutinParMetre2 = d.nbBriqueVoutinParMetre2;
        newData.prixUnitaireBriqueVoutin = d.prixUnitaireBriqueVoutin;
        this.setState({ data: newData });
        this.props.updateParam(this.state.data.cote_a, this.state.data.cote_b, this.state.data.e_nervure);
        ;
    }


    render() {
        var data = this.calculVoute(this.state.data);

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
                <BgComponent updateParam={this.updateParam} data="{data}" cote_a="{data.cote_a}" />

            </section>
        );

    }

}
export default BgCalculVoute;