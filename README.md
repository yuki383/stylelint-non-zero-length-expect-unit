# stylelint-length-not-zero-expect-unit
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
  npm install --save-dev stylelint stylelint-length-not-zero-expect-unit
```
or
```
  yarn add -D stylelint stylelint-length-not-zero-expect-unit
```

## Useage

```json
{
  "plugins": ["stylelint-length-not-zero-expect-unit"],
  "rules": {
    "plugin/stylelint-length-not-zero-expect-unit": true
  }
}
```

