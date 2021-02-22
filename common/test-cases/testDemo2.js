import {
	OrbitControls
} from '@/common/controls/OrbitControls.js'
import {
	STLLoader
} from '@/common/loaders/STLLoader'

export function testDemo2(canvas, THREE) {
	STLLoader(THREE)
	//threejs三个基本概念，分别为相机、场景、渲染器
	var camera, scene, renderer;
	var model, face;
	var container, stats, clock, gui, mixer, actions, activeAction, previousAction, controls;
	var api = {
		state: 'Walking'
	};
	init();
	animate();

	function init() {
		//定义摄像机，参数分别为相机的广角，视野呈现长宽比，摄像机视锥体近端面，摄像机视锥体远端面
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 100);
		// 相机初始位置
		camera.position.set(-5, 5, 13);
		//不明
		camera.lookAt(new THREE.Vector3(0, 2, 0));
		//定义场景
		scene = new THREE.Scene();
		//背景色
		scene.background = new THREE.Color(0xe0e0e0);
		// scene.background = new THREE.Color("rgb(255, 255, 255)");
		//定义了线性雾
		scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
		// scene.fog = new THREE.Fog("rgb(255, 255, 255)", 20, 100);
		//定义时钟
		clock = new THREE.Clock();
		//定义半球光
		var light = new THREE.HemisphereLight(0xffffff, 0x444444);
		// var light = new THREE.HemisphereLight("rgb(255, 255, 255)", "rgb(255, 255, 255)");
		light.position.set(0, 20, 0);
		scene.add(light);
		//定义平行光
		light = new THREE.DirectionalLight(0xffffff);
		// light = new THREE.DirectionalLight("rgb(255, 255, 255)");
		light.position.set(0, 20, 10);
		scene.add(light);
		//定义网格材质
		var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({
			color: 0x999999,
			// color: "rgb(255, 255, 255)",
			depthWrite: false
		}));
		mesh.rotation.x = -Math.PI / 2;
		scene.add(mesh);
		//定义坐标格辅助对象
		// var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
		// grid.material.opacity = 0.2;
		// grid.material.transparent = true;
		// scene.add(grid);

		var loader = new THREE.STLLoader();
		loader.load('http://www.dayin.la/data/downloadFile.html?key=9e83816f60d899f0674fd95a2e29f7ba', function(
			geometry) {
			// 建立几何中心
			geometry.center();  
			var mat = new THREE.MeshNormalMaterial();
			//材质类型和颜色
			// var mat = new THREE.MeshBasicMaterial( { color: "rgb(211, 211, 211)" } );
			mesh = new THREE.Mesh(geometry, mat);
			// 缩放
			mesh.scale.set(0.1, 0.1, 0.1);
			scene.add(mesh);
		});

		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
		renderer.setSize(canvas.width, canvas.height);
		renderer.gammaOutput = true;
		renderer.gammaFactor = 2.2;
		
		// 模型控制
		const controls = new OrbitControls(camera, renderer.domElement);
		// controls.enableDamping = true;
		// controls.dampingFactor = 0.25;
		// controls.enableZoom = true;
		controls.update();

	}

	function animate() {
		var dt = clock.getDelta();
		if (mixer) mixer.update(dt);
		canvas.requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
}
