module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  // tabWidth: 2,
  overrides:[
    {
      files:"*.js",
      options:{
        tabWidth:4
      }
    },
    {
      files:"*.jsx",
      options:{
        tabWidth:2
      }
    }
  ]
};
