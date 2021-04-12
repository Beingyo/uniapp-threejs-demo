export function cube(canvas, THREE) {
	var camera, scene, renderer;
	var mesh;
	init();
	animate();

	function init() {
		camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
		camera.position.z = 400;
		scene = new THREE.Scene();
		
		var geometry = new THREE.BoxGeometry(200, 200, 200);
		var material = new THREE.MeshBasicMaterial({
			color: "rgb(250, 255, 205)"
		});
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
		renderer.setSize(canvas.width, canvas.height);
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(canvas.width, canvas.height);
	}

	function animate() {
		canvas.requestAnimationFrame(animate);
		mesh.rotation.x += 0.005;
		mesh.rotation.y += 0.01;
		renderer.render(scene, camera);
	}
}
