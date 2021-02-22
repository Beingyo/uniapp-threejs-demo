import {
	OrbitControls
} from '@/common/controls/OrbitControls.js'
export function testLeft(canvas, THREE) {
	var camera, scene, renderer;
	var cube;
	init();
	animate();

	function init() {
		camera = new THREE.PerspectiveCamera(100, canvas.width / canvas.height, 1, 1000);
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0xf0f0f0);

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(2);
		renderer.setSize(canvas.width, canvas.height);
		var geometry = new THREE.BoxGeometry(10, 10, 10);
		var material = new THREE.MeshBasicMaterial({
			color: 0xed3ed3
		});
		cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		camera.position.z = 20;
		
		// 模型控制
		const controls = new OrbitControls(camera, renderer.domElement);
		// controls.enableDamping = true;
		// controls.dampingFactor = 0.25;
		// controls.enableZoom = true;
		controls.update();

	}

	function animate() {
		// cube.rotation.x += 0.01;
		// cube.rotation.y += 0.01;
		canvas.requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
}
