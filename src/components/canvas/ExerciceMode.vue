<script setup>
    import { ref, watch, computed, onUnmounted } from 'vue'
    import Card from './Card.vue'

    const props = defineProps({
        tarotCards: { type: Array, required: true },
        StageConfig: { type: Object, required: true },
        exercice: { type: Object, required: true }
    })

    const emit = defineEmits(['quit-exercice'])

    let quitTimer = null

    const feedbackMessage = ref('')
    const isSuccess = ref(false)
    const targetCardImgObj = ref(null)

    const targetCard = computed(() => {
        return props.tarotCards.find(c => c.id === props.exercice.targetCardId)
    })

    watch(() => targetCard.value, (newCard) => {
        if (!newCard) return
        
        const img = new Image()
        img.src = newCard.image
        img.onload = () => {
            targetCardImgObj.value = img
        }
    }, { immediate: true })

    const handleCardDrop = ({ activeId, targetId, orientation }) => {
        if (targetId && targetId.toString() === '999') {
            if (
                activeId === props.exercice.correctCardId && 
                orientation === props.exercice.correctOrientation
            ) {
                isSuccess.value = true
                feedbackMessage.value = "Perfect! You surely know your tarot!"

                if (quitTimer) clearTimeout(quitTimer)

                quitTimer = setTimeout(() => { 
                    emit('quit-exercice') 
                }, 2500)

            } else if (activeId === props.exercice.correctCardId) {
                isSuccess.value = false
                feedbackMessage.value = "That's a start, but look closely at the meaning... Should it be upright or reversed?"
            } else {
                isSuccess.value = false
                feedbackMessage.value = "Oops! That is not the correct card. Try another combination!"
            }
        }
    }

    onUnmounted(() => {
        if (quitTimer) clearTimeout(quitTimer)
    })
</script>

<template>
    <div class="exercice-layout">
        <div class="instruction-header">
            <div class="instruction-bubble">
                <p class="instruction-text" v-html="exercice.question"></p>
            </div>
        </div>

        <p v-if="feedbackMessage" class="feedback-text" :class="{ 'success': isSuccess }">
            {{ feedbackMessage }}
        </p>

        <v-stage :config="StageConfig">
            <v-layer>
                
                <v-image v-if="targetCardImgObj" :config="{
                    x: 628, 
                    y: 240, 
                    width: 130, 
                    height: 220,
                    image: targetCardImgObj,
                    cornerRadius: 6
                }" />

                <v-rect :config="{
                    x: 778, 
                    y: 240, 
                    width: 130, 
                    height: 220,
                    stroke: '#86159B',
                    fill: 'rgba(24, 0, 24, 0.500)',
                    strokeWidth: 2, 
                    dash: [6, 4], 
                    cornerRadius: 4,
                    id: '999',
                    name: 'card-node' 
                }" />

                <Card 
                    v-for="(card, index) in tarotCards" 
                    :key="'ex-'+card.id" 
                    :id="card.id" 
                    :imageSrc="card.image"
                    :x="80 + (index * 140)" 
                    :y="550"
                    :allow-flip-on-click="true"
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
        color: rgb(255, 255, 255);
        
        &.success {
            color: #97ff9a;
        }
    }
</style>