<template lang="pug">
.verify
	p email подтвержден

	UIButton(
		text="в пространство"
		btnStyle="colored"
		btnSize="big"
		to="/"
	)
</template>

<script lang="ts">
</script>

<style lang="sass" scoped>
.verify
	padding: 40px
	background-color: #fff
	display: flex
	flex-direction: column
	gap: 20px
	height: 100px
	align-self: center
</style>