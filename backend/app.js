const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        console.log(req.body);
        if(file.originalname.includes(" ")){
            console.log("file cannot contain spaces");
            return cb("error");
        } 
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });
app.listen(8000,(req,res)=>{
    console.log("Server is running on port", 8000);   
})

app.post("/upload", upload.single('file'), (req,res)=>{
    console.log(req.headers["content-type"])
    console.log(req.file)
    console.log(req.body);
    // handleDeployment(appName, userName, file)
    deploy(req.file, req.body.username, req.body["app-name"])
    res.json({
        success: true,
        msg: "File was uploaded"
    });
})

app.get("/",(req,res)=>{
    res.send("1");
})

const extract = (file, username, appname, cb)=>{  
    console.log("aaaa")
    console.log(file.filename, username, appname)
    const unzip = exec(`unzip -o /home/fady/Faculty/Graduation_project/POC/backend/uploads/${file.filename} -d /home/fady/projects/${username}/`);
    unzip.stderr.on("data", data=>console.log(data));
    unzip.on("close", code=>{
        console.log("1st:",code);
        if(code === 0){
            const filename = file.filename.replace(".zip","");
            const extract = exec(`mv /home/fady/projects/${username}/${filename} /home/fady/projects/${username}/${appname}`);
            extract.stderr.on("data", data=>console.log(data));
            extract.on("close", code=>{
                console.log("2nd:",code)
                if(code === 0){
                    console.log("done");
                    cb(code);
                }else cb(code);
            })
        }else cb(code);
    })
}


const deploy = (file, username, appname) =>{
    extract(file, username, appname, (code)=>{
        if(code !== 0) return 
        const appendHost = exec(`sudo echo "127.0.0.1       ${appname}.${username}".CloudAstro.com >> /etc/hosts`)  /*shifo code*/
        //const appendHost = exec(`sudo bash -c "echo '127.0.0.1 ${appname}.${username}.cloudastro.com' >> /etc/hosts"`);
        appendHost.stderr.on("data", data=> console.log(data));
        appendHost.on("close", code=>{
            console.log(code);
            if(code === 0){
                console.log("done")
            }
        })
    });
}
