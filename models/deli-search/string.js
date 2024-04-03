const fun=(str)=>{
    let arr=[];
    let temp="";
    let checking=['_','^','$','}','{'];

    let obj={
        std_id:[],
        first_name:[],
        last_name:[],
        contact:[],
        gender:[],
    }

    for(let i=0;i<str.length;i++)
    {
        if(checking.indexOf(str[i])>=0)
        {            
            arr.push(temp);
            arr.push(str[i]);
            temp="";
        }
        else
        {
            temp+=str[i];
        }
    } 
    arr.push(temp);
    arr=arr.slice(1,arr.length);
    console.log(arr);
    for(let j=0;j<arr.length;j=j+2)
    {
        switch(arr[j])
        {
            case '_':
                obj.std_id.push(arr[j+1]);
            break;
            case '^':
                obj.first_name.push(arr[j+1]);
            break;
            case '$':
                obj.last_name.push(arr[j+1]);
            break;
            case '{':
                obj.contact.push(arr[j+1]);
            break;
            case '}':
                obj.gender.push(arr[j+1]);
            break;
            default:
                console.log('error');
        }
    }
    return obj;
}

module.exports=fun;


