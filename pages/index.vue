<template lang="pug">
.main-page
    header
        UserMenu

    .main-page__content
        Logo(size="60%")

        .main-page__content-text
            h1 IN MY MIND

            p 
                | наведите порядок в мыслях и делитесь ими с другими,
                | используя множество удобных инструментов
                | для работы и саморазвития

            UIButton(
                v-if="authStore.isAuth"
                text="в пространство" 
                to="/workplace" 
                btnStyle="white" 
                btnSize="medium" 
                :isBlinked="true"
            )
            UIButton(
                v-else
                text="присоединиться" 
                to="/register" 
                btnStyle="white" 
                btnSize="medium" 
                :isBlinked="true"
            )
    footer
        UIButton(text="Узнать больше" to="/" btn-style="white-link")
</template>

<script setup lang="ts">
useHead({
    title: 'IN MY MIND'
})

const authStore = useAuthStore()
</script>

<style lang="sass">
.main-page
    position: relative
    display: flex
    flex-direction: column
    height: 100%
    color: #fff

    header
        display: flex
        align-items: center
        justify-content: flex-end
        padding: 10px

    &__content
        display: flex
        align-items: center
        flex: 1
        border-top: 5px dashed #fff
        border-bottom: 5px dashed #fff
        height: 80%

        svg, &-text
            flex-basis: 50%

        &-text
            display: flex
            flex-direction: column
            align-items: flex-start
            text-align: left

            h1
                font-size: 5em
                letter-spacing: 20px

            p
                padding: 15px 60px 30px 0
                font-size: 1.5em
                font-weight: 600
                line-height: 1.5
        
    footer
        padding: 10px
        display: flex
        justify-content: center

</style>
