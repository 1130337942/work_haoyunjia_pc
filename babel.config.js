module.exports = {
  presets: [
    '@vue/app',
  //  ["es2015", { "modules": false }]
  ],
 // "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}