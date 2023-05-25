import * as THREE from 'three';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import carObj from '../assets/models/car.obj';
import carMtl from '../assets/models/car.mtl';

//장면
const scene = new THREE.Scene();
//scene.background = new THREE.Color('pink');
//카메라
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.5;
//const canvas = document.getElementById('#e');

//빛 추가
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0,2,12);
scene.add(pointLight);

//텍스처 추가

//재질,모델 불러오기
let mtlLoader = new MTLLoader();
mtlLoader.load(carMtl, (material) => {
    material.preload();
    let objLoader = new OBJLoader();
    objLoader.setMaterials(material);
    objLoader.load(carObj, (object) => {
        scene.add(object);
        object.scale.x = 0.05;
        object.scale.y = 0.05;
        object.scale.z = 0.05;
        function render(time) {
            time *= 0.001;
            object.rotation.y = time
            renderer.render(scene, camera);
            requestAnimationFrame(render); 
        }
        requestAnimationFrame(render);
    },function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(err) {
        console.error('An error happened');
    });
});

//렌더러

const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//반응형 처리

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);