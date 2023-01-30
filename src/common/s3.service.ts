import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
    async uploadToS3(file: Buffer, filename: string) {
        const bucketS3 = process.env.AWS_S3_BUCKET_NAME;
        const s3 = this.getS3Bucket();
        const params = {
            Bucket: bucketS3,
            Key: `${uuid()}-${filename}`,
            Body: file,
        };
        const uploadFile = await s3.upload(params).promise();
        return {
            key: uploadFile?.Key,
            url: uploadFile?.Location,
        };
    }

    async deleteS3Resource(key:string,){
        
    }

    getS3Bucket() {
        return new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_ACCESS_SECRET,
        });
    }
}
