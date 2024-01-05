module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "error",
    indent: ["error", 4, { "SwitchCase": 1 }],
    semi: [2, "always"],
    quotes: ["error", "double"],
    "newline-before-return": "error"
  }
}
