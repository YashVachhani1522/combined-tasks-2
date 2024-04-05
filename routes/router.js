const express=require("express");
const { getForm, postForm, getData, getDeleteId, getDataId, getDisplay } = require("../controllers/ajax-insert-update-form/ajax");
const { getUpdateId, postUpdateId } = require("../controllers/ajax-insert-update-form/updateGetPost");
const { getRegForm, postUser, getUserActivation, postUserActivation, getDataActivation, getLogin, postLogin, getForget, postForget, getForgetActivation, postForgetActivation, getDashboardUserId, getLogout, getMenu, getHome, getWelcome } = require("../controllers/main-login-project/practical1");
const checkToken = require("../middlewares/login-main-project");
const { getDemo, getState, getCity, getCityId } = require("../controllers/city-state-combo/citystate");
const getComponent = require("../controllers/component/component");
const getCucuCubeGame = require("../controllers/cucu-cube/cucu-cube");
const { getDeli, postDeli } = require("../controllers/deli-search/deli");
const getDynemicTable = require("../controllers/dynemic-table/dynemic-table");
const getJsEvent = require("../controllers/events-prac/event");
const { getInsert, postInsert, getbasicdetailsdata, display, getDelete, getData2} = require("../controllers/insert-update-employee-form/insertupdate");
const { getUpdate, postUpdate } = require("../controllers/insert-update-employee-form/updateGetPost");
const { getPostId1, getmain } = require("../controllers/json-placeholder/json");
const { getUser, getOrderBy } = require("../controllers/pagination-orderby/pagination");
const getSearch = require("../controllers/perticular-search-and-or/search");
const getSortingInt = require("../controllers/sorting-int-char-string/sorting");
const getAttendance = require("../controllers/student-attendance/student");
const { getResult, getResId } = require("../controllers/student-result/student");
const getTicTacToeGame = require("../controllers/tic-tac-toe/tic-tac-toe");
const getTimeZone = require("../controllers/time-zone/time-zone");
const getHtmlCss1 = require("../controllers/html-css-1/1");
const getHtmlCss2 = require("../controllers/html-css-2/2");
const getHtmlCss3 = require("../controllers/html-css-3/3");
const forallcheckToken = require("../middlewares/forallroutercheck");


const mainLogin=express.Router();
const ajaxform=express.Router();
const citystate = express.Router();
const component= express.Router();
const cucu_cube = express.Router();
const delisearch = express.Router();
const dynemic_table = express.Router();
const jsevent = express.Router();
const simpleinsertupdate = express.Router();
const jsonapi = express.Router();
const paginationorderby = express.Router();
const andorsearch = express.Router();
const sorting_Int = express.Router();
const getatt = express.Router();
const studentresult = express.Router();
const tic_tac_toe = express.Router();
const timezone = express.Router();
const htmlcss2 = express.Router();
const htmlcss3 = express.Router();
const htmlcss1 = express.Router();

const router=express.Router();



router.use("/main-login-project",mainLogin);
router.use("/dynemic-table",forallcheckToken,dynemic_table)
router.use("/cucu-cube",forallcheckToken,cucu_cube)
router.use("/tic-tac-toe",forallcheckToken,tic_tac_toe)
router.use("/sorting-int",forallcheckToken,sorting_Int)
router.use("/js-event",forallcheckToken,jsevent)
router.use("/std-attendance",forallcheckToken,getatt)
router.use("/student-result",forallcheckToken,studentresult)
router.use("/deli-search",forallcheckToken,delisearch)
router.use("/component",forallcheckToken,component)
router.use("/insert-update-employee-form/",forallcheckToken,simpleinsertupdate)
router.use("/pagination-orderby",forallcheckToken,paginationorderby)
router.use("/city-state",forallcheckToken,citystate)
router.use("/time-zone",forallcheckToken,timezone)
router.use("/ajax-form",forallcheckToken,ajaxform)
router.use("/json-placeholder",forallcheckToken,jsonapi)
router.use("/and-or-search",forallcheckToken,andorsearch)
router.use("/html-css-1",forallcheckToken,htmlcss1)
router.use("/html-css-2",forallcheckToken,htmlcss2)
router.use("/html-css-3",forallcheckToken,htmlcss3)
router.get("/",getLogin);

//======================================================main-login-project==========================================

mainLogin.get('/',getRegForm)
mainLogin.post('/user',postUser)
mainLogin.get('/user/:activationcode',getUserActivation)
mainLogin.post('/user/:activationcode',postUserActivation)
//collect data from database 
mainLogin.get('/data/:activationcode',getDataActivation)

mainLogin.get('/login',getLogin)
mainLogin.post('/login',postLogin)

