import {
	OrbitControls
} from '@/common/controls/OrbitControls.js'
export function line(canvas, THREE) {
	var camera, scene, renderer;
	var mesh, geometry, material, light, helper, lightHelper;
	init();
	animate();

	function init() {
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);
		camera.position.set(0, 1000, 0);
		camera.up.set(0, 1, 0)
		camera.lookAt(0, 0, 0)

		scene = new THREE.Scene();

		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(canvas.width, canvas.height);
		// 平行光
		light = new THREE.DirectionalLight('#FF0000', 1.0, 0);
		light.position.set(100, 100, 200);
		scene.add(light);
		// 创建物体
		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3(-100, 0, 100),
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(100, 0, -100)
		);
		geometry.colors.push(
			new THREE.Color('#444444'),
			new THREE.Color('#ff9c10'),
			new THREE.Color('#FF0000')
		)
		let material = new THREE.LineBasicMaterial({
			vertexColors: true
		});
		var line = new THREE.Line(geometry, material);
		scene.add(line);

		// 模型控制
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.update();
	}

	function animate() {
		canvas.requestAnimationFrame(animate);
		// 自动旋转
		// mesh.rotation.x += 0.005;
		// mesh.rotation.y += 0.01;
		// mesh.rotation.z += 0.01;
		renderer.render(scene, camera);
	}
}
