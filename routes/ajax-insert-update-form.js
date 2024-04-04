const express = require('express');
const { getForm, postForm, getData, getDeleteId, getDataId, getDisplay } = require('../controllers/ajax-insert-update-form/ajax');
const checkToken = require('../middlewares/login-main-project');
const { getUpdateId, postUpdateId } = require('../controllers/ajax-insert-update-form/updateGetPost');
const ajaxform= express.Router();


ajaxform.get('/form',getForm)
ajaxform.post('/form',postForm)

ajaxform.get("/data",getData)

ajaxform.get('/delete/:id',getDeleteId)

ajaxform.get('/data/:id',getDataId)
ajaxform.get('/update/:id',getUpdateId)

ajaxform.post('/update/:id',postUpdateId)

ajaxform.get('/display',getDisplay)

module.exports=ajaxform;

