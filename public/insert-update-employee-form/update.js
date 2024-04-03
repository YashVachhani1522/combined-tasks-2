const valueprint=(obj)=>
{   
    // console.log(obj)
    let key=Object.keys(obj)
    let nodes=key.map(ele=>
        document.getElementsByName(ele)[0]
    )
    // console.log(nodes)
    nodes.forEach((node,count)=>{
        // console.log(node,node.type)
        switch(node.type)   
        {

            case 'text':
            case 'number':
            case 'hidden':
            case 'textarea':
                node.value=obj[key[count]];
                break;
            case 'select-one':
            case 'select-multiple':
                // console.log([...obj[key[count]]])
                // console.log([obj[key[count]]])
                // console.log("-----------",typeof obj[key[count]])
                
                let selected = typeof obj[key[count]] == 'object'?[...obj[key[count]]]:[obj[key[count]]];
                let option=Object.values(node.options);
             
                option.forEach(op=>{
                
                    if(selected.indexOf(op.value)>=0)
                    {
                        op.selected=true;
                    }
                })
                break; 
        }
    })
}
const radio=(obj)=>{
        let key=Object.keys(obj)
        // console.log(key)
        let nodes=key.map(ele=>document.getElementsByName(ele)
            )
            // console.log(nodes)
            nodes[0].forEach((node)=>{
            // console.log(node);

            if(node.value == obj.gender)
            {
                // console.log(node);
                node.checked=true;
            }
        })
}
const update=(data)=>{
    console.log(data.refcon);
    let baisic_details=data.baisic_details[0];
    let obj={
        canid:baisic_details.can_id,
        firstname:baisic_details.fname,
        lastname:baisic_details.lname,
        designation:baisic_details.designation,
        address1:baisic_details.address,
        address2:baisic_details.address2,
        email:baisic_details.email,
        pnumber:baisic_details.phone_number,
        city:'bhavnagar',
        zipcode:baisic_details.zip_code,
        dob:baisic_details.dob,
        state:baisic_details.state,
        relationop:baisic_details.relationship_status,
    }
    valueprint(obj);
    let obj2={
        gender:baisic_details.gender,
    }
    radio(obj2);
    // let education=data.education[0];
    if(data.education!=null)
    {   
        arr=['ssc','hsc'];
        let nodes=arr.map(ele =>document.getElementsByName(ele))
        for(let i=0;i<nodes.length;i++)
        {
            if(data.education[i])
            {
                nodes[i][0].value=data.education[i].uni_or_board
                nodes[i][1].value=data.education[i].passing_year
                nodes[i][2].value=data.education[i].percentage
            }
                   
        }
        
            let arr2=['ug','pg']
            let nodes2=arr2.map(ele =>document.getElementsByName(ele))
    
            if(data.education[2])
            {
                    nodes2[0][0].value=data.education[2].course
                    nodes2[0][1].value=data.education[2].uni_or_board
                    nodes2[0][2].value=data.education[2].passing_year
                    nodes2[0][3].value=data.education[2].percentage   
    
            }
            if(data.education[3])
            {
                nodes2[1][0].value=data.education[3].course
                nodes2[1][1].value=data.education[3].uni_or_board
                nodes2[1][2].value=data.education[3].passing_year
                nodes2[1][3].value=data.education[3].percentage   
            }            
    

    }
   
       if(data.work!=null)
       {    
        let arr3=['work1','work2','work3'];
        let nodes3=arr3.map(ele =>document.getElementsByName(ele))
        for(let i=0;i<nodes3.length;i++)
        {
            if(data.work[i])
            {
                nodes3[i][0].value=data.work[i].company_name
                nodes3[i][1].value=data.work[i].designation
                nodes3[i][2].value=data.work[i].form_date   
                nodes3[i][3].value=data.work[i].to_date 
            }  
        }   
       }      
        
        

        if(data.ref!=null)
        {
            let arr5=['pre1','pre2'];
            let nodes5=arr5.map(ele =>document.getElementsByName(ele))
            console.log(nodes5)
            for(let i=0;i<nodes5.length;i++)
            {
                if(data.ref[i])
                {
                    nodes5[i][0].value=data.ref[i].name
                    nodes5[i][1].value=data.ref[i].phone_number
                    nodes5[i][2].value=data.ref[i].relation
                }
            }

        }
        console.log(data.refcon)
   
    
    if(data.refcon!=null)
    {
        let ob={
            preloc:data.refcon[0].prefered_location,
            np:data.refcon[0].notice_periods,
            cctc:data.refcon[0].expected_ctc,
            ectc:data.refcon[0].current_ctc,
            dept:data.refcon[0].department
        }
        valueprint(ob)
    }
    if(data.language!=null)
    {
        for(let i=0;i<data.language.length;i++)
        {
            if(data.language[i].languages)
            {
                let nodes=document.getElementsByName(data.language[i].languages);
                nodes[0].checked=true
                if(data.language[i].reading!='null')
                {
                    nodes[1].checked=true
                }
                if(data.language[i].writes!='null')
                {
                    nodes[2].checked=true
                }
                if(data.language[i].speak!='null')
                {
                    nodes[3].checked=true
                }
            }
        }
    }   
    if(data.tech!=null)
    {
        for(let i=0;i<data.tech.length;i++)
        {
            let nodes=document.getElementsByName(data.tech[i].technologies_name);
            nodes[0].checked=true
            
            if(data.tech[i].leveles=='b')
            {
                nodes[1].checked=true;
            }
            if(data.tech[i].leveles=='m')
            {
                nodes[2].checked=true;
            }
            if(data.tech[i].leveles=='ex')
            {
                nodes[3].checked=true;
            }
        }
    }
}