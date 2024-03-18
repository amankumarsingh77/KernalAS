import S3 from 'aws-sdk/clients/s3.js';


export const useUpload = async (file) => {
    const accountid = "735ef443830adc4a66ae82c3dc64f5b6"
    const access_key_id = "b8bf9b0d2f8b2b1b5d6190568b88731d"
    const access_key_secret = "6819513b999b2b644fc71a22f5cc68b6a3b73ee92c2e3b9c6f1a51a41297f0ce"
    const s3 = new S3({
        endpoint: `https://${accountid}.r2.cloudflarestorage.com`,
        accessKeyId: `${access_key_id}`,
        secretAccessKey: `${access_key_secret}`,
        signatureVersion: 'v4',
    });



    const params = {
        Bucket: "kernalcloud",
        Key: file.name,
        Body: file
    }
    try {
        const data = await s3.upload(params).promise();

        return "https://pub-e4d5d8d959884f9f90b603fb1695dc4f.r2.dev/" + data.Key;
    } catch (err) {
        console.error('Error uploading file to S3:', err);
        throw err; // You may choose to handle the error differently or rethrow it
    }
}

