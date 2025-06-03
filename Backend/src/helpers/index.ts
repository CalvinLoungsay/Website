import crypto from 'crypto';

const SECRET = 'Test';

/* Creates a random string for salt purposes */
export const random = () => crypto.randomBytes(128).toString('base64');

/* Creates hash message authentication code using a salt and the password, along with a secret value */
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}