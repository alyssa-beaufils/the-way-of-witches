<script setup>
    import { ref, onMounted, watch } from 'vue'

    const props = defineProps({
        id: { type: Number, required: true },
        imageSrc: { type: String, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        allowFlipOnClick: { type: Boolean, default: false }
    })

    const emit = defineEmits(['select-card', 'fuse-card'])

    const konvaImageRef = ref(null)
    const isReversed = ref(false)

    const startX = ref(0)
    const startY = ref(0)

    onMounted(() => {
        startX.value = props.allowFlipOnClick ? props.x + 60 : props.x
        startY.value = props.allowFlipOnClick ? props.y + 100 : props.y
        LoadImg()
    })

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

    const handleCardClick = () => {
        if (props.allowFlipOnClick) {
            isReversed.value = !isReversed.value
            
            const node = konvaImageRef.value.getNode()

            node.offsetX(60)
            node.offsetY(100)
            node.rotation(isReversed.value ? 180 : 0)

            node.position({ x: props.x + 60, y: props.y + 100 })
            
            node.getLayer().batchDraw()
        } else {
            emit('select-card')
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
            const otherIdStr = String(otherCard.id())
            if (otherIdStr !== `card-${props.id}`) {
                const targetBox = otherCard.getClientRect()

                if (window.Konva.Util.haveIntersection(sourceBox, targetBox)) {
                    collidedCardId = otherIdStr.includes('card-') 
                        ? parseInt(otherIdStr.replace('card-', '')) 
                        : parseInt(otherIdStr)
                }
            }
        })

        if (collidedCardId !== null) {
            emit('fuse-card', { 
                activeId: props.id, 
                targetId: collidedCardId,
                orientation: isReversed.value ? 'reversed' : 'upright'
            })
            
            node.offsetX(props.allowFlipOnClick ? 60 : 0)
            node.offsetY(props.allowFlipOnClick ? 100 : 0)
            node.position({ 
                x: props.allowFlipOnClick ? props.x + 60 : props.x, 
                y: props.allowFlipOnClick ? props.y + 100 : props.y 
            })

            layer.batchDraw()
            return
        }

        const currentX = node.x()
        const currentY = node.y()
        const minX = 200;
        const maxX = 1300;
        const minY = 200;
        const maxY = 800;

        if (currentX < minX || currentX > maxX || currentY < minY || currentY > maxY) {
            node.draggable(false)
            const returnTween = new window.Konva.Tween({
                node: node,
                duration: 0.5,
                x: props.x,
                y: props.y,
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
            x: props.allowFlipOnClick ? props.x + 60 : props.x,
            y: props.allowFlipOnClick ? props.y + 100 : props.y,
            offsetX: props.allowFlipOnClick ? 60 : 0,
            offsetY: props.allowFlipOnClick ? 100 : 0,
            draggable: true,
            width: 120,
            height: 200,
            id: `card-${props.id}`,
            name: 'card-node'
        }" 
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @click="handleCardClick"
        @tap="handleCardClick"
        @mouseenter="$event.target.getStage().container().style.cursor = 'pointer'"
        @mouseleave="$event.target.getStage().container().style.cursor = 'default'"
    />
</template>