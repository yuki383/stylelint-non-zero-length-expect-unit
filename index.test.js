const messages = require(".").messages;
const ruleName = require(".").ruleName;
const getTestRule = require("jest-preset-stylelint/getTestRule");

const testRule = getTestRule({ plugins: ["./"] });

testRule({
  plugins: ["."],
  ruleName,
  config: [true],

  accept: [
    { code: "div: { height: 0; }" },
    { code: "div: { height: 10px; }" },
    { code: "div: { flex: 10; }" },
    { code: "div: { aspect-ratio: 10; }" },
    { code: "div: { flex-grow: 10; }" },
    { code: "div: { flex-shrink: 10; }" },
    { code: "div: { opacity: 10; }" },
    { code: "div: { shadow-opacity: 10; }" },
    { code: "div: { elevation: 10; }" },
    { code: "div: { z-index: 10; }" },
    { code: "div: { font-weight: 100; }" },
  ],

  reject: [
    {
      code: "div: { height: 10 }",
      message: messages.rejected,
    },
  ],
});
