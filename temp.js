const mysql=require('mysql');

class database{

    constructor(db)
    {
        this.user=process.env.user;
        this.host=process.env.host;
        this.password=process.env.password;
        this.database=db;
        
    }
    connection()
    {
        let con=mysql.createConnection({
            user:this.user,
            host:this.host,
            password:this.password,
            database:this.database,
            dateStrings:true
        })
        let res= new Promise((resolve,reject)=>{
            con.connect((err)=>{
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(con)
                }
            })
        })
        
        res=res.then(data=>{
            return data
        }).catch(err=>{
            return err.sqlMessage; 
        })
        return res;
    }
    
    executrquery=async(q,arr)=>{
        console.log(q)
        let con=await this.connection()
        let res=new Promise((resolve,reject)=>{
            let res=con.query(q,arr,(err,result)=>{
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })    
        res=res.then(data=>{
            return(data)
        }).catch(err=>{
            return err.sqlMessage;
        })
        return res;
    }


    fatchdata2=async(table,id)=>{
        let con=await this.connection()
        let q=`select * from ${table} where candidate_id=${id}`;
        console.log(q);
        let result=  new Promise((resolve,reject)=>{
              con.query(q,(err,result)=>{
                  if(err)
                  {
                      reject(err)
                  }
                  else
                  {
                      resolve(result);
                  }
              })
          })
          result=await result.then(result=>{
              return result;
          }).catch(err=>{
              return err.sqlMessage;
          })
          return result;
       }

    insertdata=async(data,table)=>{
        let keys=Object.keys(data);
        let q=`insert into ${table}(`;
        keys.forEach(key => {
            q+=`${key},`
        });
        q=q.slice(0,q.length-1)+')values(';
        // console.log(q)
        keys.forEach(key=>{
            q+="?,"
        })
        q=q.slice(0,q.length-1)+")"
        let arr=[]
        keys.forEach(key=>{
            arr.push(`${data[key]}`);   
        })
        // q=q.slice(0,q.length-1)+');'
        console.log(arr);
        return await this.executrquery(q,arr);
    }

    update=async(data,table,conditions)=>{
        let q=`update ${table} set `
        Object.keys(data).forEach(key=>{
            q+=`${key}=?,`
        })
        q=q.slice(0,q.length-1)
        
        q=q.slice(0,q.length)+' where ';
        Object.keys(conditions).forEach(key=>{
            q+=`${key}=?`;
            q+=" and "
        })
        let arr=[]
        q=q.slice(0,q.length-4)+`;`

        Object.keys(data).forEach(key=>{
            arr.push(`${data[key]}`)
        })
        Object.keys(conditions).forEach(key=>{
            arr.push(`${conditions[key]}`)
        })
        console.log(arr)
        console.log(q)
        
        return await this.executrquery(q,arr);
    }

    update2=async(data,table,conditions)=>{
        let q=`update ${table} set `
        Object.keys(data).forEach(key=>{
            q+=`${key}=?,`
        })
        q=q.slice(0,q.length-1)
        
        q=q.slice(0,q.length)+' where ';
        Object.keys(conditions).forEach(key=>{
            q+=`${key}=?`;
            q+=" and "
        })
        let arr=[]
        q=q.slice(0,q.length-4)+`;`

        Object.keys(data).forEach(key=>{
            arr.push(`${data[key]}`)
        })
        Object.keys(conditions).forEach(key=>{
            arr.push(`${conditions[key]}`)
        })
        console.log(arr)
        console.log(q)
        return await this.executrquery(q,arr);
    }
    
    
    delete=async(table,conditions)=>{
        let arr=[]
        let q=`delete from ${table} where `
        Object.keys(conditions).forEach(key=>{
            q+=`${key}=? `;
            q+="and "
        })
        q=q.slice(0,q.length-5)+';'
        console.log(q)
        Object.keys(conditions).forEach(key=>{
            arr.push(`${conditions[key]}`)
        })
        console.log(arr.length)
        return await this.executrquery(q);
    }
}
let db=new database("combinedtasks")
db.delete("student",{id:10,phoneno:"8866081331"});
