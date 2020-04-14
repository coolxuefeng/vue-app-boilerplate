import base from './base';

export default {
  install(Vue) {
    Vue.prototype.$api = base;
  },
};
