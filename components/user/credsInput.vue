<template lang="pug">
.creds-input
	.creds-input__header
		Logo(size="50px")
		h1 IN MY MIND
		p {{ isLogin ? 'вход' : isReg ? 'регистрация' : ''}}

	form
		ul.creds-input__validation(
			v-if="errors.length"
		)
			li(v-for="error in errors")
				| {{ error }}

		UIInput(
			v-if="isReg"
			type="text"
			name="user-name"
			id="name-input"
			label="имя"
			v-model="values.name.value"
		)

		UIInput(
			type="email"
			name="email"
			id="login-input"
			label="почта"
			v-model="values.email.value"
		)

		UIInput(
			type="password"
			id="password-input"
			label="пароль"
			v-model="values.password.value"
		)
		UIInput(
			v-if="isReg"
			type="password"
			id="password-repeat-input"
			label="повторите пароль"
			v-model="values.repeatPassword.value"
		)

		UIButton(
			v-if="isLogin"
			text="войти"
			btnStyle="colored"
			btnSize="big"
			@click="logIn"
		)

		UIButton(
			v-else-if="isReg"
			text="ОК"
			btnStyle="colored"
			btnSize="big"
			@click="register"
		)

	UIButton(
		v-if="isLogin"
        text="Регистрация"
        to="/register"
        btnStyle="white-link"
    )
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { email, maxLength, minLength, required, requiredIf } from '@vuelidate/validators';

const props = defineProps({
	actionType: {
		type: String // 'login', 'reg'
	}
})
const isLogin = props.actionType === 'login'
const isReg = props.actionType === 'reg'

useHead({
	title: 'IMM | ' + (isLogin ? 'Вход' : isReg ? 'Регистрация' : '')
})

const router = useRouter()
const authStore = useAuthStore()
const isAuth = ref(authStore.isAuth)
if (isAuth) {
	await router.push('/')
}

const values = {
	name: ref(''),
	email: ref(''),
	password: ref(''),
	repeatPassword: ref('')
}

const validationRules = {
	name: {
		length: () => isReg ? values.name.value.length >= 3 && values.name.value.length <= 30 : true
	},
	email: {
		required,
		email
	},
	password: {
		length: () => values.password.value.length >= 8 && values.password.value.length <= 30
	},
	repeatPassword: {
		required: requiredIf(isReg),
		matched: () => isReg ? values.password.value === values.repeatPassword.value : true
	}
}

const validationRes = {
	isInvalid: false,
	name: {
		length: {
			error: false,
			text: 'Введите имя пользователя длиной от 3 до 30 символов'
		}
	},
	email: {
		fill: {
			error: false,
			text: 'Введите email'
		},
		invalid: {
			error: false,
			text: 'Некорректный формат почты'
		}
	},
	password: {
		length: {
			error: false,
			text: 'Введите пароль длиной от 8 до 30 символов'
		}
	},
	repeatPassword: {
		fill: {
			error: false,
			text: 'Повторите пароль'
		},
		match: {
			error: false,
			text: 'Пароли не совпадают'
		}
	}
}

let errors: Ref<string[]> = ref([])
const getErrors = () => {
	return [
		Object.values(validationRes.name),
		Object.values(validationRes.email),
		Object.values(validationRes.password),
		Object.values(validationRes.repeatPassword)
	]
	.flat()
	.filter(vRes => vRes.error)
	.map(vRes => vRes.text)
}

watch(errors, () => console.log(errors))

const validate = (): boolean => {
	const validation = useVuelidate(validationRules, values)

	const isInvalid = validation.value.$invalid
	validationRes.isInvalid = isInvalid
	if (!isInvalid) {
		errors.value = []

		return true
	}

	validationRes.name.length.error = validation.value.name.length.$invalid

	validationRes.email.fill.error = validation.value.email.required.$invalid
	validationRes.email.invalid.error = validation.value.email.email.$invalid

	validationRes.password.length.error = validation.value.password.length.$invalid

	validationRes.repeatPassword.fill.error = validation.value.repeatPassword.required.$invalid
	validationRes.repeatPassword.match.error = validation.value.repeatPassword.matched.$invalid

	errors.value = getErrors()
	console.log(errors)

	console.log('validationRes')
	console.log(validationRes)

	return false
}

const logIn = async () => {
	const validation = validate()

	if (!validation) {
		return
	}

	const res = await authStore.logIn(values.email.value, values.password.value)
	if (!res) {
		errors.value = ['Некорректная почта или пароль']
		return
	}

	values.email.value = ''
	values.password.value = ''

	await router.push('/workplace')
}
const register = async () => {
	const validation = validate()

	if (!validation) {
		return
	}

	const res = await authStore.register(values.email.value, values.password.value, values.name.value)

	if (!res) {
		errors.value = ['Пользователь с таким email уже существует']
		// TODO password recovery

		return
	}

	values.email.value = ''
	values.password.value = ''

	await router.push('/workplace')
}
</script>

<style lang="sass" scoped>
.creds-input
	display: flex
	flex-direction: column
	align-items: center
	gap: 50px
	margin-top: 10%

	&__header
		color: #fff
		display: flex
		gap: 10px
		letter-spacing: 5px
		font-size: 2em
		align-items: center
		flex-wrap: wrap
		justify-content: center

		p
			flex-basis: 100%
			text-align: center

	&__validation
		margin: 0
		padding: 10px 20px
		list-style: none
		border-radius: 10px
		background-color: #ffdcdc
		font-size: .9em
		color: #d70000

	form
		padding: 20px
		background-color: #fff
		display: flex
		flex-direction: column
		gap: 15px

		button
			margin-top: 10px
			align-self: center
</style>