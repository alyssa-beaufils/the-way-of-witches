<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Character from './Character.vue'
import Card from './Card.vue'
import tarotData from '@/assets/data/cards.json'
import CardModal from './CardModal.vue'

const tarotCards = tarotData

const total_width = 1536
const total_height = 864

const StageConfig = ref({
    width: window.innerWidth,
    height: window.innerHeight,
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0
});

const fitStageToWindow = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const scale = Math.max(width / total_width, height / total_height)

    StageConfig.value.width = width
    StageConfig.value.height = height
    StageConfig.value.scaleX = scale
    StageConfig.value.scaleY = scale

    StageConfig.value.x = (width - total_width * scale) / 2
    StageConfig.value.y = (height - total_height * scale) / 2
}

onMounted(() => {
    window.addEventListener('resize', fitStageToWindow)
    fitStageToWindow()
})

onUnmounted(() => {
    window.removeEventListener('resize', fitStageToWindow)
})

</script>

<template>
    <v-stage :config="StageConfig">
        <v-layer>
            <Character />
        </v-layer>
        <v-layer>
            <Card 
                v-for="(card, index) in tarotCards" 
                :key="card.id"
                :id="card.id"
                :imageSrc="card.image"
                :x="400 + (index % 5) * 150"
                :y="320 + Math.floor(index / 5) * 220"
            />
        </v-layer>
    </v-stage>
</template>

<style scoped lang="scss">

</style>