import { defineStore } from 'pinia'
import api from "@/api"

type User = {
    id: number
    name: string
}

export const useCounterStore = defineStore('auth', {
    state: () => ({
        loggedIn: false,
        user: null as User | null,
    }),
    getters: {

    },
    actions: {
        async init() {
            const session = await api.get('/auth/session')
            if (session.status === 200) {
                this.loggedIn = true
                this.user = session.data
            }
        }
    },
})
