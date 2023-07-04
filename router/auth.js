const express = require('express')
const router = express.Router()
const RoomBook = require("../roombook")
const nodemailer = require('nodemailer')

router.get('/', (req, res) =>{
    res.send('CHECK')
})

router.post('/data', async (req, res) => {
    const { room_number , email , type_room, start_time, end_time } = req.body
    let check = 0;
    console.log(req.body);
    const Room = new RoomBook({ room_number , email , type_room, start_time, end_time })
    RoomBook.find({type_room : type_room, room_number : room_number}).then((data) => {
        for(let i=0;i<data.length;i++) {
            console.log(data[i]);
            let st = new Date(start_time)
            let et = new Date(end_time)
            let datast = new Date(data[i].start_time)
            let dataet = new Date(data[i].end_time)

            if((st < dataet) && (et > datast)){
                check = 1
                break;
            }
        }
        if(check == 0)
        {
            Room.save().then(() =>{})
            res.send({ success: true })
        }
        else{
            res.send({ success: false })
        }
    })

    
        

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "trisha.walsh@ethereal.email", // generated ethereal user
          pass: "MKeuZYFe8zKC3ApSnQ", // generated ethereal password
        },
      });
      
      const msg = {
        from: 'trisha.walsh@ethereal.email', // sender address
        to: `${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
      }
      // send mail with defined transport object}
      let info = await transporter.sendMail(msg);
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //res.write({message : "1"})
})


router.get('/getData', (req, res) => {
    console.log(req.query);
    const st = req.query.start_time;
    const et = req.query.end_time;
    let details;
    delete req.query.start_time;
    delete req.query.end_time;
    RoomBook.find(req.query).then((data) =>{
        //details = data 
        // || et == ''
        if(st == ''){
            //console.log(data);
            data.sort(function (a, b) {
                if(a.start_time < b.start_time) {
                    return -1;
                }
                else {
                    return 1;
                }
            })
            res.send(data)
        }else{
            let start_time = new Date(st)
            let end_time;
            if(et != '')
            end_time = new Date(et)
            let details = [];
            for(let i=0;i<data.length;i++) {
                //console.log(data[i]);
                let datast = new Date(data[i].start_time)
                let dataet
                if(et != '')
                dataet = new Date(data[i].end_time)
                //console.log(datast, dataet);
                if((start_time <= datast)){
                    if(et != '')
                    {
                        if(end_time >= dataet)
                        details.push(data[i]);
                    }
                    else {
                        details.push(data[i]);
                    }
                }
            }
            details.sort(function (a, b) {
                if(a.start_time < b.start_time) {
                    return -1;
                }
                else {
                    return 1;
                }
            })
            res.send(details);
        }
    })
    // if(st == '' || et == ''){
    //     console.log(details);
    //     res.send(details)
    // }else{
        
    // }


    // RoomBook.find(req.query).then((data) =>{
        
    //     res.send(data)
    // })
})

router.post('/deleteItem', (req, res) => {
    //console.log(req.body);
    RoomBook.deleteOne({ _id : req.body._id }).then(() => {
        res.end()
    })
})

router.post('/editItem', (req, res) => {
    console.log(req.body);
    RoomBook.find({ _id : req.body._id }).then((data) =>{
        res.send(data)
    })
})

router.post('/editItemChange', async (req, res) => {
    const { room_number , email , type_room, start_time, end_time } = req.body
    let check = 0;
    //console.log(check);
    const Room = new RoomBook({ room_number , email , type_room, start_time, end_time })
    RoomBook.find({type_room : type_room, room_number : room_number}).then((data) => {
        for(let i=0;i<data.length;i++) {
            // if(data[i]._id == req.body._id)
            // continue;
            console.log(data[i]);
            let st = new Date(start_time)
            let et = new Date(end_time)
            let datast = new Date(data[i].start_time)
            let dataet = new Date(data[i].end_time)

            if((st < dataet) && (et > datast)){
                check = 1
                break;
            }
        }
        if(check == 0)
        {
            RoomBook.updateOne({ _id : req.body._id } , {$set : 
                req.body
            }).then((d) => {
                res.send({ success: true })
            })
            
        }
        else{
            res.send({ success: false })
        }
    })
    console.log(req.body._id);
    // RoomBook.updateOne({ _id : req.body._id } , {$set : 
    //     req.body
    // }).then((d) => {
    //     res.send()
    // })
})



module.exports = router