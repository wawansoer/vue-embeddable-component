import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        show: false,
        message: '',
        count: 0
    }),
    actions: {
        open(message: string) {
            this.show = true
            this.message = message
            this.count++
        },
        close() {
            this.show = false
            this.message = ''
        },
    },
})
