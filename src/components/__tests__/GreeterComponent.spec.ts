import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import GreeterComponent from '../GreeterComponent.vue'
import { useModalStore } from '@/stores/modalStore'

describe('GreeterComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly with default props', () => {
    const wrapper = mount(GreeterComponent)
    expect(wrapper.find('.greeter-component').exists()).toBe(true)
    expect(wrapper.find('button.greeter-button').exists()).toBe(true)
  })

  it('renders the button with the correct label', () => {
    const wrapper = mount(GreeterComponent, {
      props: { buttonLabel: 'Say Hello' }
    })
    expect(wrapper.find('button').text()).toBe('Say Hello')
  })

  it('applies the correct theme class', () => {
    const wrapper = mount(GreeterComponent, {
      props: { theme: 'danger' }
    })
    expect(wrapper.find('button').classes()).toContain('theme-danger')
  })

  it('opens modal with correct message when button is clicked', async () => {
    const wrapper = mount(GreeterComponent, {
      props: { message: 'Test Modal Message', buttonLabel: 'Open Modal' }
    })
    const modalStore = useModalStore()
    expect(modalStore.show).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(modalStore.show).toBe(true)
    expect(modalStore.message).toBe('Test Modal Message')
    expect(modalStore.count).toBe(1) // Verify count increments
  })

  it('opens modal with default message if no message prop is provided', async () => {
    const wrapper = mount(GreeterComponent)
    const modalStore = useModalStore()
    await wrapper.find('button').trigger('click')
    expect(modalStore.show).toBe(true)
    expect(modalStore.message).toBe('This is the default message when no message is passed to the component')
    expect(modalStore.count).toBe(1) // Verify count increments
  })
})
