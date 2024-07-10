import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req: any) {
    const data = await req.formData();
    
    if (data.get('file')) {
        const file = data.get('file');
        const s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY || '',
                secretAccessKey: process.env.AWS_SECRET_KEY || '',
            },
            endpoint: 'https://s3.eu-north-1.amazonaws.com'
        });
        
        const ext = file.name.split('.').pop();
        const newFileName = uniqid() + '.' + ext;

        // Reading the file into a buffer
        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        try {
            const uploadResult = await s3Client.send(new PutObjectCommand({
                Bucket: 'nilesh-campuscrave',
                Key: newFileName,
                ACL: 'public-read',
                ContentType: file.type,
                Body: buffer,
            }));
            console.log('Upload Result:', uploadResult);

            const fileUrl = `https://nilesh-campuscrave.s3.eu-north-1.amazonaws.com/${newFileName}`;
            return new Response(JSON.stringify({ url: fileUrl }), { status: 200 });
        } catch (error) {
            console.error('Error uploading to S3:', error);
            return new Response(JSON.stringify({ error: 'Failed to upload file to S3' }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
}
