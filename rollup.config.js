import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const input = './index.js';
const name = pkg.name;
const plugins = [babel()];

export default [
  {
    input,
    output: {
      format: 'es',
      file: pkg.module,
    },
    plugins,
  },
  {
    input,
    output: {
      format: 'umd',
      file: pkg.main,
      name,
    },
    plugins,
  },
  {
    input,
    output: {
      format: 'umd',
      file: pkg.main.replace('.js', '.min.js'),
      name,
    },
    plugins: plugins.concat(uglify()),
  },
];
