import { OrbitControls } from '@/common/controls/OrbitControls.js'
export function cubeControls(canvas, THREE) {
	var camera, scene, renderer;
	var mesh;
	init();
	animate();

	function init() {
		camera = new THREE.PerspectiveCamera(100, canvas.width / canvas.height, 1, 1000);
		scene = new THREE.Scene();
		// scene.background = new THREE.Color(0xf0f0f0);

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(2);
		renderer.setSize(canvas.width, canvas.height);
		
		var texture = new THREE.TextureLoader().load('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.qifeiye.com%2Fqfy-content%2Fuploads%2F2017%2F12%2F57d4413677e0bdb4d10cf2d15648472c.jpg&refer=http%3A%2F%2Fwww.qifeiye.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616827399&t=93f63af7b0ace376d428d148dbc5e588');
		var geometry = new THREE.BoxBufferGeometry(15, 15, 15);
		// var geometry = new THREE.BoxBufferGeometry(15, 15, 15);
		
		var material = new THREE.MeshBasicMaterial({
			map: texture
		});
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		
		console.log(geometry)

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
