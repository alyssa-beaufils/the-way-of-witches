<script setup>
    import { ref, onMounted, watch, onUnmounted } from 'vue'

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
    const isDragging = ref(false)

    let tiltTween = null
    let flipTween = null

    const safeDestroyTween = (tween) => {
        if (tween) {
            try {
                tween.destroy()
            } catch (e) {
            }
        }
    }

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

    const onMouseEnter = (e) => {
        if (!props.isInteractive || isDragging.value) return
        const node = e.target
        const stage = node.getStage()
        if (stage) stage.container().style.cursor = 'grab'

        const baseRotation = isReversed.value ? 180 : 0
        const targetAngle = baseRotation - 6

        safeDestroyTween(tiltTween)
        tiltTween = new window.Konva.Tween({
            node: node,
            duration: 0.15,
            rotation: targetAngle,
            easing: window.Konva.Easings.EaseOut
        })
        tiltTween.play()
    }

    const onMouseLeave = (e) => {
        if (!props.isInteractive || isDragging.value) return
        const node = e.target
        const stage = node.getStage()
        if (stage) stage.container().style.cursor = 'default'

        const baseRotation = isReversed.value ? 180 : 0

        safeDestroyTween(tiltTween)
        tiltTween = new window.Konva.Tween({
            node: node,
            duration: 0.18,
            rotation: baseRotation,
            easing: window.Konva.Easings.EaseOut,
            onFinish: () => {
                safeDestroyTween(tiltTween)
                tiltTween = null
            }
        })
        tiltTween.play()
    }

    const handleCardClick = (e) => {
        if (!props.isInteractive || isDragging.value) return

        if (props.allowFlipOnClick) {
            isReversed.value = !isReversed.value
            const node = konvaImageRef.value.getNode()
            const targetRotation = isReversed.value ? 180 : 0

            safeDestroyTween(tiltTween)
            tiltTween = null

            safeDestroyTween(flipTween)
            flipTween = new window.Konva.Tween({
                node: node,
                duration: 0.4,
                rotation: targetRotation,
                easing: window.Konva.Easings.BackEaseOut,
                onFinish: () => {
                    safeDestroyTween(flipTween)
                    flipTween = null
                }
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

        isDragging.value = true
        safeDestroyTween(tiltTween)
        tiltTween = null

        const baseRotation = isReversed.value ? 180 : 0
        node.rotation(baseRotation - 6)

        node.moveToTop()
        node.getLayer()?.batchDraw()
    }

    const onDragEnd = (e) => {
        const node = e.target
        const stage = node.getStage()
        const layer = node.getLayer()

        isDragging.value = false
        safeDestroyTween(tiltTween)
        tiltTween = null

        if (stage) stage.container().style.cursor = 'default'

        const baseRotation = isReversed.value ? 180 : 0
        const originX = props.x + 60
        const originY = props.y + 100

        const sourceBox = node.getClientRect()
        const allCardNodes = Array.from(stage.find('.card-node'))

        const targetCard = allCardNodes.find(other => {
            return other.id() !== `card-${props.id}` && window.Konva.Util.haveIntersection(sourceBox, other.getClientRect())
        })

        if (targetCard) {
            const rawId = targetCard.id().replace('card-', '')

            node.position({ x: originX, y: originY })
            node.rotation(baseRotation)
            layer?.batchDraw()

            emit('fuse-card', {
                activeId: props.id,
                targetId: Number(rawId),
                orientation: isReversed.value ? 'reversed' : 'upright'
            })
            return
        }

        node.draggable(false)
        const returnTween = new window.Konva.Tween({
            node,
            duration: 0.4,
            x: originX,
            y: originY,
            rotation: baseRotation,
            easing: window.Konva.Easings.BackEaseOut,
            onFinish: () => {
                node.draggable(true)
                safeDestroyTween(returnTween)
            }
        })
        returnTween.play()
        }

        onUnmounted(() => {
            safeDestroyTween(tiltTween)
            safeDestroyTween(flipTween)
        })
</script>

<template>
  <v-image 
    ref="konvaImageRef"
    :config="{
      x: props.x + 60,
      y: props.y + 100,
      offsetX: 60,
      offsetY: 100,
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
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  />
</template>