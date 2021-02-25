<template>
	<view class="content">
		<canvas type="webgl" id="webglLeft" style="width: 100%; height: 225px;" @touchstart="touchStartLeft" @touchmove="touchMoveLeft" @touchend="touchEndLeft"></canvas>
		
		<view sytle="height: 20px; width: 100%;background-color: #ffffff">-</view>
		
		<canvas type="webgl" id="webglRight" style="width: 100%; height: 225px;" @touchstart="touchStartRight" @touchmove="touchMoveRight" @touchend="touchEndRight"></canvas>
		
	</view>
</template>

<script>
	import * as THREELEFT from '@/common/threejs/three.weapp.js'
	import * as THREERIGHT from '@/common/threejs/three.weapp.second.js'
	import { cubeControls } from '@/common/test-cases/cubeControls.js'
	import { glbModel } from '@/common/test-cases/glbModel.js'
	export default {
		onLoad: function() {
			uni.createSelectorQuery()
				.in(this)
				.selectAll('#webglLeft,#webglRight')
				.node()
				.exec((res) => {
					let canvasLeftId = res[0][0].node._canvasId
					const canvasLeft = THREELEFT.global.registerCanvas(canvasLeftId, res[0][0].node)
					let canvasRightId = res[0][1].node._canvasId
					const canvasRight = THREERIGHT.global.registerCanvas(canvasRightId, res[0][1].node)
					//加载顺序不可夹在上面代码中，否则真机测试会出现undefined
					cubeControls(canvasLeft, THREELEFT)
					glbModel(canvasRight, THREERIGHT)
				})
		},
		methods: {
			touchStartLeft(e) {
				THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchstart')(e)
			},
			touchMoveLeft(e) {
				THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchmove')(e)
			},
			touchEndLeft(e) {
				THREELEFT.global.touchEventHandlerFactory('canvasLeft', 'touchend')(e)
			},
			touchStartRight(e) {
				THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchstart')(e)
			},
			touchMoveRight(e) {
				THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchmove')(e)
			},
			touchEndRight(e) {
				THREERIGHT.global.touchEventHandlerFactory('canvasRight', 'touchend')(e)
			},
		},
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
