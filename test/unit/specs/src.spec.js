import Vue from 'vue'
import VueExtender from '@/index'

Vue.use(VueExtender)

describe('Vue.defineField', () => {
  it('Should not be undefined', () => {
    const target = Vue.defineField;
    console.log("Vue.defineField: ", target);

    expect(target).not.toBeUndefined();
  });
})
