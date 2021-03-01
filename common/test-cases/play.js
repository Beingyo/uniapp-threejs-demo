import { OrbitControls } from '@/common/controls/OrbitControls.js'
export function play(canvas, THREE) {
	var camera, scene, renderer;
	var mesh, geometry, material, light, helper, lightHelper;
	init();
	animate();

	function init() {
		// 定义相机
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 5000);
		camera.position.set(0, 0, 250);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		
		// 定义场景
		scene = new THREE.Scene();
		scene.background = new THREE.Color("rgb(176, 226, 255)");
		scene.fog = new THREE.Fog(scene.background, 1, 5000);
		
		// 定义环境光
		light = new THREE.AmbientLight("rgb(255, 255, 255)");
		scene.add(light);
		
		// 定义半球光
		// light = new THREE.HemisphereLight(0xffffff, 0x444444);
		
		// light = new THREE.HemisphereLight("rgb(200, 200, 200)", "rgb(80, 80, 80)");
		// light.position.set(0, 10, 0);
		// scene.add(light);
		
		// 定义平行光
		light = new THREE.DirectionalLight("rgb(255, 255, 255)", 0.2);
		light.position.set(-50, 50, 10);
		light.castShadow = true;

		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;

		// 为光线设置阴影属性
		light.shadow.camera.left = -50;
		light.shadow.camera.right = 50;
		light.shadow.camera.top = 50;
		light.shadow.camera.bottom = -50;

		light.shadow.camera.far = 3500;
		// 偏差率
		light.shadow.bias = -0.001;
		scene.add(light);
		
		// 定义点光源
		// light = new THREE.PointLight( 0xff0000, 1, 100 );
		// light.position.set( 0, -10, 0 );
		// scene.add( light );
		
		// 定义聚光灯
		// light = new THREE.SpotLight("rgb(80, 80, 80)");
		// light.position.set(-10, 10, -5);
		// light.castShadow = true;
		// scene.add(light);
		
		// 定义灯光辅助对象
		lightHelper = new THREE.DirectionalLightHelper(light, 10);
		scene.add(lightHelper);
		
		// 定义相机辅助对象
		// helper = new THREE.CameraHelper(light.shadow.camera);
		// scene.add(helper);
		
		// 定义球体
		let sphereGeometry = new THREE.SphereGeometry(30, 50, 50);
		let sphereMaterial = new THREE.MeshPhongMaterial({color: 0x836FFF});
		sphereMaterial.shininess = 100;
		let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphere.castShadow = true;
		
		
		
		// 定义球体的阴影
		let groundGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
		let groundMaterial = new THREE.MeshLambertMaterial({color: 0x6C7B8B});

		let ground = new THREE.Mesh(groundGeometry, groundMaterial);
		ground.rotation.x = -0.5 * Math.PI;
		ground.position.y = -80;
		ground.receiveShadow = true;
scene.add(sphere);
		scene.add(ground);
		
		
		/* // 定义盒子
		geometry = new THREE.BoxGeometry(5, 5, 5);
		geometry.castShadow = true;
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
		scene.add(mesh); */
		
		//定义渲染器
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		//渲染器设备像素比
		renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
		renderer.setSize(canvas.width, canvas.height);
		// 渲染器颜色和透明度
		renderer.setClearColor("rgb(238, 238, 238)", 1.0);
		// 允许阴影
		renderer.shadowMap.enabled = true; 
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
