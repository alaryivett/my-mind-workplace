<template lang="pug">
NuxtLink(
    v-if="to" 
    :to="to"
    :class="classes"
) {{ text }}

button(
    v-else
    type="button"
    :class="classes"
    @click="onclick"
) {{ text }}
</template>

<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        default: 'Кнопка'
    },
    btnStyle: {
        type: String,
        default: 'primary' // 'colored', 'white', 'primary', 'white-link', 'colored-link'
    },
    isBlinked: {
        type: Boolean,
        default: false
    },
    btnSize: {
        type: String, // 'small', 'medium', 'big' 
        default: 'small'
    },
    to: {
        type: String
    },
    onclick: {
        type: Function
    }
})

const classes = [
    'btn', 
    'btn_' + props.btnStyle, 
    'btn_' + props.btnSize,
    {
        'btn_blinked': props.isBlinked
    }
]
</script>

<style scoped lang="sass">
.btn
    display: block
    transition: opacity .2s linear
    cursor: pointer
    background: transparent

    &:hover
        opacity: 0.3
    
    &_small
        padding: 5px 10px
    &_medium
        padding: 10px
    &_big
        padding: 10px 15px

    &_primary
        color: $main
        border: 1px solid $main
        text-decoration: none
    &_white
        color: #fff
        border: 1px solid #fff
        text-decoration: none
    &_colored
        color: #fff
        border: none
        background: $gradient
        text-decoration: none
    &_white-link
        color: #fff
        text-decoration: underline
    &_colored-link
        color: $main
        text-decoration: underline

    &_blinked
        position: relative
    &_blinked::before
        content: ''
        display: block
        height: 100%
        width: 100%
        position: absolute
        top: 0
        left: 0

        @include blink
</style>