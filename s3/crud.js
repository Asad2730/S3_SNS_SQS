const { S3Client, CreateBucketCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, DeleteBucketCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const path = require('path');


const s3Client = new S3Client({ region: 'us-easr-1' })

const bucketName = 'your-bucket-name';
const objectKey = 'example.txt';
const filePath = path.join(__dirname, 'example.txt');

const createBucket = async () => {
    try {
        let bucket = await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }))
        console.log(`Bucket Created ${bucket}`)
    } catch (ex) {
        console.error(`Error:${ex}`)
    }
}


const uploadObject = async () => {
    try {
        let fileStream = fs.createReadStream(filePath)
        let obj = await s3Client.send(new PutObjectCommand({ Bucket: bucketName, Key: objectKey, Body: fileStream }))
        console.log('object uploaded to s3 bucket ', obj)
    } catch (ex) {
        console.error(`Error:${ex}`)
    }
}

const readObject = async () => {
    try {
        let data = await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: objectKey }))
        console.log('data ', data)
    } catch (ex) {
        console.error(`Error:${ex}`)
    }
}


const deleteObject = async () => {
    try {
        let data = await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: objectKey }))
        console.log('object deleted ', data)
    } catch (ex) {
        console.error(`Error:${ex}`)
    }
}


const deleteBucket = async () => {
    try {
        let data = await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }))
        console.log('bucket deleted', data)
    } catch (ex) {
        console.error(`Error:${ex}`)
    }
}


module.exports = { createBucket, readObject, deleteObject, uploadObject, deleteBucket }