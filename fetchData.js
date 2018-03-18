const axios = require('axios')
const fs = require('fs')
const qs = require('querystring')

// init config
const getInfoAPI = 'http://dofordad.com/get_info.php'
const lastPixel = 80703
let startPixel = 1

const tempData = []
const getInfo = pixel => axios.post('http://dofordad.com/get_info.php', qs.stringify({ 'pixel': pixel }))
.then((result) => {
  console.log('GET Success at pixel ', startPixel)
  if (result.data.length !== 0) {
    tempData.push(result.data)
  }
  if (startPixel <= lastPixel) {
    getInfo(++startPixel)
  } else {
    console.log('Save file')
    fs.writeFile('goals.json', JSON.stringify(tempData), 'utf8', (err) => {
      if (err) {
        console.log('Save file ERROR: ', err)
      } else {
        console.log('Save file SUCCESS')
      }
    })
  }
})
.catch((err) => {
  console.log('GET ERROR at pixel ', startPixel)
  console.group()
  console.log('ERROR: ', err)
  console.groupEnd()
  if (startPixel <= lastPixel) {
    getInfo(startPixel)
  }
})

getInfo(startPixel)
