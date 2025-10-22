import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl-frontground')

// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
    wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = -1;
cube.position.z = -3; // start a bit behind the camera
scene.add(cube);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 2;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Track scroll
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Animate
function animate() {
    requestAnimationFrame(animate);

    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Parallax effect based on scroll
    camera.position.y = -scrollY * 0.005;  // subtle vertical parallax
    cube.position.y = scrollY * 0.0005;    // cube moves slightly with scroll

    renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});
