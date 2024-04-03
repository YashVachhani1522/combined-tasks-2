const viewapidata=(tblid,data,hidetbl)=>{
    let tbl=tblid;
    let tbl_id=document.getElementById(tbl);
    let data=data;
    // console.log(data);


// let fields=['id','slug','title','category','view details'];

    let fields=Object.keys(data);  

    // console.log(fields);          
    tbl_id.innerHTML="";

    for(let i=0;i<fields.length;i++)
    {
        let tr=document.createElement('tr');
        let td=document.createElement('td');
        td.innerHTML=fields[i];
        tr.appendChild(td);
        if(fields[i]=='image')
        {
            let td=document.createElement('td')
            td.innerHTML=`<img src='${data[fields[i]]}' height='100px'>`
            tr.appendChild(td);
        }
        else if(fields[i]=='thumbnail')
        {
            let td=document.createElement('td')
            td.innerHTML=`<img src='${data[fields[i]]}' height='100px'>`
            tr.appendChild(td);

        }
        else
        {
            let td=document.createElement('td');
            td.innerHTML=data[fields[i]]
            tr.appendChild(td);
        }          
        tbl2.appendChild(tr);
        
    }
        let tr2=document.createElement('tr');
        let td2=document.createElement('td');
        let btn2=document.createElement('button');
        let print2=document.createTextNode('view comments');
        btn2.setAttribute('onclick',`toggle(${data.id},'${hidetbl}')`);
        btn2.appendChild(print2);
        td2.appendChild(btn2);
        tr2.appendChild(td2);
        tbl2.appendChild(tr2);

}

const toggle=(id,tblhideid)=>{
document.getElementById(tblhideid).innerHTML="";
if(document.getElementById(tblhideid).style.display=='none')
    {
        console.log(id);
        document.getElementById(tblhideid).style.display='block';
        
        const fun2=async()=>{
            let result=await fetch('https://jsonplaceholder.typicode.com/comments');
            return await result.json();
        }

        fun2().then((data)=>{
            let arr=[]
            // console.log(data);
            data.forEach(element => {
                if(element.postId==id)
                {
                    arr.push(element);
                }
            });
            let tbl3=document.getElementById('tbl3')
            if(arr.length>0)
            {
                let tr=document.createElement('tr');
                let td=document.createElement('td');
                td.innerHTML=`user id:${id}`;
                tr.appendChild(td);
                tbl3.appendChild(tr);
                for(let i=0;i<arr.length;i++)
                {
                    let tr=document.createElement('tr');
                    let td=document.createElement('td');
                    td.innerHTML=`comments :${arr[i].body}`;
                    tr.appendChild(td);
                    tbl3.appendChild(tr);
                }                                    
            }
            else
            {
                tbl3.innerHTML=`<p style="background-color: red; color: white;">Comments Are Not Avilable</p>`;                                
            }
        })

    }
    else
    {
        document.getElementById(tblhideid).style.display='none';
    }
}
