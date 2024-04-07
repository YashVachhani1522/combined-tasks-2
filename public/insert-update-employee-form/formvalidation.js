const req = (arr) => {
    var arr2 = []
    for (let i = 0; i < arr.length; i++) {
        if (document.getElementById(arr[i]).value.trim() == "") {
            arr2.push(arr[i])
        }
    }
    return arr2;
}
const checkednum = (arr) => {
    var arr2 = []
    for (let i = 0; i < arr.length; i++) {
        if (!isNaN(Number(document.getElementById(arr[i]).value))) {
            arr2.push(arr[i])
        }
    }
    return arr2;
}

const rg = (id, type) => {
    let CONTACT = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let DATE = /\d{4}-\d{2}-\d{2}/
    let YEAR = /(?:(?:19|20)[0-9]{2})/;
    let PER = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;
    let EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    switch (type) {
        case 'email':
            if (!document.getElementById(id).value.match(EMAIL)) {
                return id;
            }
            break;
        case 'mobile':
            if (!document.getElementById(id).value.match(CONTACT)) {
                return id;
            }
            break;
        case 'date':
            if (!document.getElementById(id).value.match(DATE)) {
                return id;
            }
            break;
        case 'year':
            if (!document.getElementById(id).value.match(YEAR)) {
                return id;
            }
            break;
        case 'per':
            if (!document.getElementById(id).value.match(PER)) {
                return id;
            }
            break;
    }
    return true;
}
const arrayreqvalid = (arr) => {
    let arr2 = []
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        let count = 0;
        let inputs = document.getElementsByName(obj.name);
        for (let j = 0; j < inputs.length; j++) {
            if (obj.type == 'text') {
                if (inputs[j].value != "") {
                    count++;
                }
            }
            else {
                if (inputs[j].checked == true) {
                    count++;
                }

            }
        }
        // console.log(count); 
        // console.log(obj.size);

        if (obj.required == true && count >= obj.size) {
            continue;
        }
        else if (obj.required == false && (count == 0 || count >= obj.size)) {
            continue;
        }
        else {
            arr2.push(obj);
        }

    }
    return arr2;
}

const printerror = (ele, msg) => {
    // console.log(ans)
    // ans.forEach(ele => {
    let parent = document.getElementById(ele).parentNode
    let span = `<span class='text-danger'>${msg}</span>`
    parent.innerHTML += span
    // });    
}
const printerror2 = (ele, msg) => {
    // console.log(ans)
    // ans.forEach(ele => {
    let parent = document.getElementsByName(ele)[0].parentNode
    let span = `<span class='text-danger'>${msg}</span>`
    parent.innerHTML += span
    // });    
}

const removemsg = () => {
    let errors = document.querySelectorAll("span.text-danger")
    errors.forEach(err => {
        err.remove();
    })
}
const fun = () => {
    removemsg()
    let errorArray = [];
    let errorArray2 = [];
    let ids = ['firstname', 'lastname', 'designation', 'address1', 'email', 'address2', 'p_number', 'city', 'zipcode', 'dob', 'sscboard', 'sscpassingyear', 'sscper', 'hscboard', 'hscpassingyear', 'hscper', 'ugcname', 'uguni', 'ugpassingyear', 'ugper'];
    let ans = req(ids);
    ans.forEach(item => {
        if (errorArray.indexOf(item) < 0)
            errorArray.push(item);
    })

    let arr2 = ['firstname', 'lastname', 'designation', 'address1', 'address2', 'city', 'sscboard', 'hscboard', 'ugcname', 'uguni'];
    ans = checkednum(arr2)
    ans.forEach(item => {
        if (errorArray.indexOf(item) < 0)
            errorArray.push(item);
    })

    if (rg('email', 'email') == "email") {
        if (errorArray.indexOf("email") < 0)
            errorArray.push("email");
    }
    if (rg('p_number', 'mobile') == "p_number") {
        if (errorArray.indexOf("p_number") < 0)
            errorArray.push("p_number");
    }
    if (rg('dob', 'date') == "dob") {
        if (errorArray.indexOf("dob") < 0)
            errorArray.push("dob");
    }

    if (rg('sscpassingyear', 'year') == "sscpassingyear") {
        if (errorArray.indexOf("sscpassingyear") < 0)
            errorArray.push("sscpassingyear");
    }

    if (rg('hscpassingyear', 'year') == "hscpassingyear") {
        if (errorArray.indexOf("hscpassingyear") < 0)
            errorArray.push("hscpassingyear");
    }
    if (rg('sscper', 'per') == "sscper") {
        if (errorArray.indexOf("sscper") < 0)
            errorArray.push("sscper");
    }
    if (rg('hscper', 'per') == "hscper") {
        if (errorArray.indexOf("hscper") < 0)
            errorArray.push("hscper");
    }

    if (rg('ugpassingyear', 'year') == "ugpassingyear") {
        if (errorArray.indexOf("ugpassingyear") < 0)
            errorArray.push("ugpassingyear");
    }

    if (rg('ugper', 'per') == "ugper") {
        if (errorArray.indexOf("ugper") < 0)
            errorArray.push("ugper");
    }

    if (document.getElementById('male').checked == false && document.getElementById('female').checked == false) {
        if (errorArray.indexOf("gender") < 0)
            errorArray.push("gender");
    }

    let obj = [
        {
            name: 'pg',
            label: 'PG',
            required: false,
            type: 'text',
            size: '4'
        },
        {
            name: 'work1',
            label: 'work-1',
            required: false,
            type: 'select',
            size: '4'
        },
        {
            name: 'work2',
            label: 'work-2',
            required: false,
            type: 'select',
            size: '4'
        },
        {
            name: 'work3',
            label: 'work-3',
            required: false,
            type: 'select',
            size: '4'
        },
        {
            name: 'hindi',
            label: 'HINDI',
            required: false,
            type: 'select',
            size: '2'
        },
        {
            name: 'english',
            label: 'ENGLISH',
            required: false,
            type: 'select',
            size: '2'
        },
        {
            name: 'gujrati',
            label: 'GUJRATI',
            required: false,
            type: 'select',
            size: '2'
        },
        {
            name: 'php',
            label: 'PHP',
            required: false,
            type: 'select',
            size: '2'
        },
        {
            name: 'mysql',
            label: 'MYSQL',
            required: false,
            type: 'select',
            size: '2'
        },
        {
            name: 'laravel',
            label: 'LARAVEl',
            required: false,
            type: 'select',
            size: '2'
        },
        {
            name: 'oracle',
            label: 'ORACLE',
            required: false,
            type: 'select',
            size: '2'
        },
        {
            name: 'pre1',
            label: 'PREFRENCES-1',
            required: false,
            type: 'text',
            size: '3'
        },
        {
            name: 'pre2',
            label: 'PREFRENCES-2',
            required: false,
            type: 'text',
            size: '3'
        }
    ]
    let obj2 = arrayreqvalid(obj);
    obj2 = obj2.map(item => item.name)
    obj2.forEach(ele => {
        if (errorArray2.indexOf(ele) < 0)
            errorArray2.push(ele)
    })
    if (errorArray.length > 0 || errorArray2.length > 0) {
        errorArray.forEach(item => {
            printerror(item, `${item} is invalid..`);
        })
        errorArray2.forEach(ele => {
            console.log(ele)
            printerror2(ele, `${ele} is invalid..`);
        })
        return false;
    }
    return true;
}