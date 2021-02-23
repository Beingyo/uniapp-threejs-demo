import {
	OrbitControls
} from '@/common/controls/OrbitControls.js'
import {
	STLLoader
} from '@/common/loaders/STLLoader'

export function testLeft(canvas, THREE) {
	STLLoader(THREE)
	//threejs三个基本概念，分别为相机、场景、渲染器
	var camera, scene, renderer;
	var clock, mixer, controls, mesh, light;
	init();
	animate();

	function init() {
		//定义摄像机，参数分别为相机的广角，视野呈现长宽比，摄像机视锥体近端面，摄像机视锥体远端面
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 100);

		// 相机初始位置
		camera.position.set(-5, 5, 13);

		//不明具体效果影响
		camera.lookAt(new THREE.Vector3(0, 2, 0));

		//定义场景
		scene = new THREE.Scene();

		//背景色
		// scene.background = new THREE.Color(0xe0e0e0);
		scene.background = new THREE.Color("rgb(222, 250, 255)");

		//定义了线性雾
		// scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
		// scene.fog = new THREE.Fog("rgb(255, 255, 255)", 20, 100);

		//定义时钟
		clock = new THREE.Clock();

		// 定义半球光
		// light = new THREE.HemisphereLight(0xffffff, 0x444444);
		light = new THREE.HemisphereLight("rgb(200, 200, 200)", "rgb(80, 80, 80)");
		light.position.set(0, 20, 0);
		scene.add(light);
		//定义平行光
		// light = new THREE.DirectionalLight(0xffffff);
		// light = new THREE.DirectionalLight("lightgrey");
		// light.position.set(0, 20, 10);
		// scene.add(light);

		//定义网格材质(影响背景色)
		//  mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({
		// 	color: 0x999999,
		// 	// color: "rgb(255, 255, 255)",
		// 	depthWrite: false
		// }));
		// mesh.rotation.x = -Math.PI / 2;
		// scene.add(mesh);

		//定义坐标格辅助对象
		// var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
		// grid.material.opacity = 0.2;
		// grid.material.transparent = true;
		// scene.add(grid);

		var loader = new THREE.STLLoader();
		loader.load('http://www.dayin.la/data/downloadFile.html?key=af56186dcb47352053a5fbcab3132ead', function(
		// loader.load('http://localhost:8080/host-manager/images/3DfootLeft_Last.stl', function(
			geometry) {
			// 建立几何中心
			geometry.center();
			// 几何体绕着x轴旋转负45度
			geometry.rotateX(-Math.PI / 2);
			// 几何体绕着y轴旋转负45度
			// geometry.rotateY(- Math.PI / 2);
			//材质类型和颜色
			var mat = new THREE.MeshPhongMaterial({
				color: "rgb(255, 255, 255)"
			});
			// var mat = new THREE.MeshNormalMaterial();
			mesh = new THREE.Mesh(geometry, mat);
			// 缩放
			mesh.scale.set(0.05, 0.05, 0.05);
			scene.add(mesh);
		});

		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
		renderer.setSize(canvas.width, canvas.height);
		renderer.gammaOutput = true;
		renderer.gammaFactor = 2.2;

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.update();
	}

	function animate() {
		var dt = clock.getDelta();
		if (mixer) mixer.update(dt);
		canvas.requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
}