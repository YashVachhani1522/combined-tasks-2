const express=require("express")
const router=express.Router();


const { getLogin } = require("../controllers/main-login-project/practical1");
const forallcheckToken = require("../middlewares/forallroutercheck");
const ajaxform = require("./ajax-insert-update-form");
const citystate = require("./city-state-combo");
const component = require("./component");
const cucu_cube = require("./cucu-cube");
const delisearch = require("./deli-search");
const dynemic_table = require("./dynemic-table");
const jsevent = require("./event-prac");
const simpleinsertupdate = require("./insert-update-employee-form");
const jsonapi = require("./json-placeholder");
const router1 = require("./main-login-project");
const paginationorderby = require("./pagination-orderby");
const andorsearch = require("./perticular-search-and-or");
const sorting_Int = require("./sorting-int-char-string");
const getatt = require("./student-attendance");
const studentresult = require("./student-result");
const tic_tac_toe = require("./tic-tac-toe");
const timezone = require("./time-zone");
const htmlcss1 = require("./webpages1");
const htmlcss2 = require("./webpage2");
const htmlcss3 = require("./webpage3");






router.use("/main-login-project",router1);
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

module.exports=router;