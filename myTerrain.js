import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Allows for importing external resources of file type gLTF.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Allows for camera manipulation based on mouse events.
import WebGL from 'three/addons/capabilities/WebGL.js'; // Allows the program to check if WebGL is available for use on the users browser.

import { createNoise2D } from 'simplex-noise';

// Setting up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// Creates gizmo
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Generating a height map with noise
const simplex = new createNoise2D();
// const widthSegments = 100; // Number of segments in the X direction
// const heightSegments = 100; // Number of segments in the Y direction
// const geometry = new THREE.PlaneGeometry(100, 100, widthSegments, heightSegments);

const width = 100;
const depth = 100;
const size = width * depth;
// let heightMap = new Float32Array(size);

// for (let i = 0; i < size; i++) {
//     let x = i % width;
//     let y = Math.floor(i / width);
//     let z = Math.random() * 100;
//     heightMap[i] = simplex(x / 50, y / 50, z);
// }

const heightMap = generateHeight( width, depth );

const geometry = new THREE.PlaneGeometry(500, 500, width - 1, depth - 1);
geometry.rotateX(-Math.PI / 2);


const vertices = geometry.attributes.position.array;
console.log(vertices);
// THIS FIXED ITIIITITITITITITI
for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

    vertices[ j + 1 ] = heightMap[ i ] * 0.5; // This float controls height scale

}
// const vertices = geometry.attributes.position.array;
// for (let i = 0, j = 2; i < vertices.length / 3; i++, j += 3) {
//     let x = i % widthSegments; // Corresponding x-coordinate on the height map
//     let y = Math.floor(i / widthSegments); // Corresponding y-coordinate on the height map
//     let heightValue = heightMap[x + y * widthSegments]; // Retrieve the height value
//     vertices[j] = heightValue * 20; // Scale the height value
// }

const material = new THREE.MeshBasicMaterial({ color: 0x156289, wireframe: true });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

plane.position.y = -100;

function generateHeight( width, height ) {

    let seed = 4.3;
    window.Math.random = function () {

        const x = Math.sin( seed ++ ) * 10000;
        return x - Math.floor( x );

    };

    const size = width * height, data = new Uint8Array( size );
    const simplex = new createNoise2D(), z = Math.random() * 100;

    let quality = 1;

    for ( let j = 0; j < 4; j ++ ) {

        for ( let i = 0; i < size; i ++ ) {

            const x = i % width, y = ~ ~ ( i / width );
            data[ i ] += Math.abs( simplex( x / quality, y / quality, z ) * quality * 1.75 );

        }

        quality *= 5;

    }

    return data;

}

// Main animation loop
function animate() {
requestAnimationFrame(animate);
renderer.render(scene, camera);
}
animate();