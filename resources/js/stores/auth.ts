import { defineStore } from 'pinia'
import api from "@/api"

type User = {
    id: number
    name: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: false,
        user: null as User | null,
    }),
    getters: {

    },
    actions: {
        async init() {
            await api({ url: '/sanctum/csrf-cookie', baseURL: '/' });

            try {
                const session = await api.get('/session')

                this.loggedIn = true
                this.user = session.data.data
            } catch (e: any) {
                //
            }
        }
    },
})
