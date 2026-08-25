<script setup>
    import { ref, onMounted, onUnmounted, computed } from 'vue'
    import Character from './Character.vue'
    import Card from './Card.vue'
    import CardModal from './CardModal.vue'
    import FusionModal from './FusionModal.vue'
    import RulesModal from './RulesModal.vue'
    import FusionData from '@/assets/data/fusion_logic.json'
    import ExerciceData from '@/assets/data/exercice.json'
    import ExerciceMode from './ExerciceMode.vue'

    const props = defineProps({
        tarotCards: { type: Array, required: true }
    })

    const listExercices = ExerciceData
    const fusionCard = new Map(FusionData.map(c => [c.id, c]))
    const tarotCard = computed(() => new Map(props.tarotCards.map(c => [c.id, c])))

    const selectedCard = ref(null)
    const selectedFusion = ref(null)
    const selectedExercice = ref(null)
    const isRulesOpen = ref(false)

    const currentMode = ref('sandbox')
    const isDialogueOpen = ref(false)
    const mentorComponentRef = ref(null)

    const handleCharacterClick = () => {
        if (currentMode.value === 'sandbox') {
            isDialogueOpen.value = true
        }
    }

    const startExercice = () => {
        isDialogueOpen.value = false

        if (Array.isArray(listExercices) && listExercices.length > 0) {
            const randomIndex = Math.floor(Math.random() * listExercices.length)
            selectedExercice.value = listExercices[randomIndex]
        } else {
            selectedExercice.value = listExercices
        }
        
        currentMode.value = 'exercice'

        fitStageToWindow() 
    }

    const openModal = (cardData) => { selectedCard.value = cardData }
    const closeModal = () => { selectedCard.value = null }

    const handleFusion = ({ activeId, targetId }) => {
        const visualCardA = tarotCard.value.get(activeId)
        const visualCardB = tarotCard.value.get(targetId)
        const fusionCardA = fusionCard.get(activeId)
        const fusionCardB = fusionCard.get(targetId)

        if (visualCardA && visualCardB && fusionCardA && fusionCardB) {
            selectedFusion.value = {
                cardA: { ...visualCardA, ...fusionCardA },
                cardB: { ...visualCardB, ...fusionCardB }
            }
        }
    }

    const total_width = 1536
    const total_height = 864

    const StageConfig = ref({
        width: window.innerWidth,
        height: window.innerHeight,
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0
    })

    const fitStageToWindow = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        const scale = Math.max(width / total_width, height / total_height)

        StageConfig.value = {
            width,
            height,
            scaleX: scale,
            scaleY: scale,
            x: (width - total_width * scale) / 2,
            y: (height - total_height * scale) / 2
        }
    }

    const handleResize = () => {
        fitStageToWindow()
    }

    onMounted(() => {
        window.addEventListener('resize', handleResize)
        fitStageToWindow()
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })
</script>

<template>
    <div class="board-wrapper">
        <div v-if="currentMode === 'sandbox'" class="sandbox-layout">
            <button class="help-btn" @click="isRulesOpen = true">
                <img src="@/assets/img/help-icon.svg" class="help-icon" alt="Need help?" />
            </button>
            <v-stage :config="StageConfig">
                <v-layer>
                    <Character
                    @character-interaction="handleCharacterClick"
                    ref="mentorComponentRef"
                    />
                </v-layer>
                <v-layer>
                    <Card 
                        v-for="(card, index) in props.tarotCards" 
                        :key="card.id"
                        :id="card.id"
                        :imageObj="card.imageObj"
                        :imageSrc="card.image"
                        :x="400 + (index % 5) * 150"
                        :y="320 + Math.floor(index / 5) * 220"
                        @select-card="openModal(card)"
                        @fuse-card="handleFusion"
                    />
                </v-layer>
            </v-stage>

            <div v-if="isDialogueOpen" class="dialogue-overlay">
                <div class="dialogue-container">
                    <div class="dialogue-bubble">
                        <p class="dialogue-text">I see that you're <span class="highlight">thirsty for knowledge</span>. Good. Would you like to quench your thirst?</p>
                    </div>
                    <div class="dialogue-buttons">
                        <button class="btn-dialogue cancel" @click="isDialogueOpen = false">Not right now...</button>
                        <button class="btn-dialogue confirm" @click="startExercice">Start the exercise</button>
                    </div>
                </div>
            </div>

            <CardModal v-if="selectedCard"
            :card="selectedCard"
            @close="closeModal"
            />
            <FusionModal v-if="selectedFusion"
            :combo="selectedFusion"
            @close="selectedFusion = null"
            />

            <RulesModal 
                v-if="isRulesOpen"
                @close="isRulesOpen = false"
            />
        </div>

        <div v-else-if="currentMode === 'exercice'" class="exercice-layout">
            <ExerciceMode 
                :tarotCards="props.tarotCards" 
                :StageConfig="StageConfig" 
                :exercice="selectedExercice" 
                @quit-exercice="currentMode = 'sandbox'"
                @next-exercice="startExercice"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../../assets/styles/variables.scss';

    .board-wrapper {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .sandbox-layout, .exercice-layout {
        width: 100%;
        height: 100%;
    }

    .dialogue-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        z-index: 1500;
    }

    .dialogue-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        margin-left: 180px;
        padding: 0;
    }

    .dialogue-bubble {
        background-image: url('@/assets/img/bg-dialogue.svg'); 
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 600px;
        height: 70px;
        padding: 20px 30px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
    }

    .dialogue-text {
        font-family: $font-secondary;
        font-size: 16px;
        color: $color-primary;
        text-align: left;
        margin: 0;
        
        .highlight {
            color: $color-secondary;
            font-weight: bold;
        }
    }

    .dialogue-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 5px;
        width: 100%;
    }

    .btn-dialogue {
        font-family: $font-secondary;
        font-size: 16px;
        padding: 10px 20px; 
        background-image: url('@/assets/img/bg-btn.svg');
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 162px;
        margin: 0;
        transition: transform 0.2s ease;

        &:hover { 
            transform: scale(1.05);
        }
        
        &.cancel {
            color: $color-primary;
        }

        &.confirm {
            color: $color-secondary;
            font-weight: bold;
        }
    }

    .help-btn {
        position: absolute;
        bottom: 48px;
        right: 48px;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 5000;
        transition: transform 0.2s ease, color 0.2s ease;

        .help-icon {
            width: 32px;
            height: 32px;
        }

        &:hover {
            transform: scale(1.1) translateX(2px);
        }
    }
</style>