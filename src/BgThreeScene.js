import React, { Component } from 'react';
import TrackballControls from './TrackballControls';
import BgCalculVoute from './BgCalculVoute';
import * as THREE from 'three';
import createSimpleCroiseeOgive from './geometry/createCroiseeOgive';
import disposeObject3D from './geometry/disposeObject3D';





class BgThreeScene extends Component {


    constructor(props) {
        super(props);

        const initialState = {
            cote_a: 200,
            cote_b: 200,
            e_nervure: 10,
            titre: 'Croisée d\'ogive ',
            nbBriqueNervureParMetre:5,     
            prixUnitaireBriqueNervure:2.7,
            nbBriqueVoutinParMetre2:6.5,
            prixUnitaireBriqueVoutin:5.45
        };

        this.state = {
            data: initialState,
            defaultData: initialState
        };
    }



    componentDidMount() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            1,
            0.1,
            1000
        );
        this.camera.position.z = 4;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor('#110000');
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.mount.appendChild(this.renderer.domElement);

        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.initControls();
        this.updateSceneSize();
        this.replaceCroiseeOgive(this.state.data);

        window.addEventListener('resize', this.updateSceneSize);
        this.start();

    }

    
    croiseeOgive;

    getGeometryDimensions(data) {
        return {
            cote_a: data.cote_a / 100,
            cote_b: data.cote_b / 100,
            e_nervure: data.e_nervure / 100
        };
    }

    createCroisees(data) {
        this.croiseeOgive = createSimpleCroiseeOgive(this.getGeometryDimensions(data));
        this.scene.add(this.croiseeOgive);
    }

    replaceCroiseeOgive(data) {
        if (this.croiseeOgive) {
            this.scene.remove(this.croiseeOgive);
            disposeObject3D(this.croiseeOgive);
        }

        this.createCroisees(data);
    }

    updateSceneSize = () => {
        if (!this.mount || !this.camera || !this.renderer) {
            return;
        }

        const width = this.mount.clientWidth || 300;
        const height = this.mount.clientHeight || 300;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        if (this.controls) {
            this.controls.handleResize();
        }
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
        this.stop();
        window.removeEventListener('resize', this.updateSceneSize);

        if (this.controls) {
            this.controls.dispose();
        }

        if (this.croiseeOgive) {
            this.scene.remove(this.croiseeOgive);
            disposeObject3D(this.croiseeOgive);
        }

        if (this.renderer) {
            this.renderer.dispose();
            if (this.mount && this.renderer.domElement.parentNode === this.mount) {
                this.mount.removeChild(this.renderer.domElement);
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
        // this.cylindre.rotation.x += 0.01
        // this.cylindre.rotation.y += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate);
        this.controls.update();
    }
    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
    updateParam = (cote_a, cote_b, e_nervure) => {
        const nextDimensions = typeof cote_a === 'object'
            ? {
                cote_a: cote_a.cote_a,
                cote_b: cote_a.cote_b,
                e_nervure: cote_a.e_nervure
            }
            : {
                cote_a,
                cote_b,
                e_nervure
            };

        var newData = {
            ...this.state.data,
            ...nextDimensions
        };
        this.setState({ data: newData });
        this.replaceCroiseeOgive(newData);
    }
    render() {
        const { data } = this.state;

        return (
            <div>
                <BgCalculVoute updateParam={this.updateParam} data={data} />
                <div
                    style={{ width: '300px', height: '300px', backgroundColor: "yellow" }}
                    ref={(mount) => { this.mount = mount }}
                />
            </div>
        )
    }
}
export default BgThreeScene