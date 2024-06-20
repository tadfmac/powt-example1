# powt-example1

[English](../README.md)

[powt](https://github.com/tadfmac/powt) WebTransport サーバー及びクライアントJavascriptライブラリのシンプルなアプリケーション例です。

# 利用方法

## 0. リポジトリのクローン

SSH経由の場合:
```
git clone git@github.com:tadfmac/powt-example1.git
```

HTTPS経由の場合:
```
git clone https://github.com/tadfmac/powt-example1.git
```

または、直接このサイトから直接zipファイルをダウンロード後、zip解凍の上、フォルダ名を`powt-example1-main`から`powt-example1`に変更することもできます。

## 1. mkcertのインストール

証明書を生成するために、[mkcert](https://github.com/FiloSottile/mkcert)をインストールします。

以下を参照ください :
[https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation)

## 2. localhost証明書の生成

```
cd powt-example/cert
mkcert localhost
ls
```

`localhost.pem` and `localhost-key.pem` がカレントディレクトリ (`powt-example/cert`)に生成されていたら、証明書の生成は成功です。

## 3. npm依存モジュールのインストール

```
cd ..
npm i
```

## 4. アプリケーションの起動

```
node ./app.mjs
```

## ブラウザflag `WebTransport Developer Mode`の有効化

ブラウザ (ChromeかChromeベースのブラウザーに限ります) のアドレスバーに、以下のURLを入力してください。

Chromeの場合:
```
chrome://flags
```

Operaの場合:
```
opera://flags
```

次に、flagsページの検索ボックスに下記テキストを入力します。

```
webtransport
```

フラグ名「WebTransport Developer Mode」が見つかったら、それを「enabled」に変更する必要があります。
変更後、ブラウザを再起動します。

## 6. クライアントアプリケーションへのアクセス

ブラウザのアドレスバーに下記URLを入力してください。

```
https://localhost:4445
```

# ライセンス

MIT



