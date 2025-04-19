import { defineStore } from 'pinia'

const DEFAULT_MODAL_MESSAGE = 'This is the default message when no message is passed to the component';

export const useModalStore = defineStore('modal', {
  state: () => ({
    show: false,
    message: '',
    count: 0
  }),
  actions: {
    open(message?: string) {
      this.show = true
      this.message = message && message.trim() !== ''
        ? message
        : DEFAULT_MODAL_MESSAGE;
      this.count++
    },
    close() {
      this.show = false
      this.message = ''
    },
  },
})
