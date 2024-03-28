const express = require('express');
const getComponent = require('../../controllers/component/component');
const component= express.Router();


component.get('/',getComponent)

module.exports=component;

