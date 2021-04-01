<template>
	<view class="content">
		<canvas canvas-id="myCanvas" style="border: 1px solid;"/>
	   <!-- <canvas type="webgl" id="webgl" style="width: 100%; height: 100%;" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas> -->
	</view>
</template>

<script>
	import * as THREE from '@/common/threejs/three.weapp.js'
	import { texture } from '@/common/test-cases/texture.js'
	export default {
		onLoad: function() {
			// uni.createSelectorQuery()
			// 	.in(this)
			// 	.select('#webgl')
			// 	.node()
			// 	.exec((res) => {
			// 		let canvasId = res[0].node._canvasId
			// 		const canvas = THREE.global.registerCanvas(canvasId, res[0].node)
			// 		texture(canvas, THREE)
			// 	})
			
			this.createCanvas()
			
			
			
			// var cs =  wx.createOffscreenCanvas('myCanvas')
			// var ctx = cs.getContext('webgl');
			// cs.width = w;
			// cs.height = h;
			// ctx.fillStyle ="#fff";
			// ctx.fillRect(0,0,w,h);
			// ctx.strokeStyle = "#c00";
			// ctx.shadowBlur = 20;
			// ctx.shadowColor = "#c99";
			// ctx.strokeWidth = 30;
			// ctx.beginPath();
			// ctx.moveTo(w/2, 0);
			// ctx.lineTo(0,h);
			// ctx.lineTo(w, h);
			// ctx.closePath()
			// ctx.stroke();
			
			
			
		},
		methods: {
			createCanvas() {
				const ctx = wx.createCanvasContext('myCanvas')
				ctx.setFontSize(20)
				ctx.fillText('Hello', 20, 20)
				ctx.fillText('MINA', 100, 100)
				
				ctx.draw()
			},
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
