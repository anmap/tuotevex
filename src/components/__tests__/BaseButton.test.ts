import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'

describe('BaseButton', () => {
  it('renders button with slot content and defaults', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Click me')
    expect(button.attributes('type')).toBe('button')
  })

  it('allows custom type attribute', () => {
    const wrapper = mount(BaseButton, {
      props: { type: 'submit' },
      slots: { default: 'Submit' },
    })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  describe('variants', () => {
    it('applies primary variant styles by default', () => {
      const wrapper = mount(BaseButton, { slots: { default: 'Button' } })
      const classes = wrapper.find('button').classes()
      expect(classes).toContain('bg-primary')
      expect(classes).toContain('text-white')
      expect(classes).toContain('hover:bg-primary/90')
    })

    it('applies secondary variant styles', () => {
      const wrapper = mount(BaseButton, {
        props: { variant: 'secondary' },
        slots: { default: 'Button' },
      })
      const classes = wrapper.find('button').classes()
      expect(classes).toContain('border')
      expect(classes).toContain('border-gray-300')
      expect(classes).toContain('bg-white')
      expect(classes).not.toContain('bg-primary')
    })
  })

  describe('click events', () => {
    it('emits click event with MouseEvent payload', async () => {
      const wrapper = mount(BaseButton, { slots: { default: 'Click me' } })
      await wrapper.find('button').trigger('click')
      const emitted = wrapper.emitted('click')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]?.[0]).toBeInstanceOf(Event)
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(BaseButton, {
        props: { disabled: true },
        slots: { default: 'Disabled' },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })

  describe('disabled state', () => {
    it('applies disabled attribute and styling', () => {
      const wrapper = mount(BaseButton, {
        props: { disabled: true },
        slots: { default: 'Disabled' },
      })
      const button = wrapper.find('button')
      expect(button.attributes('disabled')).toBeDefined()
      expect(button.classes()).toContain('opacity-50')
      expect(button.classes()).toContain('!cursor-not-allowed')
    })
  })

  describe('attributes and accessibility', () => {
    it('passes through HTML attributes and aria attributes', () => {
      const wrapper = mount(BaseButton, {
        props: {
          id: 'my-button',
          'data-testid': 'test-button',
          'aria-label': 'Close dialog',
          class: 'custom-class',
        },
        slots: { default: 'Button' },
      })
      const button = wrapper.find('button')
      expect(button.attributes('id')).toBe('my-button')
      expect(button.attributes('data-testid')).toBe('test-button')
      expect(button.attributes('aria-label')).toBe('Close dialog')
      expect(button.classes()).toContain('custom-class')
    })
  })

  describe('base styles', () => {
    it('applies base button styles to all variants', () => {
      const wrapper = mount(BaseButton, { slots: { default: 'Button' } })
      const classes = wrapper.find('button').classes()
      expect(classes).toContain('rounded-md')
      expect(classes).toContain('px-6')
      expect(classes).toContain('py-3')
      expect(classes).toContain('transition-colors')
    })
  })
})
