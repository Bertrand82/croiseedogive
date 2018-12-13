import React, { Component } from 'react';
import TrackballControls from './TrackballControls';

import * as THREE from 'three';

import ThreeScene from './ThreeScene';





class SceneBg extends Component {


    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        this.ii = 0;
        this.nImage = 0;
        var d = new Date();
        this.timeStart = d.getTime();
        this.lastTime = d.getTime();
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            50,
            width / height,
            0.1,
            1000
        )
        this.camera.position.z = 4
        //ADD RENDERER 
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        //ADD CROISEE        
        this.createCroisees();
        this.controls = new TrackballControls(this.camera);
        this.initControls();
        this.start()
    }

    createCroisees() {
        this.cote = 2;
        this.hColonne = 1;
        this.epaisseur = 0.005;
        var cle = this.createStart();
        this.scene.add(cle);
        var axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
        var loader = new THREE.FontLoader();
        loader.load('fonts/helvetiker_regular.typeface.json', function (font) {

            var geometry = new THREE.TextGeometry('Hello three.js!', {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            });
        });
        //this.scene.add(textGeo);
    }

    createStart() {
        this.testWriteText();
        let r = this.getR();
        var torusMmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        var torusTiersPointGeometry = new THREE.TorusBufferGeometry(r, this.epaisseur, 5, 100, 2 * Math.PI);
        this.torusTiersPointCircle = new THREE.Mesh(torusTiersPointGeometry, torusMmaterial);
        this.torusTiersPointCircle.rotation.x += Math.PI / 2;
        var cleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2);
        cleGeometry.translate(0, r, 0);
        var cle = new THREE.Mesh(cleGeometry, torusMmaterial);
        cle.add(this.torusTiersPointCircle);
        return cle;
    }

    getR() {
        let diagonale = 1;
        let r = diagonale / 2;
        return r;
    }

    getD() {
        let diagonale = Math.sqrt(this.cote1 * this.cote1 + this.cote2 * this.cote2);
        let r = this.getR();
        let d = 2 * r * Math.sin(Math.PI / 8);
        console.log(" getD ", d, Math.sin(Math.PI / 8), r);
        return d;
    }

    drawImage_0() {
        let e = 0.005;
        let r = this.getR();
        var torusMmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        var torusTiersPointGeometry = new THREE.TorusBufferGeometry(r, e, 5, 8, 2 * Math.PI);
        this.torusTiersPoint = new THREE.Mesh(torusTiersPointGeometry, torusMmaterial);

        this.torusTiersPoint.rotation.x += Math.PI / 2;
        this.torusTiersPoint.rotation.z += Math.PI / 8;
        this.scene.add(this.torusTiersPoint);
    }

    drawImage_1() {
        this.drawImage_choeur(-1);
    }

    drawImage_2() {
        this.drawImage_choeur(0);
    }
    drawImage_3() {
        this.drawImage_choeur(1);
    }
    drawImage_4() {
        this.drawImage_choeur(2);
    }
    drawImage_5() {
        this.drawImage_choeur(3);
    }
    drawImage_6() {
        this.drawImage_choeur(4);
    }
    drawImage_7() {
        this.torusTiersPoint.translateZ(this.hColonne);
        this.torusTiersPointCircle.translateZ(this.hColonne);

        this.addColonne(1);
        this.addColonne(2);
        this.addColonne(3);
        this.addColonne(4);
        this.addColonne(5);
        this.addColonne(6);
    }
    drawImage_8() {
        this.addCroisee(1);
    }
    drawImage_9() {
        this.addCroisee(2);
    }
    drawImage_10() {
        this.addCroisee(3);
    }
    drawImage_11() {
        this.addCroisee(4);
    }

    drawImage_12() {
        this.addCroisee(5);
    }

    drawImage_13() {
        this.addChapelle(2);
    }
    drawImage_14() {
        this.addChapelle(3);
    }
    drawImage_15() {
        this.addChapelle(4);
        this.addChapelle(5);
    }
    drawImage_16() {
        this.epaisseur = 0.51;;
        this.scene = new THREE.Scene();
        var j;
        for (j = 1; j < 16; j++) {
            let s = 'drawImage_' + j;
            this[s]();
        }

    }

    addChapelle(n) {
        let cote = this.getR() / 2;
        let r = Math.sqrt(2 * cote * cote) / 2;
        let hPillierChapelle = this.hColonne - r;
        let dY = this.getR() + cote / 2;
        var croisee1 = this.createChapelleCroiseeOgive(cote, hPillierChapelle);

        croisee1.translateZ(n * this.getD());
        croisee1.translateX(dY);
        croisee1.translateY(-r);
        var croisee2 = this.createChapelleCroiseeOgive(cote, hPillierChapelle);
        croisee2.translateZ(n * this.getD());
        croisee2.translateX(-dY);
        croisee2.translateY(-r);
        this.scene.add(croisee1);
        this.scene.add(croisee2);

    }

    createChapelleCroiseeOgive(cote, hPillierChapelle) {
        let e = 0.01;
        let cote1 = this.cote2;
        let cote2 = this.cote2;
        return this.createGenericCroiseeOgive(cote1, cote2, e, hPillierChapelle);
    }

    addCroisee(n) {
        var croisee = this.createMainCroiseeOgive();
        croisee.translateZ(n * this.getD());
        this.scene.add(croisee);

    }

    createMainCroiseeOgive() {
        let e = 0.01;
        let cote1 = 2 * this.getR();
        this.cote2 = cote1 * Math.sin(Math.PI / 8);

        return this.createGenericCroiseeOgive(cote1, this.cote2, e, this.hColonne);
    }

    createGenericCroiseeOgive(cote1, cote2, e, hColonne) {
        let phi = Math.atan(cote2 / cote1);
        let diagonale = Math.sqrt(cote1 * cote1 + cote2 * cote2);
        let hauteur = diagonale / 2;
        var torusMmaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        var torusMmaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        var hCube = 0.01;
        var cubeGeometry = new THREE.CubeGeometry(cote1, hCube, cote2);
        cubeGeometry.translate(0, -hCube / 2, 0);
        var cube = new THREE.Mesh(cubeGeometry, torusMmaterial);
        var croixGeometry1 = new THREE.CubeGeometry(cote1, 0.01, 0.01);
        var croixGeometry2 = new THREE.CubeGeometry(0.01, 0.01, cote2);
        croixGeometry1.translate(0, hauteur, 0);
        croixGeometry2.translate(0, hauteur, 0);
        var croix1 = new THREE.Mesh(croixGeometry1, torusMmaterial);
        var croix2 = new THREE.Mesh(croixGeometry2, torusMmaterial);

        var a1 = cote1 / 2;
        var rTierPoint1 = (a1 * a1 + hauteur * hauteur) / (2 * a1);
        var dx1 = ((cote1 / 2) - rTierPoint1);
        var teta1 = Math.asin(hauteur / rTierPoint1);

        var torusTiersPointGeometry01 = new THREE.TorusBufferGeometry(rTierPoint1, e, 5, 100, teta1);
        torusTiersPointGeometry01.translate(dx1, 0, -cote2 / 2);
        var torusTiersPointGeometry02 = new THREE.TorusBufferGeometry(rTierPoint1, e, 5, 100, teta1);
        torusTiersPointGeometry02.translate(dx1, 0, cote2 / 2);
        var torusTiersPointGeometry11 = new THREE.TorusBufferGeometry(rTierPoint1, e, 5, 100, teta1);
        torusTiersPointGeometry11.translate(dx1, 0, cote2 / 2);
        var torusTiersPointGeometry12 = new THREE.TorusBufferGeometry(rTierPoint1, e, 5, 100, teta1);
        torusTiersPointGeometry12.translate(dx1, 0, -cote2 / 2);
        var torusTiersPoint01 = new THREE.Mesh(torusTiersPointGeometry01, torusMmaterial);
        var torusTiersPoint02 = new THREE.Mesh(torusTiersPointGeometry02, torusMmaterial);
        var torusTiersPoint11 = new THREE.Mesh(torusTiersPointGeometry11, torusMmaterial);
        var torusTiersPoint12 = new THREE.Mesh(torusTiersPointGeometry12, torusMmaterial);
        torusTiersPoint02.rotation.z += Math.PI;
        torusTiersPoint02.rotation.x += Math.PI;
        torusTiersPoint12.rotation.z += Math.PI;
        torusTiersPoint12.rotation.x += Math.PI;
        torusTiersPoint01.add(torusTiersPoint02);
        torusTiersPoint01.add(torusTiersPoint11);
        torusTiersPoint01.add(torusTiersPoint12);

        var b = cote2 / 2;
        var rTierPoint2 = (b * b + hauteur * hauteur) / (2 * b);
        var dx2 = ((cote2 / 2) - rTierPoint2);
        var teta2 = Math.asin(hauteur / rTierPoint2);
        var torusTiersPointGeometry21 = new THREE.TorusBufferGeometry(rTierPoint2, e, 5, 100, teta2);
        torusTiersPointGeometry21.translate(dx2, 0, -cote1 / 2);
        var torusTiersPointGeometry22 = new THREE.TorusBufferGeometry(rTierPoint2, e, 5, 100, teta2);
        torusTiersPointGeometry22.translate(dx2, 0, cote1 / 2);
        var torusTiersPointGeometry31 = new THREE.TorusBufferGeometry(rTierPoint2, e, 5, 100, teta2);
        torusTiersPointGeometry31.translate(dx2, 0, cote1 / 2);
        var torusTiersPointGeometry32 = new THREE.TorusBufferGeometry(rTierPoint2, e, 5, 100, teta2);
        torusTiersPointGeometry32.translate(dx2, 0, -cote1 / 2);
        var torusTiersPoint21 = new THREE.Mesh(torusTiersPointGeometry21, torusMmaterial2);
        var torusTiersPoint22 = new THREE.Mesh(torusTiersPointGeometry22, torusMmaterial2);
        var torusTiersPoint31 = new THREE.Mesh(torusTiersPointGeometry31, torusMmaterial2);
        var torusTiersPoint32 = new THREE.Mesh(torusTiersPointGeometry32, torusMmaterial2);
        torusTiersPoint22.rotation.z += Math.PI;
        torusTiersPoint22.rotation.x += Math.PI;
        torusTiersPoint32.rotation.z += Math.PI;
        torusTiersPoint32.rotation.x += Math.PI;

        torusTiersPoint21.add(torusTiersPoint22);
        torusTiersPoint21.add(torusTiersPoint31);
        torusTiersPoint21.add(torusTiersPoint32);
        torusTiersPoint21.rotation.y = Math.PI / 2;

        var torusCroiseeGeometry = new THREE.TorusBufferGeometry(diagonale / 2, e, 5, 100, Math.PI);
        var torusCroisee1 = new THREE.Mesh(torusCroiseeGeometry, torusMmaterial);
        var torusCroisee2 = new THREE.Mesh(torusCroiseeGeometry, torusMmaterial);
        torusCroisee1.rotation.y += phi;
        torusCroisee2.rotation.y += -phi;
        var cleGeometry = new THREE.CylinderGeometry(0.06, 0.05, 0.05, 1000);
        cleGeometry.translate(0, hauteur, 0);
        var cleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        var cle = new THREE.Mesh(cleGeometry, torusMmaterial);


        var cubeGeometry1 = new THREE.CubeGeometry(e, hColonne, e);
        cubeGeometry.translate(0, -hColonne, 0);
        cubeGeometry1.translate(0, -hColonne / 2, 0);
        var pillier1 = new THREE.Mesh(cubeGeometry1, torusMmaterial);
        var pillier2 = pillier1.clone();
        var pillier3 = pillier1.clone();
        var pillier4 = pillier1.clone();
        pillier1.translateZ(cote2 / 2).translateX(cote1 / 2);
        pillier2.translateZ(-cote2 / 2).translateX(cote1 / 2);
        pillier3.translateZ(-cote2 / 2).translateX(-cote1 / 2);
        pillier4.translateZ(cote2 / 2).translateX(-cote1 / 2);
        cle.add(pillier1);
        cle.add(pillier2);
        cle.add(pillier3);
        cle.add(pillier4);
        cle.add(torusCroisee1);
        cle.add(torusCroisee2);
        cle.add(torusTiersPoint01);
        cle.add(torusTiersPoint21);
        cle.add(cube);
        cle.add(croix1);
        cle.add(croix2);
        return cle;
    }


    drawImage_choeur(n) {
        let r = this.getR();
        var torusMmaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        var torusTiersPointGeometry = new THREE.TorusBufferGeometry(r, this.epaisseur, 5, 100, Math.PI / 2);
        var torusTiersPoint = new THREE.Mesh(torusTiersPointGeometry, torusMmaterial);
        torusTiersPoint.rotation.y += n * Math.PI / 4 + Math.PI / 8;
        this.scene.add(torusTiersPoint);

    }

    addColonne(n) {
        let r = this.getR();
        var cubeGeometry1 = new THREE.CubeGeometry(this.epaisseur, this.hColonne, this.epaisseur);
        var torusMmaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

        cubeGeometry1.translate(0, -this.hColonne / 2, 0);
        var pillier = new THREE.Mesh(cubeGeometry1, torusMmaterial);
        let teta = n * Math.PI / 4 + Math.PI / 8;
        pillier.translateZ(r * Math.cos(teta)).translateX(r * Math.sin(teta));
        this.scene.add(pillier);


        var torusMmaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        var torusTiersPointGeometry = new THREE.TorusBufferGeometry(r, this.epaisseur, 5, 100, Math.PI / 2);
        var torusTiersPoint = new THREE.Mesh(torusTiersPointGeometry, torusMmaterial);
        torusTiersPoint.rotation.y += n * Math.PI / 4 + Math.PI / 8;


    }


    initControls() {

        this.controls.rotateSpeed = 2.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;

        this.controls.noZoom = false;
        this.controls.noPan = false;

        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;

        this.controls.keys = [65, 83, 68];

        //this.controls.addEventListener( 'change',  );
        this.controls.handleResize();
    }
    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }
    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    testWriteText() {
        let canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 120;
        canvas.style.cssText = "width:200px;height:48px; background: #cdcdcd;position: absolute ;left: 10px;top:10px";
        canvas.setAttribute("id", "canvasID");
        let root = document.getElementById('root');
        root.appendChild(canvas);
        this.traceContext = canvas.getContext("2d");

        this.traceContext.fillStyle = "blue";
        this.traceContext.font = "bold 32px Arial";
        this.traceContext.fillText("initialisation", 10, 68);
    }

    trace(t) {
        
        this.traceContext.clearRect(0,0,200,120);
        this.traceContext.fillText(""+t, 10, 68);
    }
    animate = () => {
        // this.cylindre.rotation.x += 0.01
        // this.cylindre.rotation.y += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate);
        this.controls.update();
        var d = new Date();
        let dt = d.getTime() - this.lastTime;

        if (dt > 200) {
            if (this.nImage < 16) {
                this.trace ('   '+this.nImage );
                this.nImage++;
                let s = 'drawImage_' + this.ii;
                this.lastTime = d.getTime();
                this.ii++;
                console.log("animate " + this.ii + "   ", dt);
                this[s]();
            }
        }
    }
    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
    render() {
        return (
            <div
                style={{ width: '600px', height: '600px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}
export default SceneBg