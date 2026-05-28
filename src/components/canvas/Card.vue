<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    id: { type: Number, required: true },
    imageSrc: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
})

const konvaImageRef = ref(null)

const LoadImg = () => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = props.imageSrc
    
    img.onload = () => {
        if (konvaImageRef.value) {
            const node = konvaImageRef.value.getNode()
            node.image(img)
            
            const layer = node.getLayer()
            if (layer) layer.batchDraw()
        }
    }
}

onMounted(() => {
    LoadImg()
})

watch(() => props.imageSrc, () => {
    LoadImg()
})
</script>

<template>
    <v-image 
        ref="konvaImageRef"
        :config="{
            x: props.x,
            y: props.y,
            draggable: true,
            width: 150,
            height: 250,
            id: `card-${props.id}`,
        }" 
    />
</template>