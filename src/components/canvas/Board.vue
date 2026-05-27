<script setup lang="ts">
import { ref } from 'vue'
import Character from './Character.vue'

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
    </v-stage>
</template>