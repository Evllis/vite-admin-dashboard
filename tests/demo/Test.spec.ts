import { mount } from '@vue/test-utils'
import Home from '@/pages/Home.vue'

test('Home.vue', () => {
    const wrapper = mount(Home)
    expect(wrapper.html()).toContain('Unit Home Page')
    console.log(wrapper.html())
})
