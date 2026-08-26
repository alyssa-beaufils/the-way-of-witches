<script setup>
    import { onMounted, onUnmounted } from 'vue'

    const emit = defineEmits(['close'])

    const handleKeyDown = (e) => {
    if (e.key === 'Escape') emit('close')
    }

    onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    })

    onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    })
</script>

<template>
    <div class="rules-overlay" @click.self="emit('close')">
        <div class="rules-container">
            <button class="btn-close" aria-label="Close" @click="emit('close')">&#x2715;</button>
        
            <h2 class="rules-title">I'm a little confused... What is there to do?</h2>

            <div class="rules-content">
                <div class="rule-desc">
                    <h3>Flip a Card</h3>
                    <p>Curious, aren't we? <strong>Click</strong> any card to discover its upright meaning. Click it again to see its reversed meaning.</p>
                </div>

                <div class="rule-desc">
                    <h3>Fuse Two Cards</h3>
                    <p>Want to know what happens when The Fool meets the Magician? <strong>Drag</strong> one card onto the other to fuse them and unlock their combined meaning. You can even swap their order!</p>
                </div>

                <div class="rule-desc">
                    <h3>Consult the Mentor</h3>
                    <p><strong>Click</strong> on the Mentor (aka the cute cat) to test your intuition in Exercise Mode. You've got this!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import '../../assets/styles/variables.scss';

    .rules-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(24, 0, 24, 0.773);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9000;
        animation: fadeIn 0.25s ease-out;
    }

    .rules-container {
        background-image: url('@/assets/img/parchment.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 900px;
        max-width: 90vw;
        height: 520px;
        max-height: 88vh;
        padding: 7% 3% 5% 5%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }

    .btn-close {
        position: absolute;
        top: 60px;
        right: 60px;
        background: none;
        border: none;
        font-size: 32px;
        color: $color-secondary;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.2);
        }
    }

    .rules-title {
        font-family: $font-primary;
        font-size: 36px;
        font-weight: normal;
        color: $color-secondary;
        margin: 0 0 24px 0;
        text-align: left;
        flex-shrink: 0;
    }

    .rules-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        overflow-y: auto;
        padding-right: 15px;
        flex: 1;
        min-height: 0;
    }

    .rule-desc {
        h3 {
            font-family: $font-primary;
            font-size: 24px;
            font-weight: normal;
            color: $color-secondary;
            margin: 0 0 4px 0;
        }

        p {
            font-family: $font-secondary;
            font-size: 16px;
            color: $color-primary;
            line-height: 1.4;
            margin: 0;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @media screen and (max-width: 930px) and (orientation: landscape) {
        .rules-container {
            width: 94vw;
            height: 90vh;
            padding: 12% 8% 8% 8%;
        }

        .btn-close {
            top: 48px;
            right: 8%;
            font-size: 32px;
        }

        .rules-title {
            font-size: 24px;
            margin-bottom: 10px;
            padding-right: 30px;
        }

        .rules-content {
            gap: 10px;
            padding-right: 8px;
        }

        .rule-desc {
            h3 {
            font-size: 17px;
            margin-bottom: 2px;
            }

            p {
            font-size: 13px;
            line-height: 1.35;
            }
        }
    }

    @media screen and (min-width: 931px) and (max-width: 1200px) and (orientation: landscape) {
        .rules-container {
            width: 820px;
            height: 480px;
            padding: 10% 3% 3% 5%;
        }

        .btn-close {
            top: 45px;
            right: 48px;
            font-size: 28px;
        }

        .rules-title {
            font-size: 28px;
            margin-bottom: 16px;
        }

        .rule-desc {
            h3 {
            font-size: 20px;
            }

            p {
            font-size: 15px;
            }
        }
    }
</style>