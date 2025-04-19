import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import ModalComponent from '../ModalComponent.vue'
import { useModalStore } from '@/stores/modalStore'

describe('ModalComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('does not render modal when show is false', () => {
    const wrapper = mount(ModalComponent)
    expect(wrapper.find('.modal-backdrop').exists()).toBe(false)
  })

  it('renders modal with correct message and count when show is true', async () => {
    const wrapper = mount(ModalComponent)
    const modalStore = useModalStore()
    modalStore.open('Test Modal Message')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.modal-backdrop').exists()).toBe(true)
    expect(wrapper.find('.modal-header').text()).toContain('This Modal Is From Vue')
    expect(wrapper.find('.modal-body').text()).toContain('Test Modal Message')
    expect(wrapper.find('.modal-body').text()).toContain('Modal opened: 1 times')
  })

  it('increments count each time modal is opened', async () => {
    const wrapper = mount(ModalComponent)
    const modalStore = useModalStore()
    modalStore.open('First')
    await wrapper.vm.$nextTick()
    modalStore.close()
    modalStore.open('Second')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.modal-body').text()).toContain('Modal opened: 2 times')
  })

  it('closes modal when close button is clicked', async () => {
    const wrapper = mount(ModalComponent)
    const modalStore = useModalStore()
    modalStore.open('Close Test')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.modal-backdrop').exists()).toBe(true)
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.modal-backdrop').exists()).toBe(false)
  })
})
