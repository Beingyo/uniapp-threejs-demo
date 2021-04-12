<template>
	<view class="content">
	    <canvas type="webgl" id="webgl" style="width: 100%; height: 100%;"></canvas>
	    
	</view>
</template>

<script>
	import * as THREE from '@/common/threejs/three.weapp.js'
	import { cubes } from '@/common/test-cases/cubes.js'
	export default {
		onLoad: function() {
			uni.createSelectorQuery()
				.in(this)
				.select('#webgl')
				.node()
				.exec((res) => {
					let canvasId = res[0].node._canvasId
					const canvas = THREE.global.registerCanvas(canvasId, res[0].node)
					cubes(canvas, THREE)
				})
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
