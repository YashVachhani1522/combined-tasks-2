const express=require('express');
const path = require('path');
const router = require('./routes/main-login-project/practical-1');
const app=express();
var cookieParser = require('cookie-parser');
const dynemic_table = require('./routes/dynemic-table/dynemictable');
const { getLogin } = require('./controllers/main-login-project/practical1');
const cucu_cube = require('./routes/cucu-cube/cucu-cube');
const tic_tac_toe = require('./routes/tic-tac-toe/tic-tac-toe');
const sorting_Int = require('./routes/sorting-int-char-string/sorting');
const jsevent = require('./routes/event-prac/event');
const getatt = require('./routes/student-attendance/student');
const studentresult = require('./routes/student-result/student');
const delisearch = require('./routes/deli-search/deli');
const component = require('./routes/component/component');
const simpleinsertupdate = require('./routes/insert-update-employee-form/insertupdate');
const paginationorderby = require('./routes/pagination-orderby/pagiroutes');
const citystate = require('./routes/city-state-combo/citystate');
const timezone = require('./routes/time-zone/time-zone');
const ajaxform = require('./routes/ajax-insert-update-form/ajax-form');
const jsonapi = require('./routes/json-placeholder/json');
const andorsearch = require('./routes/perticular-search-and-or/search');
const htmlcss1 = require('./routes/html-css-1/html');

require('dotenv').config()


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname+'/public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())


app.listen(process.env.PORT,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {   
        app.use("/main-login-project",router);
        app.use("/dynemic-table",dynemic_table)
        app.use("/cucu-cube",cucu_cube)
        app.use("/tic-tac-toe",tic_tac_toe)
        app.use("/sorting-int",sorting_Int)
        app.use("/js-event",jsevent)
        app.use("/std-attendance",getatt)
        app.use("/student-result",studentresult)
        app.use("/deli-search",delisearch)
        app.use("/component",component)
        app.use("/insert-update-employee-form/",simpleinsertupdate)
        app.use("/pagination-orderby",paginationorderby)
        app.use("/city-state",citystate)
        app.use("/time-zone",timezone)
        app.use("/ajax-form",ajaxform)
        app.use("/json-placeholder",jsonapi)
        app.use("/and-or-search",andorsearch)
        app.use("/html-css-1",htmlcss1)
        app.get("/",getLogin);

        console.log(`server listen on http://${process.env.HOST}:${process.env.PORT}`)
    }
})