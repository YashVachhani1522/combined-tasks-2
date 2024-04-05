const fetchdata=async(url)=>{
    let res= await (await fetch(url)).json();
    return res;
}

const printoptions=(data,id)=>
{
    let id2=document.getElementById(id);
    id2.innerHTML="";
    for(let i=0;i<data.length;i++)
    {
        id2.innerHTML+=`<option value=${data[i][0]}>${data[i][1]}</option>`;
    }
}