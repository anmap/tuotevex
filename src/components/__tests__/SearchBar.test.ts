import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'

describe('SearchBar', () => {
  it('renders', () => {
    const wrapper = mount(SearchBar)
    expect(wrapper.exists()).toBe(true)
  })

  it('has an accessible search input', () => {
    const wrapper = mount(SearchBar)
    const label = wrapper.find('label[for="search-input"]')
    const input = wrapper.find('input#search-input')

    expect(label.exists()).toBe(true)
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('search')
    expect(input.attributes('placeholder')).toBe('Search products')
  })

  it('emits updates when typing', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input#search-input')

    await input.setValue('test query')
    expect(wrapper.emitted('update:modelValue')).toEqual([['test query']])
  })
})
