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
      this.message = message && message.trim() !== ''
        ? message
        : 'This is the default message when no message is passed to the component'
      this.count++
    },
    close() {
      this.show = false
      this.message = ''
    },
  },
})
