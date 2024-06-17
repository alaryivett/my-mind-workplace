interface ILoaderStore {
    loaded: boolean
}

const defaultValue: ILoaderStore = {
    loaded: true
}

export const useLoaderStore = defineStore('loader', {
    state: () => defaultValue,
    getters: {
        isLoaded: state => state.loaded
    },
    actions: {
        async load (promise: Function) {
            this.$patch({loaded: false})

            try {
                await promise()

                this.$patch({loaded: true})
            } catch (err) {
                console.log('something went wrong')
            }
        }
    }
})