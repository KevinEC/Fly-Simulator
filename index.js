let THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

const scene = new THREE.Scene();
let light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 10;
camera.position.y = 10;

controls = new OrbitControls(camera);


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add( light );




let roomGeo = new THREE.BoxBufferGeometry(20, 20, 32);
let roomMat = new THREE.MeshLambertMaterial({color: 0xffffff});
roomMat.side = THREE.BackSide;

var listener = new THREE.AudioListener();
camera.add(listener);
var sound = new THREE.PositionalAudio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load('X:/TFYA65/lab2/Lab2/Hej.wav', function(buffer) 
{
	sound.setBuffer( buffer );
	sound.setRefDistance( 20 );
	sound.play();
}



let room = new THREE.Mesh(roomGeo, roomMat);

//scene.add(room);



function animate() {
	requestAnimationFrame( animate );
	/* animations goes here */
	renderer.render( scene, camera );
}
animate();
