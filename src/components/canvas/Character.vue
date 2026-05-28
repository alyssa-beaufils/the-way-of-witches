<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MentorPath from '@/assets/characters/mentor.png'

const emit = defineEmits(['character-interaction']);
const CharacterImg = ref<HTMLImageElement | null>(null);

onMounted(() => {
    const img = new window.Image();
    img.src = MentorPath;

    img.onload = () => {
        CharacterImg.value = img
    }   
}
);
</script>

<template>
    <v-image
        v-if="CharacterImg"
        :config="{
            image: CharacterImg,
            x: 695,
            y: 90,
            width: 120,
            height: 165
        }"
        @click="emit('character-interaction')"
    />
</template>

