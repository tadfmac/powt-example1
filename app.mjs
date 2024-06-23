//
// app.mjs by D.F.Mac.@TripArts Music
//

import https from "https";
import express from 'express';
import cors from 'cors';
import config from "./config.mjs";
import powtServer from "powt";
import protocol from "./common/protocol.mjs";
import LOG from "./node_modules/powt/lib/log.mjs";

const Log = new LOG(null);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(config.path,express.static("./client"));
app.use("/common",express.static("./common"));
app.use("/lib",express.static("./node_modules/powt/lib"));

const webServer = https.createServer({cert: config.cert, key: config.key},app);
webServer.listen(config.PORT);

powtServer.on("datagram",onReceived);
powtServer.on("stream",onReceived);
powtServer.on("open",onNewSession);
powtServer.on("close",onCloseSession);
powtServer.start(config);

async function onReceived(uint8Arr,id){
  let data = protocol.parse(uint8Arr);
  Log.out("onReceived() type="+data.type+" from="+id);
  switch(data.type){
    case "cheen":
    case "jreen":
      if(data.toId == "00000000"){
        await powtServer.broadcastDgram(uint8Arr,id);
      }else{
        await powtServer.sendDgram(data.toId,uint8Arr);
      }
      break;
    case "text":
      if(data.toId == "00000000"){
        await powtServer.broadcast(uint8Arr,id);
      }else{
        await powtServer.send(data.toId,uint8Arr);
      }
      break;
    default:break;
  }
}

function onNewSession(id){
  Log.out("onNewSession() id="+id);
  let uint8Arr = protocol.encode("myId",id);
  powtServer.send(id,uint8Arr);
  setTimeout(()=>{
    let ids = powtServer.getSessionIds();
    let arr = protocol.encode("idList",ids);
    powtServer.broadcast(arr);
  },100);
}

function onCloseSession(id){
  Log.out("onCloseSession() id="+id);
  let ids = powtServer.getSessionIds();
  let uint8Arr = protocol.encode("idList",ids);
  powtServer.broadcast(uint8Arr);
}