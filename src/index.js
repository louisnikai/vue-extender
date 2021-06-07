import {
  runBasicExtender
} from "./basic.extender";

const findChildrenByClass = (className, vueCom = null) => {
  if (!vueCom)
    vueCom = this;

  try {
    if (vueCom.$el.classList.contains(className))
      return vueCom;

    if (vueCom.$children.length === 0)
      return null;

    let vcFinded;
    for (let i = 0; i < vueCom.$children.length; i++) {
      vcFinded = findChildrenByClass(className, vueCom.$children[i]);
      if (!!vcFinded)
        break;
    }
    return vcFinded;
  } catch (error) {
    return null;
  }
};

const runAllExtenders = (Vue) => {
  runBasicExtender(Vue);

  Vue.defineFields(Vue.prototype, {
    "findChildrenByClass": findChildrenByClass
  });
};

export {
  runBasicExtender,
  runAllExtenders
};

export default {
  install(Vue) {
    runAllExtenders(Vue);
  }
};
