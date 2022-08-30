const fs = require('fs')

const packageFilePath = '../../package.json'
const envFilePath = '../../.env'
const themeConfigFilePath =
  '../../src/configs/themeConfig.js'
const useSkinHookFilePath =
  '../../src/utility/hooks/useSkin.js'
const layoutReducerFilePath =
  '../../src/redux/reducers/layout/index.js'
const indexFile = '../../src/index.js'

const demo = 'demo-1'

// Update package.json file
if (fs.existsSync(packageFilePath)) {
  fs.readFile(packageFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(new RegExp(/("homepage":\s)("(.*)")/, 'g'), '$1""')

    fs.writeFile(packageFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Update .env file
if (fs.existsSync(envFilePath)) {
  fs.readFile(envFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(new RegExp(/(REACT_APP_BASENAME=\s*)("(.*)")/, 'g'), '$1""')

    fs.writeFile(envFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Reset useSkin hook
if (fs.existsSync(useSkinHookFilePath)) {
  fs.readFile(useSkinHookFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(new RegExp(/(localStorage.(get|set)Item\(')(.*)('.*\))/, 'g'), `$1skin$4`)

    fs.writeFile(useSkinHookFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Reset layout reducer for menuCollapsed localstorage
if (fs.existsSync(layoutReducerFilePath)) {
  fs.readFile(layoutReducerFilePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result = data.replace(new RegExp(/(localStorage.(get|set)Item\(')(.*)('.*\))/, 'g'), `$1menuCollapsed$4`)

    fs.writeFile(layoutReducerFilePath, result, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// Replace themeConfig file
if (fs.existsSync(themeConfigFilePath)) {
  fs.copyFile(`./demo-configs/${demo}/themeConfig.js`, themeConfigFilePath, err => {
    if (err) {
      return console.log(err)
    }
  })
}


// ** Remove basename in index.js
if (fs.existsSync(indexFile)) {
  fs.readFile(indexFile, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const result = data.replace(/<BrowserRouter.*/, '<BrowserRouter>')

      fs.writeFile(indexFile, '', (err) => {
        if (err) {
          console.log(err)
        } else {
          fs.writeFile(indexFile, result, err => {
            if (err) {
          console.log(err)
        }
          })
        }
      })
    }
  })
}
