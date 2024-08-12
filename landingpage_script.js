// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Alpha to make the background transparent
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('heart-container').appendChild(renderer.domElement);

// Create an upside-down heart shape
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 2.5);
heartShape.bezierCurveTo(0, 3.5, 2, 5, 4, 5);
heartShape.bezierCurveTo(6, 5, 7, 3.5, 7, 2.5);
heartShape.bezierCurveTo(7, 0, 0, -4, 0, -7);
heartShape.bezierCurveTo(0, -4, -7, 0, -7, 2.5);
heartShape.bezierCurveTo(-7, 3.5, -6, 5, -4, 5);
heartShape.bezierCurveTo(-2, 5, 0, 3.5, 0, 2.5);

const extrudeSettings = {
    depth: 1.5, // Reduce depth for a thinner heart
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.2,
    bevelSegments: 15,
};

const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

// Apply a stylized crystalline, emerald-like material
const material = new THREE.MeshStandardMaterial({
    color: 0x90ee90, // Light green color
    roughness: 0.15,
    metalness: 0.95,
    transparent: true,
    opacity: 0.5, // Increase transparency
    emissive: 0x009966,
    emissiveIntensity: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    refractionRatio: 0.99,
});

// Create and add the heart mesh
const heart = new THREE.Mesh(geometry, material);
heart.scale.set(0.5, 0.6, 0.5); // Scale down the heart to make it smaller
scene.add(heart);

// Lighting to enhance the gem effect
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Soft ambient light
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2);

camera.position.z = 10;

// Variables for heart beat effect
let beat = false;

// Animation for rotation and heartbeat
function animate() {
    requestAnimationFrame(animate);

    // Upside-down rotation with 180-degree rotation along x-axis
    heart.rotation.y += 0.01; 
 // Rotate around the z-axis

    // Heartbeat effect
    if (beat) {
        heart.scale.x += 0.02;
        heart.scale.y += 0.02;
        heart.scale.z += 0.02;
        if (heart.scale.x > 0.55) beat = false; // Expand to a max size and then contract
    } else {
        if (heart.scale.x > 0.5) {
            heart.scale.x -= 0.02;
            heart.scale.y -= 0.02;
            heart.scale.z -= 0.02;
        }
    }

    renderer.render(scene, camera);
}

// Handle mouse events for beating effect
document.addEventListener('mousedown', () => {
    beat = true;
});

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();
