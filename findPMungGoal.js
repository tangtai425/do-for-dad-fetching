const axios = require('axios')
const qs = require('querystring')

const getInfoAPI = 'http://dofordad.com/get_info.php'
const targetName = 'Thakerng Soimadee'
const lastPixel = 100000
let startPixel = 1

const getInfo = pixel => axios.post('http://dofordad.com/get_info.php', qs.stringify({ 'pixel': pixel }))
  .then((result) => {
    console.log('GET Success at pixel ', startPixel)
    if (result.data.name === targetName) {
      console.log(`This is ${result.data.name}'s goal: `, result.data.goal)
    } else {
      if (startPixel <= lastPixel) {
        getInfo(++startPixel)
      }
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
