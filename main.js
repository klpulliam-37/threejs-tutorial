import * as THREE from 'three';

// The Scene is required when defining what is what and where it goes on the screen.
const scene = new THREE.Scene();

// There are different types of Cameras, such as OrthographicCamera, StereoCamera, CubeCamera, and a few more.
// The attributes are the FOV, aspect ratio, near clipping plane, and lastly the far clippling plane.
// The near and far clipping planes define the borders that the renderer will actually draw the objects on screen.
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// The Renderer is needed to draw the objects into the scene.
// It must be given a size to render everything at. For example, using the browser window's width and height.
// We can also give it smaller values based on the width and height to have it render at a smaller size. 
// If we want to change the rendered resolution, we pass a third argument to setSize as false so that instead of
// changing the size the entire screen is rendered at, it will descale the resolution of the image instead which 
// is great for improving performance on slower computers.
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();