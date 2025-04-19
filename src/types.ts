import type { App, ComponentPublicInstance } from 'vue'

export type ThemeType = 'primary' | 'secondary' | 'success' | 'danger'

export interface GreeterProps {
  message?: string
  buttonLabel?: string
  theme?: ThemeType
}

export interface GreeterInstance {
  id: number
  update(newProps: Partial<GreeterProps>): void
  destroy(): void
}

export interface GreeterWrapperInstance extends ComponentPublicInstance {
  updateProps(newProps: Partial<GreeterProps>): void
}

export interface InternalInstance {
  app: App
  instance: GreeterWrapperInstance
  targetElement: HTMLElement
  mountEl: HTMLElement
}

export interface GreeterAPI {
  _instances: (InternalInstance | null)[]
  init(selector: string, props?: GreeterProps): GreeterInstance | null
}
