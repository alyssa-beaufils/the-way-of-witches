<script setup>
    import { ref, onMounted, watch } from 'vue'

    const props = defineProps({
    id: { type: Number, required: true },
    imageObj: { type: Object, default: null },
    imageSrc: { type: String, default: '' },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    allowFlipOnClick: { type: Boolean, default: false },
    isInteractive: { type: Boolean, default: true }
    })

    const emit = defineEmits(['select-card', 'fuse-card'])

    const konvaImageRef = ref(null)
    const isReversed = ref(false)

    const applyImageToNode = () => {
    if (!konvaImageRef.value) return
    const node = konvaImageRef.value.getNode()
    if (!node) return

    const img = props.imageObj || (props.imageSrc ? Object.assign(new Image(), { src: props.imageSrc }) : null)

    if (img) {
        if (img.complete) {
        node.image(img)
        node.getLayer()?.batchDraw()
        } else {
        img.onload = () => {
            node.image(img)
            node.getLayer()?.batchDraw()
        }
        }
    }
    }

    onMounted(() => {
    applyImageToNode()
    })

    watch(() => [props.imageObj, props.imageSrc], () => {
    applyImageToNode()
    })

    const handleCardClick = (e) => {
    if (!props.isInteractive || (e?.target?.isDragging && e.target.isDragging())) return

    if (props.allowFlipOnClick) {
        isReversed.value = !isReversed.value
        const node = konvaImageRef.value.getNode()
        
        const flipTween = new window.Konva.Tween({
        node,
        duration: 0.4,
        rotation: isReversed.value ? 180 : 0,
        easing: window.Konva.Easings.BackEaseOut,
        onFinish: () => flipTween.destroy()
        })
        flipTween.play()
    } else {
        emit('select-card', props.id)
    }
    }

    const onDragStart = (e) => {
    const node = e.target
    const stage = node.getStage()
    if (stage) stage.container().style.cursor = 'grabbing'
    node.moveToTop()
    node.getLayer()?.batchDraw()
    }

    const onDragEnd = (e) => {
        const node = e.target
        const stage = node.getStage()
        const layer = node.getLayer()
        if (stage) stage.container().style.cursor = 'grab'

        const sourceBox = node.getClientRect()
        const targetCard = stage.find('.card-node').find(other => {
            return other.id() !== `card-${props.id}` && window.Konva.Util.haveIntersection(sourceBox, other.getClientRect())
        })

        if (targetCard) {
        const rawId = targetCard.id().replace('card-', '')

        emit('fuse-card', {
        activeId: props.id,
        targetId: Number(rawId),
        orientation: isReversed.value ? 'reversed' : 'upright'
        })

        node.position({
        x: props.allowFlipOnClick ? props.x + 60 : props.x,
        y: props.allowFlipOnClick ? props.y + 100 : props.y
        })
        layer?.batchDraw()
        return
        }

        const { x, y } = node.position()
        if (x < 200 || x > 1300 || y < 200 || y > 800) {
            node.draggable(false)
            const returnTween = new window.Konva.Tween({
            node,
            duration: 0.4,
            x: props.allowFlipOnClick ? props.x + 60 : props.x,
            y: props.allowFlipOnClick ? props.y + 100 : props.y,
            onFinish: () => {
                node.draggable(true)
                returnTween.destroy()
            }
            })
            returnTween.play()
        }
    }
</script>

<template>
  <v-image 
    ref="konvaImageRef"
    :config="{
      x: props.allowFlipOnClick ? props.x + 60 : props.x,
      y: props.allowFlipOnClick ? props.y + 100 : props.y,
      offsetX: props.allowFlipOnClick ? 60 : 0,
      offsetY: props.allowFlipOnClick ? 100 : 0,
      draggable: props.isInteractive,
      listening: props.isInteractive,
      width: 120,
      height: 200,
      id: `card-${props.id}`,
      name: props.isInteractive ? 'card-node' : 'static-node'
    }" 
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @click="handleCardClick"
    @tap="handleCardClick"
    @mouseenter="isInteractive && $event.target.getStage()?.container().style.setProperty('cursor', 'grab')"
    @mouseleave="isInteractive && $event.target.getStage()?.container().style.setProperty('cursor', 'default')"
  />
</template>