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

    const toggleCardA = () => { isCardAReversed.value = !isCardAReversed.value; };
    const toggleCardB = () => { isCardBReversed.value = !isCardBReversed.value; };

    const currentActionText = computed(() => {
        const direction = isCardAReversed.value ? 'reversed' : 'upright';
        return props.combo.cardA.action[direction];
    });

    const currentDomainText = computed(() => {
        const direction = isCardBReversed.value ? 'reversed' : 'upright';
        return props.combo.cardB.domain[direction];
    });
</script>

<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-container">
            
            <div class="cards-display-zone">
                <div class="cards-duo-layout">
                    
                    <div class="card-wrapper" @click="toggleCardA">
                        <img 
                            class="card-img"
                            :src="combo.cardA.image"
                            :alt="combo.cardA.name"
                            :class="{'isFlipped' : isCardAReversed}"
                        />
                    </div>

                    <div class="card-wrapper" @click="toggleCardB">
                        <img 
                            class="card-img"
                            :src="combo.cardB.image"
                            :alt="combo.cardB.name"
                            :class="{'isFlipped' : isCardBReversed}"
                        />
                    </div>

                </div>
                <p class="click-instruction">Click on a card to flip it and alter the meaning!</p>
            </div>

            <div class="modal-content">
                <button class="btn-close-modal" @click="$emit('close')">&#x2715;</button>
                
                <h2 class="card-title">
                    {{ combo.cardA.name }} & {{ combo.cardB.name }}
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
    @import '../../assets/styles/variables.scss';

    .modal-overlay {
        position: fixed;
        top: 0; left:
        0; width: 100vw;
        height: 100vh;
        background-color: rgba(24, 0, 24, 0.773);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
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
        height: 500px;
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
    }

    .card-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        user-select: none;
    }

    .card-img {
        width: 250px;
        height: auto;
        margin-top: 45px;
        transition: transform 0.4s cubic-bezier(0.40, 1.40, 0.80, 1);
        will-change: transform;
    }

    .card-img.isFlipped {
        transform: rotate(180deg);
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
    }

    .card-title {
        font-family: $font-primary;
        font-size: 36px;
        font-weight: normal;
        color: $color-secondary;
        margin: 0 0 32px 0;
        text-align: left;
    }

    .text-zone {
        display: flex;
        overflow: hidden;
        flex-direction: column;
        gap: 24px;
        padding-right: 20px;
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

</style>