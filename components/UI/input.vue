<template lang="pug">
.input-wrapper
    label(
        v-if="label"
        :for="id"
    ) {{ label }}

    input(
        :id="id"
        :type="inputType"
        :name="name"
        v-model="inputValue"
    )

    button(
        v-if="type === 'password'"
        type="button"
        @click="togglePassword"
    )
        Icon(
            v-if="inputType === 'password'"
            name="solar:eye-linear"
        )
        Icon(
            v-else-if="inputType === 'text'"
            name="solar:eye-closed-bold"
        )
</template>

<script setup lang="ts">
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    name: {
        type: String,
        default: ''
    }
})

const inputValue = defineModel()

let inputType = ref(props.type)
function togglePassword () {
    inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>

<style scoped lang="sass">
.input-wrapper
    position: relative
    color: $main
    font-size: 1.1em
    border-bottom: 2px solid $main
    padding: 5px
    margin: 5px
    display: flex
    justify-content: stretch
    align-items: center
    gap: 10px

    label
        font-weight: 700
        letter-spacing: 3px
        width: 150px
        text-align: right
        border-right: 2px dotted #d78f89
        padding-right: 5px

    button
        width: 1.5em
        height: 1.5em
        background: transparent
        border: none
        cursor: pointer
        padding: 0

        &:hover 
            opacity: .6

        & ~ input
            padding-right: 20px

        svg
            height: 25px
            width: 25px
            color: $main

    input
        color: inherit
        border: none
        width: 250px
        box-sizing: border-box
        flex: 1
        &:focus
            outline: $main 2px dashed
</style>