// 将 PEM 转换为 ArrayBuffer
async function importPublicKey(pem: string) {
    if (!pem) {
        throw new Error('公钥不能为空');
    }
    // const pemHeader = '-----BEGIN PUBLIC KEY-----';
    // const pemFooter = '-----END PUBLIC KEY-----';
    // const pemContents = pem
    // .replace(/\n/g, '')
    // .replace(/\r/g, '')
    // .replace(pemHeader, '')
    // .replace(pemFooter, '')
    // .trim();
    const pemContents =
        'MIIBCgKCAQEAxRBaOfpTp+065VvPyuvRUGvdVGdPmeTWcJzXy5EMTlDVtedcnnEqLrc0Ni9mMYA8KVk5+6nCCitlEDcB62wE+cd5C7Gjhm2sbzK6LqdBO5lyKgma18Udnm7wg9KGnn1SHUxbpP8iKzCwHMARwol5UWwd69zbi4+AUXbiQUMLOp/VLzyyj9tFnf6DDDPdnWbpgVh69+U6Q5N7zipCYb3ejqipRTL74RUuQfzE3AnAlPl+kIIpqnwU5fCiMNuBDpdte91VRumlP0wYvgvnfLb8pvxdfSYyhfX+R2Rnj5XNtr/0lpwfJM74JY6pG1DYanpQWpwdGvbHhtC1IlSPvdWDCwIDAQAB';
    console.info('🚀 ~ importPublicKey ~ pemContents:', pemContents);
    const binaryDer = window.atob(pemContents);
    const binaryDerBytes = new Uint8Array(binaryDer.length);
    for (let i = 0; i < binaryDer.length; i++) {
        binaryDerBytes[i] = binaryDer.charCodeAt(i);
    }
    return await window.crypto.subtle.importKey(
        'spki',
        binaryDerBytes.buffer,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        },
        true,
        ['encrypt']
    );
}

// 加密密码
export async function encryptPassword(password: string, publicKeyPem: string) {
    const publicKey = await importPublicKey(publicKeyPem);
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: 'RSA-OAEP',
        },
        publicKey,
        data
    );
    // 转为 Base64 便于传输
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}
