<template>
	<view class="content">
		
		<!-- 单个 -->
		<canvas type="webgl" id="webgl" style="width: 100%; height: 450px;" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
		
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
	import {
		testDemo
	} from '@/common/test-cases/testDemo.js'
	import {
		testDemo2
	} from '@/common/test-cases/testDemo2.js'
	import {
		testDemo3
	} from '@/common/test-cases/testDemo3.js'
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
			// 	.select('#webglLeft')
			// 	.node()
			// 	.exec((res) => {
			// 		let canvasId = res[0].node._canvasId
			// 		const canvas = THREELEFT.global.registerCanvas(canvasId, res[0].node)
			// 		// testDemo(canvas, THREELEFT)
			// 		// testDemo2(canvas, THREELEFT)
			// 		testDemo3(canvas, THREELEFT)
			// 	})
			// uni.createSelectorQuery()
			// 	.in(this)
			// 	.select('#webglRight')
			// 	.node()
			// 	.exec((res) => {
			// 		let canvasId = res[0].node._canvasId
			// 		const canvas = THREERIGHT.global.registerCanvas(canvasId, res[0].node)
			// 		// testDemo(canvas, THREERIGHT)
			// 		// testDemo2(canvas, THREERIGHT)
			// 		testDemo3(canvas, THREERIGHT)
			// 	})
		},
		methods: {
			touchStart(e) {
				console.log(1,e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
			},
			touchMove(e) {
				console.log(2,e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
			},
			touchEnd(e) {
				console.log(3,e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
			},
			// loadLeft() {
			// 	uni.createSelectorQuery()
			// 		.in(this)
			// 		.select('#webglLeft')
			// 		.node()
			// 		.exec((res) => {
			// 			let canvasId = res[0].node._canvasId
			// 			const canvas = THREELEFT.global.registerCanvas(canvasId, res[0].node)
			// 		})
			// },
			// loadRight() {
			// 	uni.createSelectorQuery()
			// 		.in(this)
			// 		.select('#webglRight')
			// 		.node()
			// 		.exec((res) => {
			// 			let canvasId = res[0].node._canvasId
			// 			const canvas = THREERIGHT.global.registerCanvas(canvasId, res[0].node)
			// 		})
			// },
			// touchStartLeft(e) {
			// 	console.log(1,e)
			// 	THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchstart')(e)
			// },
			// touchMoveLeft(e) {
			// 	console.log(2,e)
			// 	THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchmove')(e)
			// },
			// touchEndLeft(e) {
			// 	console.log(3,e)
			// 	THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchend')(e)
			// },
			// touchStartRight(e) {
			// 	console.log(4,e)
			// 	THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchstart')(e)
			// },
			// touchMoveRight(e) {
			// 	console.log(5,e)
			// 	THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchmove')(e)
			// },
			// touchEndRight(e) {
			// 	console.log(6,e)
			// 	THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchend')(e)
			// },
		},
		created() {
			//重新获取节点信息解决第一个canvas出现undefined情况
			// this.loadLeft()
			// this.loadRight()
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

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
