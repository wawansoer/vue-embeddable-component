<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import type { ThemeType } from '@/types'
import { type PropType, computed } from 'vue'

const props = defineProps({
  message: String,
  buttonLabel: String,
  theme: {
    type: String as PropType<ThemeType>,
    default: 'primary' as ThemeType,
    validator: (value: string) => ['primary', 'secondary', 'success', 'danger'].includes(value),
  },
})

const computedButtonLabel = computed(() => props.buttonLabel)
const themeClass = computed(() => `theme-${props.theme}`)

const modalStore = useModalStore()

const handleClick = () => {
  modalStore.open(props.message ?? 'No message provided')
}
</script>

<template>
  <div class="greeter-component">
    <button class="greeter-button" :class="themeClass" @click="handleClick">
      {{ computedButtonLabel }}
    </button>
  </div>
</template>


<style scoped>
.greeter-component {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  padding: 16px;
}

.greeter-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.theme-primary {
  background-color: #4361ee;
  color: white;
}

.theme-primary:hover {
  background-color: #3a56d4;
}

.theme-secondary {
  background-color: #6c757d;
  color: white;
}

.theme-secondary:hover {
  background-color: #5a6268;
}

.theme-success {
  background-color: #2a9d8f;
  color: white;
}

.theme-success:hover {
  background-color: #238c7e;
}

.theme-danger {
  background-color: #e63946;
  color: white;
}

.theme-danger:hover {
  background-color: #d32836;
}
</style>
