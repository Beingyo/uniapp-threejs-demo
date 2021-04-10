<template>
	<view class="content">
		<canvas canvas-id='customCanvas' style="width: 300px; height: 300px; position: absolute; left: 10000rpx"></canvas>
		<canvas type="webgl" id="webgl" style="width: 100%; height: 100%;" @touchstart="touchStart"
			@touchmove="touchMove" @touchend="touchEnd"></canvas>
	</view>
</template>

<script>
	import * as THREE from '@/common/threejs/three.weapp.js'
	import {
		uv
	} from '@/common/test-cases/uv.js'
	export default {
		data() {
			return {
				isShow: false
			}
		},
		onLoad: function() {
			uni.createSelectorQuery()
				.in(this)
				.select('#webgl')
				.node()
				.exec((res) => {
					let canvasId = res[0].node._canvasId
					const canvas = THREE.global.registerCanvas(canvasId, res[0].node)
					uv(canvas, THREE)
				})
		},
		methods: {
			touchStart(e) {
				THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
			},
			touchMove(e) {
				THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
			},
			touchEnd(e) {
				THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
