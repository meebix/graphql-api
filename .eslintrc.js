module.exports = {
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  "plugins": [
      "import"
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "node_modules",
          "src"
        ],
        "extensions": [
          ".js",
          ".ts"
        ]
      }
    }
  },
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "class-methods-use-this": ["error", { "exceptMethods": ["up", "down"] }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-return-assign": ["error", "except-parens"],
    "object-curly-newline": 0,
  },
};
