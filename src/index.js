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

const closeWindow = () => {
  if (!navigator) return;

  let userAgent = navigator.userAgent;
  if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
    window.open('', '_self').close();
  } else {
    window.opener = null;
    window.open("about:blank", "_self");
    window.close();
  }
};

const runAllExtenders = (Vue) => {
  runBasicExtender(Vue);

  Vue.defineFields(Vue.prototype, {
    "findChildrenByClass": findChildrenByClass,
    "closeWindow": closeWindow
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
