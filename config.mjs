// for server config
import fsp from "fs/promises";
const _key = await fsp.readFile("./cert/localhost-key.pem");
const _cert = await fsp.readFile("./cert/localhost.pem");
const _HOST = "localhost";
const _PORT = 4445;
console.log(_key+_cert);

let config = {
  HOST:_HOST,
  PORT:_PORT,
  path:"/",
  key:_key,
  cert:_cert
};

export default config;
