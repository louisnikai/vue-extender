import ImportedVue from "vue";

const _defineReactiveKey = "defineReactive";
const _typeOf = (value) => {
  return Object.prototype.toString.call(value).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
};

export function runBasicExtender(Vue = ImportedVue) {
  Vue.defineField = Vue.defineField || function (target, key, field) {
    if (!target || !key) return;

    target[key] = target[key] || field;
  };

  Vue.defineField(Vue, "defineFields", (target, fieldOptions) => {
    if (!target || !fieldOptions) return;
    if (_typeOf(fieldOptions) !== "object") return;

    Object.entries(fieldOptions).forEach(([key, value]) => {
      Vue.defineField(target, key, value);
    });
  });

  Vue.defineField(Vue, "defineProperty", (target, key, propOption, isDefineReactive = false) => {
    if (!target || !key || !propOption) return;
    if (!!(key in target)) return;
    if (_typeOf(propOption) !== "object") return;

    let needDefineReactive = false;
    let prop = propOption;
    if (isDefineReactive) {
      let hasDefineReactive = Object.keys(propOption).includes(_defineReactiveKey);
      needDefineReactive = hasDefineReactive ? propOption.defineReactive : true;
      prop = Object.assign({}, propOption);
      if (hasDefineReactive)
        delete prop[_defineReactiveKey];
    }

    if (needDefineReactive) {
      prop.enumerable = true;
      prop.configurable = true;
    }
    Object.defineProperty(target, key, prop);
    if (needDefineReactive)
      Vue.util.defineReactive(target, key);
  });

  Vue.defineField(Vue, "defineProperties", (target, propOptions, isDefineReactive = false) => {
    if (!target || !propOptions) return;
    if (_typeOf(propOptions) !== "object") return;

    Object.entries(propOptions).forEach(([key, value]) => {
      Vue.defineProperty(target, key, value, isDefineReactive);
    });
  });
};
