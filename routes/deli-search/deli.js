const express = require('express');
const { getDeli, postDeli } = require('../../controllers/deli-search/deli');
const delisearch = express.Router();


delisearch.get('/',getDeli)
delisearch.post('/',postDeli)

module.exports=delisearch;

