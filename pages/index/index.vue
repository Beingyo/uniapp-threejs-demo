<template>
	<view class="content">

		<!-- 单个 -->
		<canvas type="webgl" id="webgl" style="width: 100%; height: 450px;" @touchstart="touchStart" @touchmove="touchMove"
		 @touchend="touchEnd"></canvas>

		<!-- 多个 -->
		<!-- <canvas type="webgl" id="webglLeft" style="width: 100%; height: 225px;" @touchstart="touchStartLeft" @touchmove="touchMoveLeft" @touchend="touchEndLeft"></canvas>
		<view sytle="height: 20px; width: 100%;background-color: #ffffff">-</view>
		<canvas type="webgl" id="webglRight" style="width: 100%; height: 225px;" @touchstart="touchStartRight" @touchmove="touchMoveRight" @touchend="touchEndRight"></canvas> -->

	</view>
</template>

<script>
	import * as THREE from '@/common/threejs/three.weapp.js'
	// import * as THREELEFT from '@/common/threejs/three.weapp.left.js'
	// import * as THREERIGHT from '@/common/threejs/three.weapp.right.js'
	// import {
	// 	renderCube
	// } from '@/common/test-cases/cube.js'
	// import {
	// 	renderCubes
	// } from '@/common/test-cases/cubes.js'
	// import {
	// 	renderModel
	// } from '@/common/test-cases/model.js'
	// import {
	// 	renderSphere
	// } from '@/common/test-cases/sphere.js'
	// import {
	// 	testDemo
	// } from '@/common/test-cases/testDemo.js'
	// import {
	// 	testDemo2
	// } from '@/common/test-cases/testDemo2.js'
	import {
		testDemo3
	} from '@/common/test-cases/testDemo3.js'
	// import {
	// 	testLeft
	// } from '@/common/test-cases/testLeft.js'
	// import {
	// 	testRight
	// } from '@/common/test-cases/testRight.js'
	export default {
		onLoad: function() {
			uni.createSelectorQuery()
				.in(this)
				.select('#webgl')
				.node()
				.exec((res) => {
					let canvasId = res[0].node._canvasId
					const canvas = THREE.global.registerCanvas(canvasId, res[0].node)
					// testDemo(canvas, THREE)
					// testDemo2(canvas, THREE)
					testDemo3(canvas, THREE)
				})
			// uni.createSelectorQuery()
			// 	.in(this)
			// 	.selectAll('#webglLeft,#webglRight')
			// 	.node()
			// 	.exec((res) => {
			// 		let canvasLeftId = res[0][0].node._canvasId
			// 		const canvasLeft = THREELEFT.global.registerCanvas(canvasLeftId, res[0][0].node)
			// 		let canvasRightId = res[0][1].node._canvasId
			// 		const canvasRight = THREERIGHT.global.registerCanvas(canvasRightId, res[0][1].node)
			// 		//加载顺序不可夹在上面代码中，否则真机测试会出现undefined
			// 		testLeft(canvasLeft, THREELEFT)
			// 		testRight(canvasRight, THREERIGHT)
			// 	})
		},
		methods: {
			touchStart(e) {
				console.log(1, e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
			},
			touchMove(e) {
				console.log(2, e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
			},
			touchEnd(e) {
				console.log(3, e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
			},
			// touchStartLeft(e) {
			// 	console.log(4,e)
			// 	THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchstart')(e)
			// },
			// touchMoveLeft(e) {
			// 	console.log(5,e)
			// 	THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchmove')(e)
			// },
			// touchEndLeft(e) {
			// 	console.log(6,e)
			// 	THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchend')(e)
			// },
			// touchStartRight(e) {
			// 	console.log(7,e)
			// 	THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchstart')(e)
			// },
			// touchMoveRight(e) {
			// 	console.log(8,e)
			// 	THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchmove')(e)
			// },
			// touchEndRight(e) {
			// 	console.log(9,e)
			// 	THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchend')(e)
			// },
		},
		created() {
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
