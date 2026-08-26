<script setup>
    import { ref, computed } from 'vue';

    const props = defineProps({
        combo: {
            type: Object,
            required: true
        }
    });

    defineEmits(['close']);

    const isCardAReversed = ref(false);
    const isCardBReversed = ref(false);
    const isSwapped = ref(false);
    const isDragged = ref(null);

    const orderedCards = computed(() => {
        const cardAData = {
            ...props.combo.cardA,
            originalKey: 'cardA',
            isReversed: isCardAReversed.value
        };
        const cardBData = {
            ...props.combo.cardB,
            originalKey: 'cardB',
            isReversed: isCardBReversed.value
        };
        return isSwapped.value ? [cardBData, cardAData] : [cardAData, cardBData];
    });

    const toggleCard = (originalKey) => {
        if (originalKey === 'cardA') {
            isCardAReversed.value = !isCardAReversed.value;
        } else {
            isCardBReversed.value = !isCardBReversed.value;
        }
    };

    const currentActionText = computed(() => {
        const firstCard = orderedCards.value[0];
        const direction = firstCard.isReversed ? 'reversed' : 'upright';
        return firstCard.action[direction];
    });

    const currentDomainText = computed(() => {
        const secondCard = orderedCards.value[1];
        const direction = secondCard.isReversed ? 'reversed' : 'upright';
        return secondCard.domain[direction];
    });

    const onDragStart = (e, index) => {
        isDragged.value = index;
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (e, targetIndex) => {
        e.preventDefault();
        if (isDragged.value !== null && isDragged.value !== targetIndex) {
            isSwapped.value = !isSwapped.value;
        }
        isDragged.value = null;
    };
</script>

<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-container">
            
            <div class="cards-display-zone">
                <TransitionGroup name="card-swap" tag="div" class="cards-duo-layout">
                    
                    <div
                        v-for="(card, index) in orderedCards"
                        :key="card.id || card.originalKey"
                        class="card-wrapper" 
                        draggable="true"
                        @dragstart="onDragStart($event, index)"
                        @dragover="onDragOver"
                        @drop="onDrop($event, index)"
                        @click="toggleCard(card.originalKey)"
                    >
                        <img 
                            class="card-img"
                            :src="card.image"
                            :alt="card.name"
                            draggable="false"
                            :class="{'isFlipped' : card.isReversed}"
                        />
                    </div>
                </TransitionGroup>

                <button class="btn-swap-touch" @click="isSwapped = !isSwapped">
                    <img src="@/assets/img/swap-icon.svg" alt="Swap Cards Icon" class="swap-icon" />
                    Swap Cards Order
                </button>
                <p class="click-instruction">Click on a card to flip it and alter the meaning or drag over to swap order!</p>
            </div>

            <div class="modal-content">
                <button class="btn-close-modal" @click="$emit('close')">&#x2715;</button>
                
                <h2 class="card-title">
                    {{ orderedCards[0].name }} & {{ orderedCards[1].name }}
                </h2>

                <div class="text-zone">
                    <p class="card-meaning">
                        {{ currentActionText }} {{ currentDomainText }}
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../../assets/styles/main.scss';

    .modal-overlay {
        position: fixed;
        top: 0; left:
        0; width: 100vw;
        height: 100vh;
        background-color: rgba(24, 0, 24, 0.773);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9000;
    }

    .modal-container {
        display: flex;
        align-items: center;
        gap: 0;
        justify-content:center;
        width: 95%;
        max-width: 1200px;
    }

    .modal-content {
        background-image: url('@/assets/img/parchment.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 800px;
        max-width: 75vw;
        height: 500px;
        max-height: 90vh;
        padding: 130px 75px 55px 130px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        position: relative;
    }

    .btn-close-modal {
        position: absolute;
        top: 80px;
        right: 48px;
        background: none;
        border: none;
        font-size: 32px;
        color: $color-secondary;
        cursor: pointer;
        transition: transform 0.3s ease;
        
        &:hover {
            transform: scale(1.2);
        }
    }

    .cards-display-zone {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 10;
        margin-right: -90px;
    }

    .cards-duo-layout {
        display: flex;
        gap: 20px;
        position: relative;
    }

    .card-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: grab;
        user-select: none;

        &:active {
            cursor: grabbing;
        }
    }

    .card-img {
        width: 250px;
        height: auto;
        margin-top: 45px;
        user-select: none;
        -webkit-user-drag: none;
        @include card-tilt-hover;
    }

    .instruction {
        font-family: $font-secondary;
        font-size: 14px;
        color: white;
    }

    .click-instruction {
        font-family: $font-secondary;
        font-size: 14px;
        color: white;
        user-select: none;
    }

    .card-title {
        font-family: $font-primary;
        font-size: 36px;
        font-weight: normal;
        color: $color-secondary;
        margin: 0 0 32px 0;
        text-align: left;
        flex-shrink: 0;
    }

    .text-zone {
        display: flex;
        overflow: hidden;
        flex-direction: column;
        gap: 24px;
        padding-right: 20px;
        flex: 1;
    }

    .card-meaning {
        font-family: $font-secondary;
        font-size: 18px;
        color: $color-primary;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        text-align: left;
    }

    .card-swap-move {
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .btn-swap-touch {
        display: none;
    }

    @media screen and (max-width: 930px) and (orientation: landscape) {
        .modal-container {
            width: 98vw;
        }

        .modal-content {
            width: 400px;
            max-width: 75vw;
            height: 90vh;
            padding: 135px 20px 15px 45px;
        }

        .cards-display-zone {
            margin-right: -15px;
        }

        .cards-duo-layout {
            gap: 6px;
        }

        .card-img {
            width: 120px;
            justify-self: center;
        }

        .btn-swap-touch {
            display: inline-block;
            padding: 8px 10px;
            font-size: 11px;
            margin-top: 16px;
            background-color: $color-secondary;
            border: none;
            border-radius: 4px;
            font-family: $font-secondary;
            color: white;
        }

        .swap-icon {
            width: 12px;
            height: 12px;
            margin-right: 6px;
            vertical-align: middle;
        }

        .click-instruction {
            display: none;
        }

        .btn-close-modal {
            top: 110px;
            right: 18px;
            font-size: 20px;
        }

        .card-title {
            font-size: 16px;
            margin-bottom: 6px;
            padding-right: 20px;
        }

        .card-meaning {
            font-size: 12px;
            line-height: 1.35;
        }
    }

    @media screen and (min-width: 931px) and (max-width: 1200px) and (orientation: landscape) {
        .modal-content {
            width: 520px;
            max-width: 65vw;
            height: 440px;
            max-height: 86vh;
            padding: 150px 40px 30px 85px;
        }

        .cards-display-zone {
            margin-right: -55px;
        }

        .cards-duo-layout {
            gap: 10px;
        }

        .card-img {
            width: 155px;
            justify-self: center;
        }

        .btn-swap-touch {
            display: inline-block;
            padding: 8px 10px;
            font-size: 14px;
            margin-top: 16px;
            background-color: $color-secondary;
            border: none;
            border-radius: 4px;
            font-family: $font-secondary;
            color: white;
        }

        .swap-icon {
            width: 16px;
            height: 16px;
            margin-right: 6px;
            vertical-align: middle;
        }

        .click-instruction {
            display: none;
        }

        .btn-close-modal {
            top: 100px;
            right: 34px;
            font-size: 26px;
        }

        .card-title {
            font-size: 22px;
            margin-bottom: 12px;
        }

        .card-meaning {
            font-size: 14px;
        }
    }
</style>