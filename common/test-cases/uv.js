import {
	OrbitControls
} from '@/common/controls/OrbitControls.js'
import {
	OBJLoader
} from '@/common/loaders/OBJLoader.js'
export function uv(canvas, THREE) {
	OBJLoader(THREE)
	var camera, scene, renderer;
	var mesh, geometry, material, light, helper, lightHelper;
	init();
	animate();
	createCanvas();

	function init() {
		// 相机
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 100);
		camera.position.set(10, 10, 20);
		camera.lookAt(new THREE.Vector3(0, 2, 0));
		// 场景
		scene = new THREE.Scene();
		scene.background = new THREE.Color("#defaff");
		// 渲染器
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(canvas.width, canvas.height);

		// 定义半球光
		light = new THREE.HemisphereLight("#c8c8c8", "#505050");
		light.position.set(0, 20, -20);
		scene.add(light);

		/* // 创建物体与材质
		var geometry = new THREE.BoxGeometry(5, 5, 5);
		createCanvas().then(res => {
			var texture = new THREE.TextureLoader().load(res)
			// var material = new THREE.MeshPhongMaterial({ map: texture });
			var material = new THREE.MeshBasicMaterial({ map: texture });
			mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);
		  }).catch(res => {
			console.log(res)
		  })
				
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh); */
		
		// 加载OBJ模型
		createCanvas().then(res => {
			var texture = new THREE.TextureLoader().load(res)
			var loaderOBJ = new THREE.OBJLoader();
			loaderOBJ.load('http://localhost:8080/host-manager/images/Cat_v1_l3.obj', function(geometry) {
				geometry.position.set(0, -2.5, 0)
				geometry.rotateX(-Math.PI / 2);
				geometry.scale.set(0.2, 0.2, 0.2)
				geometry.children[0].material.map = texture;
				geometry.children[0].material.needsUpdate = true;
				console.log(geometry)
				scene.add(geometry)
			});
		  }).catch(res => {
			console.log(res)
		  })
		  
		// 模型控制
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.update();
	}

	function animate() {
		canvas.requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	function createCanvas() {
		var ctx = wx.createCanvasContext('customCanvas')
		
		ctx.setFillStyle("#d7d7d7") ;
		ctx.fillRect(0, 0, 300, 300);
		ctx.setFillStyle('#5F6FEE') //文字颜色：默认黑色
		ctx.setFontSize(20) //设置字体大小，默认10
		ctx.rotate( 360 * Math.PI / 180);
		ctx.fillText("AVCDEFGHIJ", 100,120) //绘制文本
		
		
		//调用draw()开始绘制
		ctx.draw()
		return new Promise((resolve, reject) => {
			wx.canvasToTempFilePath({
				canvasId: 'customCanvas',
				success(res) {
					resolve(res.tempFilePath)
				},
				fail(res) {
					reject(res)
				}
			})
		})

	}
}
