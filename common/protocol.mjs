//
// protocol.mjs by D.F.Mac.@TripArts Music
//

const type2code = {
  "text" :2,   // |code(1)|fromId(8)|toId(8)|text(variable length)|
  "cheen":5,   // |code(1)|fromId(8)|toId(8)|
  "jreen":6,   // |code(1)|fromId(8)|toId(8)|
  "myId":10,   // |code(1)|id(8)|
  "idList":11  // |code(1)|numIds(2)|id1(8)|....|idn(8)|
};

const type2size = {
  "text":null,
  "cheen":17,
  "jreen":17,
  "myId":9,
  "idList":null
};

class protocol {
  constructor(){
    this.type2code = type2code;
    this.code2type = Object.fromEntries(Object.entries(type2code).map(a => a.reverse()));
    this.type2size = type2size;
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }
  parse(uint8Arr){
    console.log("protocol.parse() ");
    let type = this.code2type[uint8Arr[0]];
    let ret = null;
    if(type == undefined){
      console.log("type undefind!");
      return null;
    }
    ret = {};
    ret.type = type;
    if(type == "myId"){
      let idBuf = uint8Arr.subarray(1,9);
      ret.id = this.decoder.decode(idBuf);
    }else if(type != "idList"){
      let fromIdBuf = uint8Arr.subarray(1,9);
      ret.fromId = this.decoder.decode(fromIdBuf);
      let toIdBuf = uint8Arr.subarray(9,17);
      ret.toId = this.decoder.decode(toIdBuf);
    }else{ // type == "idList"
      let idsBuf = uint8Arr.subarray(1,3);
      let ids = (idsBuf[1]*256)+idsBuf[0];
      console.log("ids="+ids);
      let idlist = [];
      for(let cnt=0;cnt<ids;cnt++){
        let idBuf = uint8Arr.subarray(3+(cnt*8),11+(cnt*8));
        let id = this.decoder.decode(idBuf);
        idlist.push(id);
      }
      ret.ids = idlist;
    }
    if(type == "text"){
      let textBuf = uint8Arr.subarray(17);
      ret.text = this.decoder.decode(textBuf);
    }
//    console.dir(ret);
    return ret;
  }
  encode(type,fromID,toID,pText){
    console.log("protocol.encode() type="+type+" p1="+fromID+" p2="+toID+" p3="+pText);
    let code = this.type2code[type];
    if(this.type2code[type] == undefined){
      console.log("type undefind!");
      return null;
    }
    let buffer;
    if(type == "text"){
      let length = this.bytelength(pText);
      buffer = new ArrayBuffer(length+17);
    }else if(type == "idList"){
      buffer = new ArrayBuffer(fromID.length*8+3);
    }else{
      buffer = new ArrayBuffer(this.type2size[type]);
    }

    let array = new Uint8Array(buffer);
    array[0] = code;
    if(type != "idList"){
      let fromIdBuf = array.subarray(1,9);
      this.encoder.encodeInto(fromID,fromIdBuf);
      if(type != "myId"){
        let toIdBuf = array.subarray(9,17);
        this.encoder.encodeInto(toID,toIdBuf);
      }
      if(type == "text"){
        let textBuf = array.subarray(17);
        this.encoder.encodeInto(pText,textBuf);
      }
    }else{ // idList
      let numBuf = array.subarray(1,3);
      numBuf[1] = fromID.length >> 8;
      numBuf[0] = fromID.length & 0x00ff;
      for(let cnt=0;cnt<fromID.length;cnt++){
        let idBuf = array.subarray(3+(8*cnt),11+(8*cnt));
        this.encoder.encodeInto(fromID[cnt],idBuf);
      }
    }
    return array;
  }
  bytelength(s){
    return encodeURI(s).replace(/%../g, "*").length;
  }
}

export default new protocol();
