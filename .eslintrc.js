module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    // eslint:recommended
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "eqeqeq": "off",
    "curly": "error",
    "comma-dangle": ["error", "never"],

    "no-console": "off",
    "no-cond-assign": ["error", "always"],
    "no-empty": "warn",

    // override option
    "react/prop-types": "warn" // TODO: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
  }
};
