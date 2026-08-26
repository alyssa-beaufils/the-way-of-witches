<script setup>
    import { ref, onMounted } from 'vue'
    import MentorPath from '@/assets/characters/mentor.png'

    const emit = defineEmits(['character-interaction'])
    const characterRef = ref(null)
    const CharacterImg = ref(null)
    const isJumping = ref(false)

    const originalY = 140 
    const jumpHeight = 30  
    let activeTween = null

    const jump = () => {
        if (!characterRef.value || isJumping.value) return

        const node = characterRef.value.getNode()
        isJumping.value = true

        activeTween = new window.Konva.Tween({
            node: node,
            duration: 0.22,
            y: originalY - jumpHeight,
            easing: window.Konva.Easings.EaseOut,
            onFinish: () => {
            activeTween?.destroy()

            activeTween = new window.Konva.Tween({
                node: node,
                duration: 0.16,
                y: originalY,
                easing: window.Konva.Easings.EaseIn,
                onFinish: () => {
                activeTween?.destroy()
                activeTween = null
                isJumping.value = false
                }
            })
            activeTween.play()
            }
        })
        activeTween.play()
    }

    const onMouseEnter = (e) => {
        const stage = e.target.getStage()
        if (stage) stage.container().style.cursor = 'pointer'
        jump()
    }

    const onMouseLeave = (e) => {
        const stage = e.target.getStage()
        if (stage) stage.container().style.cursor = 'default'
    }

    const onClick = () => {
        emit('character-interaction')
    }

    const onTap = () => {
        jump()
        emit('character-interaction')
    }

    defineExpose({ jump })

    onMounted(() => {
        const img = new window.Image()
        img.src = MentorPath
        if (img.complete) {
            CharacterImg.value = img
        } else {
            img.onload = () => {
                CharacterImg.value = img
            }
        }
    })
</script>

<template>
    <v-image
        v-if="CharacterImg"
        ref="characterRef"
        :config="{
            image: CharacterImg,
            x: 695,
            y: 140,
            width: 120,
            height: 165
        }"
        @click="onClick"
        @tap="onTap"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    />
</template>