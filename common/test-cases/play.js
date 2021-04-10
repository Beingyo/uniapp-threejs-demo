import {
	OrbitControls
} from '@/common/controls/OrbitControls.js'
import {
	OBJLoader
} from '@/common/loaders/OBJLoader.js'
import {
	STLLoader
} from '@/common/loaders/STLLoader'

export function fold(canvas, THREE) {
	OBJLoader(THREE)
	STLLoader(THREE)
	//threejs三个基本概念，分别为相机、场景、渲染器
	var camera, scene, renderer;
	var mixer, controls, mesh, light;
	init();
	animate();

	function init() {
		//定义摄像机，参数分别为相机的广角，视野呈现长宽比，摄像机视锥体近端面，摄像机视锥体远端面
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 100);

		// 相机初始位置
		camera.position.set(10, 10, 20);

		//不明具体效果影响
		camera.lookAt(new THREE.Vector3(0, 2, 0));

		//定义场景
		scene = new THREE.Scene();

		// 定义半球光
		light = new THREE.HemisphereLight("#c8c8c8", "#505050");
		light.position.set(0, 20, -20);
		scene.add(light);
		// 加载obj
		var loader = new THREE.OBJLoader();
		loader.load('http://localhost:8080/host-manager/images/shoes-10.obj', function(geometry) {
			
			geometry.children[0].material.color.set("#ff0000");
			geometry.children[0].material.transparent = true;
			geometry.children[0].material.opacity = 0.1;
			geometry.children[0].material.specular.set("#ff0000");
			geometry.children[0].material.shininess = 100;
			geometry.rotateX(-Math.PI / 2);
			geometry.rotateZ(Math.PI / 2);
			geometry.rotateY(0.125);
			geometry.children[0].position.set(-30, -20, 0);
			geometry.scale.set(0.03, 0.03, 0.03)
			console.log(geometry)
			scene.add(geometry)
		});
		// 加载STL模型
		var loader = new THREE.STLLoader();
		loader.load('http://localhost:8080/host-manager/images/3DfootLeft_Last.stl', function(
			geometry) {
			// 建立几何中心
			geometry.center();
			// 几何体绕着某轴旋转度
			geometry.rotateX(-Math.PI / 2);
			geometry.rotateY(Math.PI / 2);
			// 材质类型和颜色
			var mat = new THREE.MeshPhongMaterial({
				color: "#000000",
				// color: 0x2194ce,
				specular: "#000000",
				// 光滑度
				shininess: 100,
				transparent: true,
				opacity: 0.5,
				// wireframe:true
			});
			// var mat = new THREE.MeshNormalMaterial();
			mesh = new THREE.Mesh(geometry, mat);
			// 缩放
			mesh.scale.set(0.04, 0.04, 0.04);
			scene.add(mesh);
		});

		//背景色
		scene.background = new THREE.Color("#defaff");

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
