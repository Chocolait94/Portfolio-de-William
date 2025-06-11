// Initialisation de Three.js
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Ajout d'une lumière
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Chargement du modèle 3D
const loader = new THREE.GLTFLoader();
loader.load(
    'models/lunettes.glb', // Chemin vers le fichier 3D
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.rotation.y = Math.PI; // Ajustement initial
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% chargé');
    },
    (error) => {
        console.error('Une erreur est survenue lors du chargement : ', error);
    }
);

// Position de la caméra
camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
