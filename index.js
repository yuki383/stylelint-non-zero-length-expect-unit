const valueParser = require("postcss-value-parser");
const createPlugin = require("stylelint");
const declarationValueIndex = require("stylelint/lib/utils/declarationValueIndex");
const getDeclarationValue = require("stylelint/lib/utils/getDeclarationValue");
const report = require("stylelint/lib/utils/report");
const ruleMessages = require("stylelint/lib/utils/ruleMessages");
const validateOptions = require("stylelint/lib/utils/validateOptions");

const ruleName = "plugin/length-not-zero-expect-unit";

const messages = ruleMessages(ruleName, {
  rejected: "Unit Expected",
});

const propertiesWithoutUnits = [
  "flex",
  "aspect-ratio",
  "flex-grow",
  "flex-shrink",
  "opacity",
  "shadow-opacity",
  "elevation",
  "z-index",
  "font-weight",
];

const propertiesWithUnitsRegExp = new RegExp(propertiesWithoutUnits.join("|"));

function rule(actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual,
    });
    if (!validOptions) return;

    function check(node, nodeIndex, valueNode) {
      const { value, sourceIndex } = valueNode;

      if (isFunction(valueNode)) {
        return false;
      }

      if (!isWord(valueNode)) return;

      const numberUnit = valueParser.unit(value);
      if (numberUnit === false) return;

      const { number, unit } = numberUnit;

      const needsUnit = !propertiesWithUnitsRegExp.test(node.prop);
      if (!needsUnit) return;

      if (unit !== "") return;
      if (isZero(number)) return;

      report({
        index: nodeIndex + sourceIndex + number.length,
        message: messages.rejected,
        node,
        result,
        ruleName,
      });
    }

    function checkDecl(node) {
      const index = declarationValueIndex(node);
      const parsedValue = valueParser(getDeclarationValue(node));

      parsedValue.walk((valueNode) => {
        return check(node, index, valueNode);
      });
    }

    root.walkDecls(checkDecl);
  };
}

function isFunction({ type }) {
  return type === "function";
}

function isWord({ type }) {
  return type === "word";
}

function isZero(number) {
  return Number.parseFloat(number) === 0;
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = stylelint.createPlugin(ruleName, rule);
