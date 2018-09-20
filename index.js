let THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);


let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 0.1;

controls = new OrbitControls(camera);
controls.update();



let ambientlight = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
scene.add( ambientlight );

let light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 1, 1, 1 );
scene.add( light );




var listener = new THREE.AudioListener();
camera.add(listener);
var sound = new THREE.PositionalAudio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load('X:/TFYA65/lab2/Lab2/Hej.wav', function(buffer) 
{
	sound.setBuffer( buffer );
	sound.setRefDistance( 20 );
	sound.play();
});

let roomGeo = new THREE.BoxBufferGeometry(6, 3, 6);
let roomMat = new THREE.MeshLambertMaterial({color: 0xfffff});
roomMat.side = THREE.BackSide;


let room = new THREE.Mesh(roomGeo, roomMat);

scene.add(room);


let flyGeo = new THREE.SphereBufferGeometry(0.1,32,32);
let flyMat = new THREE.MeshLambertMaterial({color: 0xffffff});
let fly = new THREE.Mesh(flyGeo, flyMat);

let flyTrans = new THREE.Group();
let flyRot = new THREE.Group();


scene.add(flyRot);
flyRot.add(flyTrans);
flyTrans.add(fly);



function animate() {
	requestAnimationFrame( animate );
	/* animations goes here */
	flyTrans.position.set(0,0,-2.5);
	flyRot.rotation.y += 3.14/360;
	


	renderer.render( scene, camera );
}
animate();
