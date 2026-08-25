<script setup>
    import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
    import Card from './Card.vue'
    import CardInspectModal from './CardInspectModal.vue'

    const props = defineProps({
        tarotCards: { type: Array, required: true },
        StageConfig: { type: Object, required: true },
        exercice: { type: Object, required: true }
    })

    const emit = defineEmits(['quit-exercice', 'next-exercice'])

    const feedbackMessage = ref('')
    const isSuccess = ref(false)
    const showSuccessModal = ref(false)

    const inspectedCard = ref(null)

    const openInspect = (cardId) => {
        inspectedCard.value = props.tarotCards.find(c => c.id === cardId) || null
    }

    const targetCard = computed(() => {
        return props.tarotCards.find(c => c.id === props.exercice.targetCardId)
    })

    const targetCardImgObj = computed(() => {
        return targetCard.value?.imageObj || null
    })

    watch(() => props.exercice, () => {
    showSuccessModal.value = false
    feedbackMessage.value = ''
    isSuccess.value = false
    inspectedCard.value = null
    })

    const handleCardDrop = ({ activeId, targetId, orientation }) => {
        if (targetId && targetId.toString() === '999') {
            if (
                activeId === props.exercice.correctCardId && 
                orientation === props.exercice.correctOrientation
            ) {
                isSuccess.value = true
                feedbackMessage.value = "Perfect! You surely know your tarot!"
                
                showSuccessModal.value = true

            } else if (activeId === props.exercice.correctCardId) {
                isSuccess.value = false
                feedbackMessage.value = "That's a start, but look closely at the meaning... Should it be upright or reversed?"
            } else {
                isSuccess.value = false
                feedbackMessage.value = "Oops! That is not the correct card. Try another combination!"
            }
        }
    }

    onMounted(() => {
        const globalNav = document.querySelector('.main-nav')
        if (globalNav) globalNav.style.display = 'none'
    })

    onUnmounted(() => {
        const globalNav = document.querySelector('.main-nav')
        if (globalNav) globalNav.style.display = 'flex'
    })
</script>

<template>
    <div class="exercice-layout">
        <button class="exit-exercice-btn" @click="emit('quit-exercice')"><img src="@/assets/img/exit-icon.svg" class="door-icon" alt="Exit Exercice" /></button>
        <div class="instruction-header">
            <div class="instruction-bubble">
                <p class="instruction-text" v-html="exercice.question"></p>
            </div>
        </div>

        <p v-if="feedbackMessage && !showSuccessModal" class="feedback-text" :class="{ 'success': isSuccess }">{{ feedbackMessage }}</p>

        <div v-if="showSuccessModal" class="success-overlay">
            <div class="success-container">
                <div class="success-bubble">
                    <h3>You little witch!</h3>
                    <p>You found the exact card and its correct orientation. Your intuition serves you well! Care for another go?</p>
                </div>
                <div class="success-buttons">
                    <button class="btn-success secondary" @click="emit('quit-exercice')">Back to the table</button>
                    <button class="btn-success primary" @click="emit('next-exercice')">Another Exercise</button>
                </div>
            </div>
        </div>

        <CardInspectModal
            v-if="inspectedCard"
            :card="inspectedCard"
            @close="inspectedCard = null"
        />

        <v-stage :config="StageConfig">
            <v-layer>
                
                <Card
                    v-if="targetCard"
                    :id="targetCard.id" 
                    :image-obj="targetCard.imageObj"
                    :image-src="targetCard.image"
                    :x="628" 
                    :y="240" 
                    :allow-flip-on-click="false" 
                    :is-interactive="false"
                />

                <v-rect :config="{
                    x: 778, 
                    y: 240, 
                    width: 120, 
                    height: 200,
                    stroke: '#86159B',
                    fill: 'rgba(24, 0, 24, 0.500)',
                    strokeWidth: 2, 
                    dash: [6, 4], 
                    cornerRadius: 4,
                    id: '999',
                    name: 'card-node' 
                }" />

                <Card 
                    v-for="(card, index) in props.tarotCards" 
                    :key="'ex-'+card.id" 
                    :id="card.id" 
                    :image-obj="card.imageObj"
                    :image-src="card.image"
                    :x="80 + (index * 140)" 
                    :y="550"
                    :allow-flip-on-click="true"
                    @inspect-card="openInspect"
                    @fuse-card="handleCardDrop"
                />

            </v-layer>
        </v-stage>
    </div>
</template>

<style scoped lang="scss">
    @import '../../assets/styles/variables.scss';

    .exercice-layout {
        position: relative;
        width: 100vw;
        height: 100vh;
    }

    .exit-exercice-btn {
        position: absolute;
        top: 24px;
        right: 60px;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 5000;
        transition: transform 0.2s ease, color 0.2s ease;

        .door-icon {
            width: 32px;
            height: 32px;
        }

        &:hover {
            transform: scale(1.1) translateX(2px);
        }
    }
    .instruction-header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
    }
    .instruction-bubble {
        background-image: url('@/assets/img/bg-dialogue.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 680px;
        padding: 25px 50px;
        margin-top: 50px;
        position: relative;
    }

    .instruction-text {
        font-family: $font-secondary;
        font-size: 18px;
        color: $color-primary;
        margin: 0;
        line-height: 1.5;
        text-align: left;

        ::v-deep(.highlight) {
            color: $color-secondary;
            font-weight: bold;
        }
    }
    
    .feedback-text {
        font-family: $font-secondary;
        position: absolute;
        top: 57%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        font-weight: bold;
        margin: 10px 0 0 0;
        color: $color-accent;
        z-index: 0;
        pointer-events: none;
        background-color: rgba(29, 7, 32, 0.523);
        border-radius: 8px;
        padding: 8px 16px;
    }

    .success-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(18, 5, 20, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    }

    .success-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .success-bubble {
        background-image: url('@/assets/img/bg-btn.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 500px;
        height: 150px;
        padding: 30px 40px;
        box-sizing: border-box;

        h3 {
            font-family: $font-secondary;
            font-size: 24px;
            color: $color-secondary;
            margin: 0 0 10px 0;
            text-align: center;
        }

        p {
            font-family: $font-secondary;
            font-size: 16px;
            color: $color-primary;
            margin: 0;
            line-height: 1.4;
            text-align: left;
        }
    }

    .success-buttons {
        display: flex;
        gap: 8px;
    }

    .btn-success {
        font-family: $font-secondary;
        font-size: 15px;
        padding: 10px 25px;
        background-image: url('@/assets/img/bg-btn.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 180px; 
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.05);
        }

        &.secondary {
            color: $color-primary;
        }

        &.primary {
            color: $color-secondary;
            font-weight: bold;
        }
    }
</style>