mainLogin.get('/forget',getForget)
mainLogin.post('/forget',postForget)

mainLogin.get('/forget/:activationcode',getForgetActivation)
mainLogin.post('/forget/:activationcode',postForgetActivation)

mainLogin.get('/dashboard/:userid',checkToken,getDashboardUserId)

mainLogin.get('/logout',getLogout)

mainLogin.get('/menu',getMenu)

mainLogin.get('/home',getHome)

mainLogin.get('/welcome',getWelcome)

//===========================================xxxxxxxxxxxxxxxxxxxxxxxxx================================================



//-----------------------------------------------------ajax-project-----------------------------------------------------------------------------

ajaxform.get('/form',getForm)
ajaxform.post('/form',postForm)

ajaxform.get("/data",getData)

ajaxform.get('/delete/:id',getDeleteId)

ajaxform.get('/data/:id',getDataId)
ajaxform.get('/update/:id',getUpdateId)

ajaxform.post('/update/:id',postUpdateId)

ajaxform.get('/display',getDisplay)

//==========================================================xxxxxxxxxxxxxxxxxxxxx===========================================

//==============================================city-state-combo=====================================================

citystate.get('/demo',getDemo)

citystate.get('/state',getState)
citystate.get('/city',getCity)

citystate.get('/city/:id',getCityId)



//--------------------------------------xxxxxxxxxxxxxxxxxxxxxx----------------------------------------------------

//=================================================component=============================================
  component.get('/',getComponent)
//===========================================================xxxxxxxxxxxxxxxxx======================================


//=============================================cuccu-cube========================================================
cucu_cube.get('/',getCucuCubeGame)
//===========================================================xxxxxxxxxxxxxxxxx======================================

//============================================deli-search========================================================
delisearch.get('/',getDeli)
delisearch.post('/',postDeli)

//===========================================================xxxxxxxxxxxxxxxxx======================================

//============================================dynemic-table========================================================
dynemic_table.get('/',getDynemicTable)
//===========================================================xxxxxxxxxxxxxxxxx======================================


//============================================event-prac========================================================
jsevent.get('/',getJsEvent)

//===========================================================xxxxxxxxxxxxxxxxx======================================


//============================================insert-update-employe========================================================

simpleinsertupdate.get('/',getInsert)
simpleinsertupdate.post('/',postInsert)

simpleinsertupdate.get("/data/:id",getData2)

simpleinsertupdate.get('/update/:id',getUpdate)
simpleinsertupdate.post('/update/:id',postUpdate)

simpleinsertupdate.get('/data',getbasicdetailsdata)

simpleinsertupdate.get("/display", display);    

simpleinsertupdate.get("/delete/:id",getDelete)
//===========================================================xxxxxxxxxxxxxxxxx======================================


//=============================================json-placeholder========================================================

jsonapi.get('/',getmain)
jsonapi.get('/post-details/:id',getPostId1)

//=============================================xxxxxxxxxxxxxxxx========================================================

//=============================================pagination-orderby========================================================

paginationorderby.get('/users/:page',getUser)
paginationorderby.get('/users/:page/:first_name/:order',getOrderBy)


//=============================================xxxxxxxxxxxxxxxx========================================================


//=============================================perticular-serach===============================================
andorsearch.get('/',getSearch)

//=============================================xxxxxxxxxxxxxxxx========================================================

//=============================================sorting-int-char========================================================

sorting_Int.get('/',getSortingInt)

//=============================================xxxxxxxxxxxxxxxx========================================================

//=============================================student-attendance========================================================


getatt.get('/',getAttendance)

//=============================================xxxxxxxxxxxxxxxx========================================================



//=============================================student-result========================================================
studentresult.get('/',getResult)
studentresult.get('/res/:id',getResId)
//=============================================xxxxxxxxxxxxxxxx========================================================



//=============================================tic-tac-toe========================================================
tic_tac_toe.get('/',getTicTacToeGame)
//=============================================xxxxxxxxxxxxxxxx========================================================


//=============================================time-zone========================================================
timezone.get('/',getTimeZone)
//=============================================xxxxxxxxxxxxxxxx========================================================

//=============================================html-css-2========================================================

htmlcss2.get('/',getHtmlCss2)

//=============================================xxxxxxxxxxxxxxxx========================================================

//=============================================html-css-3========================================================

htmlcss3.get('/',getHtmlCss3)

//=============================================xxxxxxxxxxxxxxxx========================================================

//=============================================html-css-3========================================================
htmlcss1.get('/',getHtmlCss1)

//=============================================xxxxxxxxxxxxxxxx========================================================


module.exports=router;