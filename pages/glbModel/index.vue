<template>
	<view class="content">
	    <canvas type="webgl" id="webgl" style="width: 100%; height: 450px;" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
	</view>
</template>

<script>
	import * as THREE from '@/common/threejs/three.weapp.js'
	import { glbModel } from '@/common/test-cases/glbModel.js'
	export default {
		onLoad: function() {
			uni.createSelectorQuery()
				.in(this)
				.select('#webgl')
				.node()
				.exec((res) => {
					let canvasId = res[0].node._canvasId
					const canvas = THREE.global.registerCanvas(canvasId, res[0].node)
					glbModel(canvas, THREE)
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
	}
</style>
