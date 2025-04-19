<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
</script>

<template>
  <div v-if="modalStore.show" class="modal-backdrop">
    <div class="modal-content">
      <div class="modal-header">
        This Modal Is From Vue
      </div>
      <div class="modal-body">
        <p>
          {{ modalStore.message }}
        </p>
        <p>
          Modal opened: {{ modalStore.count }} times
        </p>
      </div>
      <div class="modal-footer">
        <button @click="modalStore.close">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  min-width: 18.75rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1), 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.06);
}

.modal-body {
  text-align: left;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.modal-header {
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-footer {
  text-align: end;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>

