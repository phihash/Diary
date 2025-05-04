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

    const events = req.body.events;
    Promise.all(events.map(handleMessage)).then(() => {
      res.json({ status: 'ok' });
    }).catch((error) => {
      console.error('Error handling message:', error);
    })

});

const handleMessage = async (event) => {
    if(event.type !== 'message' || event.message.type !== 'text') {
        return ;
    }
    const receivedText = event.message.text;
    const replyToken = event.replyToken;
    const replyText = `You said: ${receivedText}`;
    const message = {
        type: 'text',
        text: replyText
    };
    try{
      await client.replyMessage(replyToken, message);
      console.log('Reply message sent:', replyText);
    }catch(error){
        console.error('Error sending message:', error);
        return;
    }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
