const fetchdata=async(url)=>{
    let res= await (await fetch(url)).json();
    return res;
}

const printoptions=(data,id)=>
{
    let id=document.getElementById(id);
    id.innerHTML="";
    for(let i=0;i<data.length;i++)
    {
        id.innerHTML+=`<option value=${data[i][0]}>${data[i][1]}</option>`;
    }
}