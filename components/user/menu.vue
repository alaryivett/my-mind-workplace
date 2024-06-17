<template lang="pug">
UIButton(
	v-if="!authStore.isAuth"
	text="войти" 
	to="/login" 
	btnStyle="white" 
	:isBlinked="true"
)

.user-menu(
	v-else
) 
	b {{ authStore.user.name }}
	UIButton(
		text="выйти" 
		:onclick="logout"
		btnStyle="white"
	)
</template>

<script lang="ts" setup>
const authStore = useAuthStore()

const logout = async () => {
	await authStore.logOut()

	await useRouter().push('/')
}
</script>

<style lang="sass">
.user-menu
	display: flex
	gap: 5px
	align-items: center
</style>