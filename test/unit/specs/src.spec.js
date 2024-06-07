import Vue from 'vue'
import VueExtender from '@/index'

Vue.use(VueExtender)

describe('Vue.defineField', () => {
  it('Should not be undefined', () => {
    const target = Vue.defineField;

    console.log("Should not be undefined: ", target);
    expect(target).not.toBeUndefined();
  });

  it('Should not replaced', () => {
    const target = {};
    const fieldFunc1 = () => {
      return "Test1";
    };
    const fieldFunc2 = () => {
      return "Test2";
    };

    Vue.defineField(target, "testFunc", fieldFunc1);
    Vue.defineField(target, "testFunc", fieldFunc2);

    expect(target.testFunc).toEqual(fieldFunc1);
  });

  it('Should force replaced', () => {
    const target = {};
    const fieldFunc1 = () => {
      return "Test1";
    };
    const fieldFunc2 = () => {
      return "Test2";
    };

    Vue.defineField(target, "testFunc", fieldFunc1, true);
    Vue.defineField(target, "testFunc", fieldFunc2, true);

    expect(target.testFunc).toEqual(fieldFunc2);
  });
})

describe('Vue.defineProperty', () => {
  it('Should not be undefined', () => {
    const target = Vue.defineProperty;

    console.log("Should not be undefined: ", target);
    expect(target).not.toBeUndefined();
  });

  it('Should not replaced', () => {
    const target = {};
    const prop1 = {
      get() {
        return "Test1";
      }
    };
    const prop2 = {
      get() {
        return "Test2";
      }
    };

    Vue.defineProperty(target, "testProp", prop1);
    Vue.defineProperty(target, "testProp", prop2);

    expect(target.testProp).toEqual("Test1");
  });

  it('Should force replaced', () => {
    const target = {
      testProp: "Test0"
    };
    const prop1 = {
      get() {
        return "Test1";
      }
    };
    const prop2 = {
      get() {
        return "Test2";
      }
    };

    Vue.defineProperty(target, "testProp", prop1, false, true);
    Vue.defineProperty(target, "testProp", prop2, false, true);

    expect(target.testProp).toEqual("Test2");
  });
})
