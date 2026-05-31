<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    id: { type: Number, required: true },
    imageSrc: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
})

const emit = defineEmits(['select-card', 'fuse-card'])

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
    const stage = node.getStage()
    const layer = node.getLayer()

    const sourceBox = node.getClientRect()
    let collidedCardId = null

    const allCards = stage.find('.card-node')

    allCards.forEach((otherCard) => {
        if (otherCard.id() !== `card-${props.id}`) {
            const targetBox = otherCard.getClientRect()

            if (window.Konva.Util.haveIntersection(sourceBox, targetBox)) {
                collidedCardId = parseInt(otherCard.id().replace('card-', ''))
            }
        }
    })

    if (collidedCardId !== null) {
        emit('fuse-card', { 
            activeId: props.id, 
            targetId: collidedCardId 
        })
        
        node.position({ x: props.x, y: props.y })
        layer.batchDraw()
        return 
    }

    const currentX = node.x()
    const currentY = node.y()
    const minX = 200; const maxX = 1300; const minY = 200; const maxY = 800;
    if (currentX < minX || currentX > maxX || currentY < minY || currentY > maxY) {
        node.draggable(false)
        const returnTween = new window.Konva.Tween({
            node: node, duration: 0.5, x: props.x, y: props.y,
            onFinish: () => { node.draggable(true); returnTween.destroy() }
        })
        returnTween.play()
    }
}

const onDragStart = (e) => {
    const node = e.target
    const layer = node.getLayer()
    
    node.moveToTop()
    if (layer) layer.batchDraw()
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
            name: 'card-node'
        }" 
        @dragend="onDragEnd"
        @dragstart="onDragStart"
        @click="$emit('select-card')"
        @tap="$emit('select-card')"
    />
</template>