import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Allows for importing external resources of file type gLTF.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Allows for camera manipulation based on mouse events.
import WebGL from 'three/addons/capabilities/WebGL.js'; // Allows the program to check if WebGL is available for use on the users browser.


//======================================== Creating a scene ========================================//
// The Scene is required when defining what is what and where it goes on the screen.
const scene = new THREE.Scene();

// There are different types of Cameras, such as OrthographicCamera, StereoCamera, CubeCamera, and a few more.
// The attributes are the FOV, aspect ratio, near clipping plane, and lastly the far clippling plane.
// The near and far clipping planes define the borders that the renderer will actually draw the objects on screen.
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 15;

// The Renderer is needed to draw the objects into the scene.
// It must be given a size to render everything at. For example, using the browser window's width and height.
// We can also give it smaller values based on the width and height to have it render at a smaller size. 
// If we want to change the rendered resolution, we pass a third argument to setSize as false so that instead of
// changing the size the entire screen is rendered at, it will descale the resolution of the image instead which 
// is great for improving performance on slower computers.
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// This is an event listener that allows for camera rotation based on mouse events.
const controls = new OrbitControls(camera, renderer.domElement);
//================================================================================//

//======================================== Creating a cube ========================================//
// // Creating the cube
// // When creating some renderable object, we have to define a 'Geometry' and a 'Material'.
// // The geometry defines where and what shape the object is in, while the material defines the color and looks.
// // Once both are defined, 'Mesh' is then created to combine both the geometry and the material.
// // Now that the object is defined, add it to the scene so that it can be drawn by the renderer.
// // Changing the position of the camera may be necessary based on how the object is added to the scene.
// const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
// const cubeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
// const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
// scene.add( cube );


//================================================================================//

//======================================== Creating a line ========================================//
// //create a blue LineBasicMaterial
// const lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

// const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( lineGeometry, lineMaterial );
// scene.add( line );

// // Settting camera postion for blue arrow demonstrating how to make lines.
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );
//================================================================================//

//======================================== Loading 3D models ========================================//
const loader = new GLTFLoader();

loader.load( '/knight_artorias/scene.gltf', function ( gltf ) {
	console.log(gltf)
	gltf.scene.scale.set(0.01, 0.01, 0.01);
	gltf.scene.position.set(0, -5, 0);
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
//================================================================================//

//======================================== Adding light ========================================//
var directionalLight1 = new THREE.DirectionalLight(0xffffff, 10); // 0xffffff is white color, 1 is intensity
directionalLight1.position.set(0, 3, 0); // Set the position of the light
scene.add(directionalLight1);

// var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1); // 0xffffff is white color, 1 is intensity
// directionalLight2.position.set(0, -3, 0); // Set the position of the light
// directionalLight2.rotation.set(0, 180, 0);
// scene.add(directionalLight2);

// const light = new THREE.AmbientLight( 0x404040 , 5); // soft white light
// scene.add( light );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );
//================================================================================//

//======================================== Camera Movement Event Listeners ========================================//
let keysPressed = {};

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});
//================================================================================//

//======================================== animate function ========================================//
// The animate function (requestAnimationFrame) is necessary when trying to render an object on the screen. 
// This function allows for a smooth and continuous animation cycle based on the refresh rate of the screen.
// It also pauses the refresh when the user switches to another tab, saving the systems resources for other needs.
// Because of this, it is better to us requestAnimationFrame instead of just setting an interval.
function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.005;
	// cube.rotation.y += 0.005;

	// line.rotation.x += 0.01;
	// line.rotation.y += 0.01;
	// line.rotation.z += 0.01;

	renderer.render( scene, camera );
}
//================================================================================//

//======================================== WebGL compatibility check ========================================//
// Most modern and up-to-date browsers will support WebGL, but this isn't always the case. 
// To check if WebGL is available for a browser, the following code is necessary.
if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}