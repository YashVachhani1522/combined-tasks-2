const express = require('express');
const { getRegForm,postUser, getUserActivation, postUserActivation, getDataActivation, getLogin, postLogin, getForget, postForget, getForgetActivation, postForgetActivation, getDashboardUserId, getLogout } = require('../../controllers/main-login-project/practical1');
const checkToken = require('../../middlewares/login-main-project');
const router = express.Router();

router.get('/',getRegForm)
router.post('/user',postUser)
router.get('/user/:activationcode',getUserActivation)
router.post('/user/:activationcode',postUserActivation)
//collect data from database 
router.get('/data/:activationcode',getDataActivation)

router.get('/login',getLogin)
router.post('/login',postLogin)

router.get('/forget',getForget)
router.post('/forget',postForget)

router.get('/forget/:activationcode',getForgetActivation)
router.post('/forget/:activationcode',postForgetActivation)

router.get('/dashboard/:userid',checkToken,getDashboardUserId)

router.get('/logout',getLogout)

module.exports=router;