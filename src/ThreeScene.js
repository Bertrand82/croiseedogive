import React, { Component } from 'react';
import TrackballControls from './TrackballControls';
import * as THREE from 'three';



class ThreeScene extends Component {


    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
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
        let cote1 = 2
        let cote2 = 2;
        let e = 0.005;       

        var cle = this.createSimpleCroiseeOgive(cote1, cote2,e);

        for (let i = 0; i < 4; i++) {
            var cleClone = cle.clone(true);
            cleClone.translateX(i * cote1);
            this.scene.add(cleClone);
        }
    }

    createSimpleCroiseeOgive(cote1, cote2, e) {

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
        var cleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2);
        cleGeometry.translate(0, hauteur, 0);
        var cleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        var cle = new THREE.Mesh(cleGeometry, torusMmaterial);


        cle.add(torusCroisee1);
        cle.add(torusCroisee2);
        cle.add(torusTiersPoint01);
        cle.add(torusTiersPoint21);
        cle.add(cube);
        cle.add(croix1);
        cle.add(croix2);
        return cle;
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
    animate = () => {
        // this.cylindre.rotation.x += 0.01
        // this.cylindre.rotation.y += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate);
        this.controls.update();
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
export default ThreeScene