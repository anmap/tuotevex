import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders skip links with valid targets', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          NavBar: true,
          RouterView: true,
        },
      },
    })

    const skipNav = wrapper.find('nav[aria-label="Skip links"]')
    expect(skipNav.exists()).toBe(true)

    const links = skipNav.findAll('a')
    expect(links).toHaveLength(2)
    expect(links[0]?.attributes('href')).toBe('#main-content')
    expect(links[1]?.attributes('href')).toBe('#search-input')

    const main = wrapper.find('main#main-content')
    expect(main.exists()).toBe(true)
    expect(main.attributes('tabindex')).toBe('-1')
  })
})
