//import files from './connect.js';
const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);



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

let roomGeo = new THREE.BoxBufferGeometry(1, 1, 1);
let roomMat = new THREE.MeshLambertMaterial({color: 0xfffff});
roomMat.side = THREE.BackSide;


/* testing loadingManager */
var manager = new THREE.LoadingManager();
THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};


var listener = new THREE.AudioListener();
camera.add(listener);
var sound = new THREE.PositionalAudio(listener);
var audioLoader = new THREE.AudioLoader(manager);

audioLoader.load('Hej.wav', function(buffer) 
{
	sound.setBuffer( buffer );
	sound.setRefDistance( 20 );
	sound.play();
});




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


/* LJUD */
var listener = new THREE.AudioListener();
camera.add(listener);
var sound = new THREE.PositionalAudio(listener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load('Hej.wav', function(buffer) 
{
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setRefDistance( 20 );
	//sound.play();
});

fly.add(sound);

function animate() {
	requestAnimationFrame( animate );
	/* animations goes here */
	flyTrans.position.set(0,0,-2.5);
	flyRot.rotation.y += 3.14/360;
	


	renderer.render( scene, camera );
}
animate();