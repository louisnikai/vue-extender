import {
  runBasicExtender
} from "./basic.extender";

function _typeOf(value) {
  return Object.prototype.toString.call(value).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
}

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const wait = async (callback, time = 100, tryCount = 0) => {
  const result = {
    isSuccess: false,
    triedCount: 0
  };

  if (_typeOf(callback) !== "function") return result;

  while (true) {
    if (!!tryCount && result.triedCount >= tryCount) return result;

    result.triedCount++;
    let cbResult = await callback();
    if (cbResult) {
      result.isSuccess = true;
      return result;
    }
    await _sleep(time);
  }
};

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
    "sleep": sleep,
    "wait": wait,
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
