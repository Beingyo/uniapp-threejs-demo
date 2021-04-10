import {
	OrbitControls
} from '@/common/controls/OrbitControls.js'
import {
	OBJLoader
} from '@/common/loaders/OBJLoader.js'

export function objModel(canvas, THREE) {
	OBJLoader(THREE)
	//threejs三个基本概念，分别为相机、场景、渲染器
	var camera, scene, renderer;
	var mixer, controls, mesh, light;
	init();
	animate();

	function init() {
		// 定义摄像机，参数分别为相机的广角，视野呈现长宽比，摄像机视锥体近端面，摄像机视锥体远端面
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 100);
		// 相机初始位置
		camera.position.set(10, 10, 20);
		// 不明具体效果影响
		camera.lookAt(new THREE.Vector3(0, 2, 0));
		// 定义场景
		scene = new THREE.Scene();
		// 定义半球光
		light = new THREE.HemisphereLight("#c8c8c8", "#505050");
		light.position.set(0, 20, -20);
		scene.add(light);
		
		
		// 加载OBJ模型
		var loaderOBJ = new THREE.OBJLoader();
		loaderOBJ.load('http://localhost:8080/host-manager/images/Cat_v1_l3.obj', function(geometry) {
			geometry.position.set(0, -2.5, 0)
			geometry.rotateX(-Math.PI / 2);
			geometry.scale.set(0.18, 0.18, 0.18)
			// 加载皮肤
			geometry.children[0].material.map = new THREE.TextureLoader().load('http://localhost:8080/host-manager/images/Cat_diffuse.jpg');
			geometry.children[0].material.needsUpdate = true;
			console.log(geometry)
			scene.add(geometry)
		});

		// 背景色
		scene.background = new THREE.Color("#defaff");
		// 渲染器
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			//alpha: true, /*背景透明设置*/
		});
		renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
		renderer.setSize(canvas.width, canvas.height);
		renderer.gammaOutput = true;
		renderer.gammaFactor = 2.2;

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.update();
	}

	function animate() {
		canvas.requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
}
