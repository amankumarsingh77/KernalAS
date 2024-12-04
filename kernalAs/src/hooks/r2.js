import S3 from 'aws-sdk/clients/s3.js';


export const useUpload = async (file) => {
    const accountid = "c53b46b5dd5b90e69d3b386ace1821fd"
    const access_key_id = "7e57d246bc8eb3c497b2786f9157e682"
    const access_key_secret = "3a06a2feaf43dd10364db4847c2c7846e07c6bd33141f17b8d8f9946ac3ecfc8"
    const s3 = new S3({
        endpoint: `https://${accountid}.r2.cloudflarestorage.com`,
        accessKeyId: `${access_key_id}`,
        secretAccessKey: `${access_key_secret}`,
        signatureVersion: 'v4',
    });



    const params = {
        Bucket: "studious",
        Key: file.name,
        Body: file
    }
    try {
        const data = await s3.upload(params).promise();

        return "https://pub-5ce384a9d75c44faaeb038f397f42478.r2.dev/" + data.Key;
    } catch (err) {
        console.error('Error uploading file to S3:', err);
        throw err; // You may choose to handle the error differently or rethrow it
    }
}

