import { hasOwn } from 'element-ui-lw-param/src/utils/util';

export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};
