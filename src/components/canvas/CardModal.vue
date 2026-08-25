<script setup>
    import { ref } from 'vue';

    defineProps({
        card: {
            type: Object,
            required: true
        }
    });

    defineEmits(['close']);

    const isReversed = ref(false);

    const toggleMeaning = () => {
        isReversed.value = !isReversed.value;
    };

</script>

<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-container">
            <div class="card-display-zone" @click="toggleMeaning">
                <img class="card-img"
                :src="card.image"
                :alt="card.name"
                :class="{'isFlipped' : isReversed}"
                />

                <p class="click-instruction">{{ isReversed ? 'Click to see the upright meaning!' : 'Click to see the reversed meaning!' }}</p>
            </div>
            <div class="modal-content">
                <button class="btn-close-modal" @click="$emit('close')">&#x2715;</button>
                
                <h2 class="card-title">{{ card.name }} - {{ isReversed ? 'Reversed Meaning' : 'Upright Meaning' }}</h2>

                <div class="text-zone">
                    <p class="card-meaning"
                    v-for="(meaning, index) in (isReversed ? card.reversed.meaning : card.upright.meaning)"
                    :key="index"
                    >
                    {{ meaning }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../../assets/styles/main.scss';

    .modal-overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(24, 0, 24, 0.773);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-container{
        display: flex;
        align-items: center;
        gap: 0;
        justify-content: center;
        width: 95%;
        max-width: 1200px;
    }

    .modal-content{
        background-image: url('@/assets/img/parchment.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 925px;
        height: 500px;
        padding: 45px 75px 55px 130px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        position: relative;
    }

    .btn-close-modal{
        position: absolute;
        top: 48px;
        right: 48px;
        background: none;
        border: none;
        font-size: 32px;
        color: $color-secondary;
        cursor: pointer;
        transition: all 0.3s;

        &:hover{
            transform: scale(1.2);
        }
    }

    .card-display-zone{
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        position: relative;
        z-index: 10;
        margin-right: -90px;
    }

    .card-img{
        width: 300px;
        height: auto;
        margin-top: 45px;
        @include card-tilt-hover;
    }

    .click-instruction{
        font-family: $font-secondary;
        font-size: 14px;
        color: white;
    }

    .card-title{
        font-family: $font-primary;
        font-size: 36px;
        font-weight: normal;
        color: $color-secondary;
        margin-bottom: 32px;
    }

    .text-zone{
        display: flex;
        overflow: hidden;
        flex-direction: column;
        gap: 24px;
        padding-right: 20px;
    }

    .card-meaning{
        font-family: $font-secondary;
        font-size: 18px;
        color: $color-primary;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        text-align: left;
    }
</style>