import { shallowMount } from '@vue/test-utils'
import App from './App'

describe('App', () => {
  it('should render to a empty grid when list is empty', () => {
    const propsData = { coredata: [] }
    const wrapper = shallowMount(App, { propsData })
    expect(wrapper.element).toMatchSnapshot()
  })
})  