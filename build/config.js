var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`element-ui-lw-param/packages/${key}`] = `element-ui-lw-param/lib/${key}`;
});

externals['element-ui-lw-param/src/locale'] = 'element-ui-lw-param/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui-lw-param/src/utils/${file}`] = `element-ui-lw-param/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui-lw-param/src/mixins/${file}`] = `element-ui-lw-param/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui-lw-param/src/transitions/${file}`] = `element-ui-lw-param/lib/transitions/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'element-ui-lw-param': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
