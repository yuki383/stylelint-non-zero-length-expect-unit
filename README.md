# stylelint-non-zero-length-expect-unit
![ci](https://github.com/yuki383/stylelint-non-zero-length-expect-unit/actions/workflows/test.yml/badge.svg)

The rule enforces unit if length is non-zero.

In `styled-components/native >= v5`, you will get a lot of warnings if the style does not have a unit.
This rule allows you to statically detect where the warning occurs.

```css
div {
  height: 100;
  /* ↑ Unit expected */
}
```

## Installation

```
  npm install --save-dev stylelint stylelint-non-zero-length-expect-unit
```
or
```
  yarn add -D stylelint stylelint-non-zero-length-expect-unit
```

## Useage

```json
{
  "plugins": ["stylelint-non-zero-length-expect-unit"],
  "rules": {
    "plugin/non-zero-length-expect-unit": true
  }
}
```

