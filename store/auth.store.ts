interface IAuthStore {
    name: string,
    auth: boolean,
    email: string
}

const defaultValue: IAuthStore = {
    name: '',
    auth: false,
    email: ''
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,
    getters: {
        isAuth: state => state.auth,
        user: state => {
            return {
                name: state.name,
                auth: state.auth
            }
        }
    },
    actions: {
        async init () {
            try {
                const session = await account.get()

                this.$patch(state => {
                    state.name = session.name
                    state.auth = true
                })
            } catch (err) {
                this.$patch(defaultValue)
            }
        },
        async logOut () {
            await account.deleteSession('current')

            this.$patch(defaultValue)
        },
        async logIn (login: string, password: string) {
            const res = await useAsyncData(async () => await account.createEmailPasswordSession(login, password))
            
            if (res.error) {
                return false
            }

            const session = await account.get()

            this.$patch(state => {
                state.name = session.name
                state.auth = true
                state.email = session.email
            })
        },
        async register (login: string, password: string, name: string) {
            try {
                const res = await account.create(ID.unique(), login, password, name)
                const au = await account.createEmailPasswordSession(login, password)

                // TODO verification
                // const result = await account.createVerification('http://localhost:3000/verify')

                this.$patch(state => {
                    state.name = res.name
                    state.auth = true
                    state.email = res.email
                })
            } catch (err) {
                return false
            }
        }
    }
})