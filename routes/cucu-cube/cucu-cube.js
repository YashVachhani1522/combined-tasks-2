const express = require('express');
const getCucuCubeGame = require('../../controllers/cucu-cube/cucu-cube');
const cucu_cube = express.Router();


cucu_cube.get('/',getCucuCubeGame)

module.exports=cucu_cube;

