const express = require("express");
const sqlite = require("sqlite3");
const app=express();
app.use(express.json())
const body=require("body-parser");
app.use(body.json())

let db=new sqlite.Database("studentdb",(err)=>{
    if (err){
        console.log(err,"err in database");
    }else{
        db.run("create table if not exists singaji (id int primary key autoincrement,name text,roll_number text);")
    }
})


app.get("/:tablename/get",(req,res)=>{
    let tn=req.params.tablename;
    let db=new sqlite.Database("studentdb",(err)=>{
        if (!err){
            db.all("Select * from '"+tn+"';",(err,data)=>{
                if (!err){
                    console.log("Data fatched")
                    res.send(data)
                }else{
                    console.log("err in query",err)
                }
            })
        }else{
            console.log(err,"err in db")
        }
    })
})

app.post("/:tablename/post",(req,res)=>{
    let tn=req.params.tablename;
    let name=req.body.name;
    let roll_number=req.body.roll_number;
     let db=new sqlite.Database("studentdb",(err)=>{
         if (!err){
             db.run("insert into '"+tn+"' (name,roll_number) values('"+name+"','"+roll_number+"');",(err,data)=>{
                 if (err) {console.log(err)}
                 else{
                     console.log("data is post")
                     res.send(data)
                 }
             })
         }else{
             console.log(err,"Err in database")
         }
     })
})


app.put("/:tablename/put/:id",(req,res)=>{
    let tn=req.params.tablename;
    let name=req.body.name;
    let roll_number=req.body.roll_number;
    let id_=req.params.id;

    let db=new sqlite.Database("studentdb",(err)=>{
        if (err) { console.log(err,"err in db")}
        else {
            db.run("update '"+tn+"' set name='"+name+"' where id = '"+id_+"'",(err,data)=>{
                if (err) {console.log(err,"err in query")}
                else{
                    console.log("data updated");
                    res.send(data)
                }
            })
        }
    })
})


app.delete("/:tablename/delete",(req,res)=>{
    let tn=req.params.tablename;
    let name = req.body.name;

    let db=new sqlite.Database("studentdb",(err)=>{
        if (err) {console.log(err,"err in db")}
        else{
            db.run("delete from '"+tn+"' where name='"+name+"';",(err)=>{
                if (err) {console.log(err,"err in query")}
                else{
                    console.log("data deleted")
                }
            })
        }
    })

})

app.put("/:tablename/retablename/:name",(req,res)=>{
    let tn=req.params.tablename;
    let name_=req.params.name;
    let db= new sqlite.Database("studentdb",(err)=>{
        if (err) {console.log(err,'err in db')}
        else{
            db.run("alter table '"+tn+"' rename to '"+name_+"';",(err)=>{
                if (err) {console.log(err," err in query")}
                else{
                    console.log("table name changed")
                }
            })
        }
    })
})





var server=app.listen(4000,()=>{
    console.log(`your port is working ${server.address().port}`);
})