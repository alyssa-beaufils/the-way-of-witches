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

const onDragEnd = (e) => {
    const node = e.target
    const currentX = node.x()
    const currentY = node.y()

    const minX = 200
    const maxX = 1300
    const minY = 200
    const maxY = 800

    if (currentX < minX || currentX > maxX || currentY < minY || currentY > maxY) {

        node.draggable(false)

        const returnTween = new window.Konva.Tween({
            node: node,
            duration: 0.5,
            x: props.x,
            y: props.y,
            onFinish: () => {
                node.draggable(true)
                returnTween.destroy()
            }
        })

        returnTween.play()
    }
}

onMounted(() => { LoadImg() })
watch(() => props.imageSrc, () => { LoadImg() })

</script>

<template>
    <v-image 
        ref="konvaImageRef"
        :config="{
            x: props.x,
            y: props.y,
            draggable: true,
            width: 120,
            height: 200,
            id: `card-${props.id}`,
        }" 
        @dragend="onDragEnd"
    />
</template>