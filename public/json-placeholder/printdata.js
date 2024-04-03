


const fun=async()=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/posts')
    return await response.json();
}

// let page=0;  
const start=(obj,btn)=>{

    let total_page=Math.floor(obj.data.length/obj.record_per_page);
    console.log(total_page,obj.page);

    if(total_page==0)
    {
        document.getElementById(obj.btn_id[0]).disabled=false;
        document.getElementById(obj.btn_id[1]).disabled=false;
        document.getElementById(obj.btn_id[2]).disabled=false;
        document.getElementById(obj.btn_id[3]).disabled=false;
    }
    else if(btn=='next')
    {   
        if(obj.page+1==total_page)
        {
            document.getElementById(obj.btn_id[2]).disabled=true;
            document.getElementById(obj.btn_id[3]).disabled=true;
        }
        else
        {
            obj.page++;
            let start_poi=obj.page*obj.record_per_page;
            console.log('start',start_poi);
            let end=start_poi+obj.record_per_page;  
            console.log('end',end);

            printdata(start_poi,end,obj);
            document.getElementById(obj.btn_id[0]).disabled=false;
            document.getElementById(obj.btn_id[1]).disabled=false;
            
        }
    }
    else if(btn=='last')
    {
            obj.page=total_page-1;
            let start_poi=obj.page*obj.record_per_page;
            let end=start_poi+obj.record_per_page;
            
            printdata(start_poi,end,obj);

            document.getElementById(obj.btn_id[2]).disabled=true;
            document.getElementById(obj.btn_id[3]).disabled=true;
            document.getElementById(obj.btn_id[0]).disabled=false;
            document.getElementById(obj.btn_id[1]).disabled=false;

    }
    else if(btn=='prev')
    {
            if(obj.page==1)
            {
                document.getElementById(obj.btn_id[0]).disabled=true;
                document.getElementById(obj.btn_id[1]).disabled=true;
            }

            obj.page--;
            let start_poi=obj.page*obj.record_per_page;
            let end=start_poi+obj.record_per_page;
            printdata(start_poi,end,obj);
            document.getElementById(obj.btn_id[2]).disabled=false;
            document.getElementById(obj.btn_id[3]).disabled=false;
            
    }
    else if(btn=='first')
    {
            obj.page=0;
            let start_poi=obj.page*obj.record_per_page;
            let end=start_poi+obj.record_per_page;
            
            printdata(start_poi,end,obj);

            document.getElementById(obj.btn_id[2]).disabled=false;
            document.getElementById(obj.btn_id[3]).disabled=false;
            document.getElementById(obj.btn_id[0]).disabled=true;
            document.getElementById(obj.btn_id[1]).disabled=true;  
    }
    else
    {
        printdata(0,obj.record_per_page,obj);
        document.getElementById(obj.btn_id[0]).disabled=true;
        document.getElementById(obj.btn_id[1]).disabled=true;
    }
    document.getElementById(obj.print_id).innerHTML=obj.page;    
}




const printdata=((strat,end,obj)=>{
    // console.log(obj.page,obj.data.length/obj.record_per_page);

    let tbl=obj.table_id;
    let tbl_id=document.getElementById(tbl);
    let data=obj.data;

    let fields=['id','userId','title','body','view details'];

    // let fields=Object.keys(data[0]);
    tbl_id.innerHTML="";
   
   
    let tr=document.createElement('tr');
    for(let i=0;i<fields.length;i++)
    {
        let td=document.createElement('td');
        td.innerHTML=fields[i];
        tr.appendChild(td)
    }
    tbl_id.appendChild(tr);


    for(let i=strat;i<end;i++)
    {
        let tr=document.createElement('tr');
        for(let j=0;j<fields.length;j++)
        {
            if(fields[j]=='view details')
            {
               let td=document.createElement('td')
               let btn=document.createElement('button');
               btn.setAttribute('id',`${data[i].id}`)
               btn.setAttribute('class','color')
               btn.setAttribute('onclick','details(id)')
               let btn1=document.createTextNode('view details')
               btn.appendChild(btn1);
               td.appendChild(btn);
               tr.appendChild(td);

            }
            else
            {
                let td=document.createElement('td');
                td.innerHTML=data[i][fields[j]];
                tr.appendChild(td)
            }    
        }
        
       
        tbl_id.appendChild(tr);
    }
})
const details=(id)=>{
    window.location.href=`post-details/${id}`;  
}
