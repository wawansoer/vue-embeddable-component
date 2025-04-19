import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GreeterComponent from '../GreeterComponent.vue'

describe('GreeterComponent', () => {
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

  it('prints the expected message on click', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { })
    const wrapper = mount(GreeterComponent, {
      props: { message: 'Test Message', buttonLabel: 'Test Button' }
    })
    await wrapper.find('button').trigger('click')
    expect(alertSpy).toHaveBeenCalledWith('Test Message')
    alertSpy.mockRestore()
  })

  it('prints default message if no message prop is provided', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { })
    const wrapper = mount(GreeterComponent, {
      props: { buttonLabel: 'Test Button' }
    })
    await wrapper.find('button').trigger('click')
    expect(alertSpy).toHaveBeenCalledWith('No message provided')
    alertSpy.mockRestore()
  })

  it('applies the correct theme class', () => {
    const wrapper = mount(GreeterComponent, {
      props: { theme: 'danger' }
    })
    expect(wrapper.find('button').classes()).toContain('theme-danger')
  })
})
