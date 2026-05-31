<script setup>
    import { ref, onMounted } from 'vue'
    import MentorPath from '@/assets/characters/mentor.png'

    const emit = defineEmits(['character-interaction']);
    const CharacterImg = ref(null);

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
            y: 140,
            width: 120,
            height: 165
        }"
        @click="emit('character-interaction')"
        @mouseenter="$event.target.getStage().container().style.cursor = 'pointer'"
        @mouseleave="$event.target.getStage().container().style.cursor = 'default'"
    />
</template>