import React, { Component } from 'react';
import TrackballControls from './TrackballControls';
import BgCalculVoute from './BgCalculVoute';
import * as THREE from 'three';
import createCroiseeOgive from './geometry/createCroiseeOgive';
import disposeObject3D from './geometry/disposeObject3D';

const initialData = {
    cote_a: 200,
    cote_b: 200,
    e_nervure: 10,
    titre: 'Croisée d\'ogive ',
    nbBriqueNervureParMetre: 5,
    prixUnitaireBriqueNervure: 2.7,
    nbBriqueVoutinParMetre2: 6.5,
    prixUnitaireBriqueVoutin: 5.45
};

class BgThreeScene extends Component {


    constructor(props) {
        super(props);

        this.state = {
            data: initialData,
        };
    }



    componentDidMount() {
        const width = 2 * this.mount.clientWidth;
        const height = 2 * this.mount.clientHeight;

        //ADD SCENE
        this.scene = new THREE.Scene();
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        this.camera.position.z = 4;
        //ADD RENDERER 
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#110000');
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        //ADD CROISEE
        this.rebuildCroisee(this.state.data);
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.initControls();
        window.addEventListener('resize', this.handleResize);
        this.start();

    }

    croiseeOgive = null;

    // (Re)builds the 3D model from a params object, disposing the previous one if any.
    rebuildCroisee(data) {
        const cote1 = data.cote_a / 100;
        const cote2 = data.cote_b / 100;
        const e = data.e_nervure / 100;

        if (this.croiseeOgive) {
            this.scene.remove(this.croiseeOgive);
            disposeObject3D(this.croiseeOgive);
        }

        this.croiseeOgive = createCroiseeOgive(cote1, cote2, e);
        this.scene.add(this.croiseeOgive);
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

    handleResize = () => {
        const width = 2 * this.mount.clientWidth;
        const height = 2 * this.mount.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.controls.handleResize();
    }

    componentWillUnmount() {
        this.stop();
        window.removeEventListener('resize', this.handleResize);

        if (this.croiseeOgive) {
            this.scene.remove(this.croiseeOgive);
            disposeObject3D(this.croiseeOgive);
            this.croiseeOgive = null;
        }

        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }
    stop = () => {
        cancelAnimationFrame(this.frameId)
        this.frameId = null;
    }
    animate = () => {
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate);
        this.controls.update();
    }
    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
    updateParam = (newParams) => {
        const mergedData = { ...this.state.data, ...newParams };
        this.setState({ data: mergedData });
        this.rebuildCroisee(mergedData);
    }
    render() {
        return (
            <div>
                <BgCalculVoute updateParam={this.updateParam} />
                <div
                    style={{ width: '300px', height: '300px', backgroundColor: "yellow" }}
                    ref={(mount) => { this.mount = mount }}
                />
            </div>
        )
    }
}
export default BgThreeScene