<script setup>
import { ref } from 'vue'
import Character from './Character.vue'
import Card from './Card.vue'
import tarotData from '@/assets/data/cards.json'

const tarotCards = ref(tarotData)

const StageConfig = ref({
    width:window.innerWidth,
    height: window.innerHeight,
});
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
                :y="280 + Math.floor(index / 5) * 220"
            />
        </v-layer>
    </v-stage>
</template>

<style scoped lang="scss">

</style>