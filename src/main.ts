import GreeterComponent from '@/components/GreeterComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import type {
  GreeterAPI,
  GreeterInstance,
  GreeterProps,
  GreeterWrapperInstance,
  InternalInstance,
} from '@/types'
import { createPinia } from 'pinia'
import { createApp, defineComponent, h, type App } from 'vue'

const Greeter: GreeterAPI = {
  _instances: [],

  init(selector: string, props: GreeterProps = {}): GreeterInstance | null {
    const targetElement = document.querySelector(selector)

    if (!targetElement || !(targetElement instanceof HTMLElement)) {
      console.error(`Target element not found or is not an HTMLElement: ${selector}`)
      return null
    }

    const mountEl = document.createElement('div')
    targetElement.appendChild(mountEl)

    const WrapperComponent = defineComponent({
      name: 'GreeterWrapper',

      data(): { componentProps: GreeterProps } {
        return {
          componentProps: { ...props },
        }
      },
      render() {
        return h('div', [
          h(GreeterComponent, { ...this.componentProps }),
          h(ModalComponent)
        ])
      },
      methods: {
        updateProps(newProps: Partial<GreeterProps>): void {
          Object.assign(this.componentProps, newProps)
        },
      },
    })
    const app: App = createApp(WrapperComponent)

    app.use(createPinia())

    const instance = app.mount(mountEl) as GreeterWrapperInstance

    const instanceId = this._instances.length

    const internalInstanceData: InternalInstance = {
      app,
      instance,
      targetElement,
      mountEl,
    }
    this._instances.push(internalInstanceData)

    return {
      id: instanceId,
      update(newProps: Partial<GreeterProps>): void {
        const storedInstanceData = Greeter._instances[instanceId]
        if (storedInstanceData) {
          storedInstanceData.instance.updateProps(newProps)
        } else {
          console.warn(`Attempted to update a destroyed Greeter instance (ID: ${instanceId})`)
        }
      },
      destroy(): void {
        const storedInstanceData = Greeter._instances[instanceId]
        if (storedInstanceData) {
          storedInstanceData.app.unmount()
          storedInstanceData.mountEl.remove()
          Greeter._instances[instanceId] = null
        } else {
          console.warn(
            `Attempted to destroy an already destroyed or invalid Greeter instance (ID: ${instanceId})`,
          )
        }
      },
    }
  },
}

declare global {
  interface Window {
    Greeter: GreeterAPI
  }
}

window.Greeter = Greeter

export default Greeter
