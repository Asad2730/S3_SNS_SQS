const { createBucket, uploadObject, readObject, deleteObject, deleteBucket } = require("./s3/crud")
const { createTopic, publishMsg, deleteTopic } = require("./sns/crud")
const { createQueue, sendMsg, receieveMsg, deleteMsg, deleteQueue } = require("./sqs/crud")




const runS3 = async()=>{
  try{
    await createBucket()
    await uploadObject()
    await readObject()
    await deleteObject()
    await deleteBucket()
  }catch(ex){
    console.log(ex)
  }
}


const runSns = async()=>{
    try{ 
     const topicArn = await createTopic()
     await publishMsg(topicArn,'Hello')
     await deleteTopic(topicArn)
    }catch(ex){
        console.log(ex)
    }
}


const runSqs = async()=>{
    try{
      let queueUrl = await createQueue()
      await sendMsg(queueUrl,'hello')
      let receiptHandle = await receieveMsg(queueUrl)
       if(receiptHandle){
        await deleteMsg(receiptHandle)
       }

       await deleteQueue(queueUrl)
    }catch(ex){
        console.log(ex)
    }
}

runS3()
runSns()
runSqs()