'use strict';
require('dotenv').config();

const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new line.Client(config);//メッセージを返信するために必要となる client オブジェクト

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log('Webhook received:', JSON.stringify(req.body.events)); // まずは受信内容をログに出力

    // ここで受信したイベント（メッセージなど）を処理するコードを後で追加

    res.json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
