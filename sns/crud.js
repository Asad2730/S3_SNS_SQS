const { SNSClient, CreateTopicCommand, PublishCommand, DeleteTopicCommand } = require("@aws-sdk/client-sns");

const snsClient = new SNSClient({ region: 'us-east-1' });

const topicName = 'example-topic';



const createTopic = async () => {
    try { 
    let data =  await snsClient.send(new CreateTopicCommand({Name:topicName}))
     console.log('Topic created!')
     return data.TopicArn
    } catch (ex) {
        console.error(ex)
    }
}


const publishMsg = async (topicArn,msg) => {
    try {
       await snsClient.send(new PublishCommand({TopicArn:topicArn,Message:msg}))
       console.log('msg published')
    } catch (ex) {
        console.error(ex)
    }
}


const deleteTopic = async (topicArn) => {
    try {
      await snsClient.send(new DeleteTopicCommand({TopicArn:topicArn}))
      console.log('Deleted topic')
    } catch (ex) {
        console.error(ex)
    }
}

module.exports = { createTopic, publishMsg, deleteTopic }