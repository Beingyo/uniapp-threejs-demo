import { OrbitControls } from '@/common/controls/OrbitControls.js'
export function play(canvas, THREE) {
	var camera, scene, renderer;
	var mesh, geometry, material, light;
	init();
	animate();

	function init() {
		// 定义相机
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 100);
		camera.position.set(-5, 5, 13);
		
		// 定义场景
		scene = new THREE.Scene();
		
		//定义了线性雾
		// scene.fog = new THREE.Fog("rgb(255, 255, 255)", 20, 100);
		
		// 场景背景色
		scene.background = new THREE.Color("rgb(239, 239, 239)");
		
		// 定义环境光
		light = new THREE.AmbientLight("rgb(255, 255, 255)");
		light.position.set(0, 10, 0);
		scene.add(light);
		
		// 定义半球光
		// light = new THREE.HemisphereLight(0xffffff, 0x444444);
		
		// light = new THREE.HemisphereLight("rgb(200, 200, 200)", "rgb(80, 80, 80)");
		// light.position.set(0, 10, 0);
		// scene.add(light);
		
		// 定义平行光
		// light = new THREE.DirectionalLight(0xffffff);
		
		// light = new THREE.DirectionalLight("rgb(80, 80, 80)", 0.2);
		// light.position.set(0, 10, 0);
		// scene.add(light);
		
		// 定义点光源
		// light = new THREE.PointLight( 0xff0000, 1, 100 );
		// light.position.set( 0, -10, 0 );
		// scene.add( light );
				
		// 定义盒子
		geometry = new THREE.BoxGeometry(5, 5, 5);
		// 定义材质
		material = new THREE.MeshPhongMaterial({
			// 材质颜色
			color: "rgb(170, 255, 255)",
			// 材质高光颜色，设置为跟color颜色一样的话，会得到类似金属一样的材质，设置成灰色，则看起来更像塑料
			specular: "rgb(170, 255, 255)",
			// 材质放射光颜色
			emissive: "rgb(0, 0, 0)",
			// 材质光滑度
			shininess: 100,
		});
		// 定义网格
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		
		//定义渲染器
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		
		//定义渲染器设备像素比
		renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
		renderer.setSize(canvas.width, canvas.height);
		
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
