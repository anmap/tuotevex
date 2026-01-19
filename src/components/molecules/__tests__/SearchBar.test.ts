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
    const input = wrapper.find('input#search-input')

    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('search')
    expect(input.attributes('placeholder')).toBe('Search products')
    expect(input.attributes('aria-label')).toBe('Search products')
    expect(input.attributes('autocomplete')).toBe('off')
  })

  it('binds v-model value correctly', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'initial value',
      },
    })
    const input = wrapper.find('input#search-input')

    expect((input.element as HTMLInputElement).value).toBe('initial value')

    await input.setValue('updated value')
    expect(wrapper.emitted('update:modelValue')).toEqual([['updated value']])
  })
})
