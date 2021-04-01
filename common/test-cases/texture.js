import {
	OrbitControls
} from '@/common/controls/OrbitControls.js'
export function texture(canvas, THREE) {
	var camera, scene, renderer;
	var mesh, geometry, material, light, helper, lightHelper;
	init();
	animate();

	function init() {
		// 相机
		camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);
		camera.position.set(0, 1000, 0);
		camera.up.set(0, 1, 0)
		camera.lookAt(0, 0, 0)
		// 场景
		scene = new THREE.Scene();
		scene.background = new THREE.Color("#b0e2ff");
		// 渲染器
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(canvas.width, canvas.height);
		// 环境光
		light = new THREE.AmbientLight('#ffffff', 1.0, 0);
		scene.add(light);
		
		// 定义物体
		let geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
		// canvas画布对象作为CanvasTexture的参数重建一个纹理对象，canvas画布可以理解为一张图片
		var texture = new THREE.CanvasTexture(createCanvas(130,130));
		//打印纹理对象的image属性
		// console.log(texture.image);
		var material = new THREE.MeshPhongMaterial({
		  map: texture, // 设置纹理贴图
		});
		// 加载物体与材质
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		
		

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
	function createCanvas(w, h) {
		w = w || 30;
		h = h || 30;
		
		
		/* // 定义画布对象
		const cs = wx.createCanvasContext('myCanvas') 
		// 在画布上绘制文本
		cs.setFontSize(20) // 文本大小
		cs.fillText('TANKING', 20, 30) // 文本、x轴位置、y轴位置
		// 在画布上绘制矩形
		cs.rect(20, 40, 100, 50)// x轴位置、y轴位置、宽度、高度
		// 在画布上绘制圆形
		// 创建一个圆可以指定起始弧度为0，终止弧度为2 * Math.PI
		cs.arc(70, 150, 50, 0, 2 * Math.PI) // 圆心的x坐标、圆心的y坐标、圆的半径、起始弧度（在3点钟方向）、终止弧度
		cs.setFillStyle('#f00') // 填充背景颜色
		cs.fill() // 用fill方法真正的画到canvas中
		cs.draw() //绘制 */

		var cs =  wx.createOffscreenCanvas('myCanvas')
		var ctx = cs.getContext('2d');
		cs.width = w;
		cs.height = h;
		ctx.setFillStyle('#fff');
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle = "#c00";
		ctx.shadowBlur = 20;
		ctx.shadowColor = "#c99";
		ctx.strokeWidth = 30;
		ctx.beginPath();
		ctx.moveTo(w/2, 0);
		ctx.lineTo(0,h);
		ctx.lineTo(w, h);
		ctx.closePath()
		ctx.stroke();

		/* var cs = wx.createOffscreenCanvas("canvas");
		cs.width = 512;
		cs.height = 128;
		var c = cs.getContext('2d');
		// 矩形区域填充背景
		c.fillStyle = "#ff00ff";
		c.fillRect(0, 0, 512, 128);
		c.beginPath();
		// 文字
		c.beginPath();
		c.translate(256,64);
		c.fillStyle = "#000000"; //文本填充颜色
		c.font = "bold 48px 宋体"; //字体样式设置
		c.textBaseline = "middle"; //文本与fillText定义的纵坐标
		c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
		c.fillText("郭隆邦_技术博客", 0, 0); */

		return cs;
	}
}
