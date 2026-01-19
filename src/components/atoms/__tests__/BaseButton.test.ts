import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Component } from 'vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

describe('BaseButton', () => {
  const RouterLinkStub: Component = {
    name: 'RouterLink',
    props: ['to', 'custom'],
    setup(props, { slots }) {
      const navigate = vi.fn()
      const href = typeof props.to === 'string' ? props.to : '/'
      return () => slots.default?.({ href, navigate })
    },
  }

  const mountWithRouterLink = (props = {}, slots = {}) => {
    return mount(BaseButton, {
      props,
      slots,
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
  }
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

  describe('RouterLink rendering', () => {
    it('renders link when "to" prop is provided', () => {
      const wrapper = mountWithRouterLink(
        { to: '/' },
        { default: 'Go Home' }
      )
      const link = wrapper.find('a')
      expect(link.exists()).toBe(true)
      expect(link.attributes('href')).toBe('/')
      expect(link.text()).toBe('Go Home')
    })

    describe('RouterLink disabled state', () => {
      it('applies disabled styling and aria-disabled to RouterLink', () => {
        const wrapper = mountWithRouterLink(
          { to: '/', disabled: true },
          { default: 'Disabled Link' }
        )
        const link = wrapper.find('a')
        expect(link.classes()).toContain('opacity-50')
        expect(link.classes()).toContain('!cursor-not-allowed')
        expect(link.attributes('aria-disabled')).toBe('true')
        expect(link.attributes('tabindex')).toBe('-1')
      })

      it('does not emit click when RouterLink is disabled', async () => {
        const wrapper = mountWithRouterLink(
          { to: '/', disabled: true },
          { default: 'Disabled Link' }
        )
        const link = wrapper.find('a')
        await link.trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
      })
    })

    describe('RouterLink click events', () => {
      it('emits click event when RouterLink is clicked and not disabled', async () => {
        const wrapper = mountWithRouterLink(
          { to: '/' },
          { default: 'Link' }
        )
        const link = wrapper.find('a')
        await link.trigger('click')
        const emitted = wrapper.emitted('click')
        expect(emitted).toBeTruthy()
        expect(emitted?.[0]?.[0]).toBeInstanceOf(Event)
      })
    })

    describe('attributes and accessibility', () => {
      it('passes through HTML attributes to button', () => {
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

      it('passes through HTML attributes to RouterLink', () => {
        const wrapper = mountWithRouterLink(
          {
            to: '/',
            id: 'my-link',
            'data-testid': 'test-link',
            'aria-label': 'Go to home',
            class: 'custom-class',
          },
          { default: 'Link' }
        )
        const link = wrapper.find('a')
        expect(link.attributes('id')).toBe('my-link')
        expect(link.attributes('data-testid')).toBe('test-link')
        expect(link.attributes('aria-label')).toBe('Go to home')
        expect(link.classes()).toContain('custom-class')
      })
    })
  })
})
