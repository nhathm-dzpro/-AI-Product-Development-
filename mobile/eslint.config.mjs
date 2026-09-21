import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  ...compat.extends('expo'),
  {
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: ['node_modules/', '.expo/', 'dist/'],
  },
];
