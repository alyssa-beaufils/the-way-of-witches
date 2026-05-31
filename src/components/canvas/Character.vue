<script setup>
    import { ref, onMounted } from 'vue'
    import MentorPath from '@/assets/characters/mentor.png'

    const emit = defineEmits(['character-interaction'])
    const characterRef = ref(null)
    const CharacterImg = ref(null)

    const jump = () => {
        if (!characterRef.value) return
        
        const node = characterRef.value.getNode()
        const originalY = 140 
        const jumpHeight = 30  

        const upTween = new window.Konva.Tween({
            node: node,
            duration: 0.25,
            y: originalY - jumpHeight,
            easing: window.Konva.Easings.EaseOut,

            onFinish: () => {
                upTween.destroy()
                
                const downTween = new window.Konva.Tween({
                    node: node,
                    duration: 0.15,
                    y: originalY,
                    easing: window.Konva.Easings.EaseOut,
                    onFinish: () => {
                        downTween.destroy()
                    }
                })
                downTween.play()
            }
        })
        upTween.play()
    }

    defineExpose({ jump })

    onMounted(() => {
        const img = new window.Image()
        img.src = MentorPath
        img.onload = () => {
            CharacterImg.value = img
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
        @click="emit('character-interaction')"
        @mouseenter="$event.target.getStage().container().style.cursor = 'pointer'"
        @mouseleave="$event.target.getStage().container().style.cursor = 'default'"
    />
</template>