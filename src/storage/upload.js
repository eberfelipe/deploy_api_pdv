const aws = require('aws-sdk');
const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);
const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.BUCKET_KEY_ID,
        secretAccessKey: process.env.BUCKET_APP_KEY
    }
});

async function upload (path, buffer, mimeType) {
    const arquivo = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path, 
        Body: buffer,
        ContentType: mimeType,
    }).promise();

    return {url:arquivo.Location, path:arquivo.Key}
}

module.exports = upload;
