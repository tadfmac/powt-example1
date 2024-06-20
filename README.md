# powt-example1

![日本語](./ja/README.md)

An simple example application of [powt](https://github.com/tadfmac/powt) that WebTransport server and client javascript wrapper library.

# How to use

## 0. Clone this repo

on using SSH:
```
git clone git@github.com:tadfmac/powt-example1.git
```

on using HTTPS:
```
git clone https://github.com/tadfmac/powt-example1.git
```

Or you can download zip file directly from this repo, and unzip it and rename folder `powt-example1-main` to `powt-example1`.

## 1. Install mkcert

Install [mkcert](https://github.com/FiloSottile/mkcert) to generate the local certificate.

Please see bellow :
[https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation)

## 2. Ganarate localhost certificate

```
cd powt-example/cert
mkcert localhost
ls
```

If `localhost.pem` and `localhost-key.pem` are found in current directory (`powt-example/cert`), the certificate is generated successfully.

## 3. Install npm dependencies

```
cd ..
npm i
```

## 4. Start application

```
node ./app.mjs
```

## 5. Enable browser flag `WebTransport Developer Mode`

Type the bellow URL in address bar on your browser (only chrome or chrome base browser).

On Chrome:
```
chrome://flags
```

On Opera:
```
opera://flags
```

Then, type the bellow in serch box on flags page.

```
webtransport
```

Find the flag Name `WebTransport Developer Mode`, it should be change to `enabled`.
After change it, the browser should be restart.

## 6. Access to client application

Type the bellow URL in address bar on your browser.

```
https://localhost:4445
```

# licenses

MIT



