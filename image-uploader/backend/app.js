// backend/app.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = process.env.img-upload-v1; // numele bucketului din SAM

exports.handler = async (event) => {
    try {
        // Obține numele fișierului din query string
        const fileName = event.queryStringParameters?.filename;
        if (!fileName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing filename parameter" }),
            };
        }

        // Creează presigned URL pentru PUT în S3
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Expires: 60, // URL valid 60 secunde
        };

        const uploadURL = s3.getSignedUrl('putObject', params);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uploadURL }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
