const { SQSClient, CreateQueueCommand, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand, DeleteQueueCommand } = require("@aws-sdk/client-sqs");

const sqs = new SQSClient({ region: 'us-east-1' });

const queueName = 'example-queue';



const createQueue = async () => {
    try {
     let data = await sqs.send(new CreateQueueCommand({QueueName}))
     return data.QueueUrl;
    } catch (ex) {
        console.error(ex)
    }
}


const sendMsg = async (queueUrl,msg) => {
    try {
       await sqs.send(new SendMessageCommand({QueueUrl:queueUrl,MessageBody:msg}))
       console.log('Msg sent')
    } catch (ex) {
        console.error(ex)
    }
}


const receieveMsg = async (queueUrl) => {
    try {
    let msg = await sqs.send(new ReceiveMessageCommand({QueueUrl:queueUrl}))
    if(msg.Messages){
        console.log(msg.Messages[0].Body)
        return msg.Messages[0].ReceiptHandle
    }else{
      console.log('No msg received')
    }
    
    } catch (ex) {
        console.error(ex)
    }
}


const deleteMsg = async (queueUrl,receiptHandle) => {
    try {
       await sqs.send(new DeleteMessageCommand({QueueUrl:queueUrl,ReceiptHandle:receiptHandle}))
       console.log('MSg deleted!')
    } catch (ex) {
        console.error(ex)
    }
}


const deleteQueue = async (queueUrl) => {
    try {
      await sqs.send(new DeleteQueueCommand({QueueUrl:queueUrl}))
      console.log('queue deleted!')
    } catch (ex) {
        console.error(ex)
    }
}

module.exports = {createQueue,sendMsg,receieveMsg,deleteMsg,deleteQueue}