import crypto from 'node:crypto';

import { Injectable, PipeTransform } from '@nestjs/common';

export type AuthBodyType = {
    password: string;
};

@Injectable()
export class PasswordTransformPipe implements PipeTransform {
    transform(encryptedBase64: string) {
        const encryptedBuffer = Buffer.from(encryptedBase64, 'base64');
        const decrypted = crypto.privateDecrypt(
            {
                key: process.env.RSA_PRIVATE_KEY!,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            encryptedBuffer
        );
        return decrypted.toString('utf8');
    }
}
