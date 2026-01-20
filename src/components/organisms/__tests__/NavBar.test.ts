import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '../NavBar.vue'

// Mock @vueuse/core to avoid debounce timers in render tests
vi.mock('@vueuse/core', () => ({
  watchDebounced: () => undefined,
}))

describe('NavBar', () => {
  describe('rendering and accessibility', () => {
    it('renders accessible navigation with logo and home link', () => {
      const wrapper = mount(NavBar)

      // Semantic navigation with aria-label
      const nav = wrapper.find('nav')
      expect(nav.exists()).toBe(true)
      expect(nav.attributes('aria-label')).toBe('Main navigation')

      // Logo with alt text for accessibility
      expect(wrapper.find('img[alt="TuoteVex logo"]').exists()).toBe(true)

      // Home link points to root
      const homeLink = wrapper.find('a')
      expect(homeLink.attributes('href')).toBe('/')
    })

    it('renders SearchBar component', () => {
      const wrapper = mount(NavBar)
      expect(wrapper.findComponent({ name: 'SearchBar' }).exists()).toBe(true)
    })
  })
})
