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
	var mixer, controls, mesh, light, line;
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
		
		// 加载STL模型
		var STLloader = new THREE.STLLoader();
		STLloader.load('http://localhost:8080/host-manager/images/foot.stl', function(
			geometry) {
			// 建立几何中心
			geometry.center();
			// 几何体绕着某轴旋转度
			geometry.rotateX(-Math.PI / 2);
			geometry.rotateY(Math.PI / 2);
			// 材质类型和颜色
			var mat = new THREE.MeshBasicMaterial({
				color: "#000000",
				transparent: true,
				opacity: 0.1,
				side: THREE.DoubleSide, 
				depthWrite: false,
				// wireframe:true
			});
			// var mat = new THREE.MeshNormalMaterial();
			mesh = new THREE.Mesh(geometry, mat);
			// 缩放
			mesh.scale.set(0.04, 0.04, 0.04);
			scene.add(mesh);
		});
		
		// 加载obj
		var OBJloader = new THREE.OBJLoader();
		OBJloader.load('http://localhost:8080/host-manager/images/shoes.obj', function(geometry) {
			geometry.children[0].material.color.set("#00ffff");
			geometry.children[0].material.transparent = true;
			geometry.children[0].material.opacity = 0.5;
			geometry.children[0].material.side = THREE.DoubleSide;
			geometry.children[0].material.depthWrite = false;
			// geometry.children[0].material.wireframe = true;
			geometry.rotateX(-Math.PI / 2);
			geometry.rotateZ(Math.PI / 2);
			geometry.children[0].position.set(-20, -2, -25);
			geometry.scale.set(0.045, 0.045, 0.045)
			console.log(geometry)
			scene.add(geometry)
		});

		//背景色
		scene.background = new THREE.Color("#ffffff");

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
