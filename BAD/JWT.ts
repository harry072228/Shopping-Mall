import { payloadType } from "./models";

// library for generating symmetric key for jwt

const { createSecretKey } = require('crypto');
// library for signing jwt
const { SignJWT } = require('jose-node-cjs-runtime/jwt/sign');
// // library for verifying jwt
// const { jwtVerify } = require('jose-node-cjs-runtime/jwt/verify');


export async function jwtSign(payload: payloadType) {
    

    const jwt = await new SignJWT(payload) // details to  encode in the token
        .setProtectedHeader({ alg: 'HS256' }) // algorithm
        .setIssuedAt()
        .setIssuer(process.env.JWT_ISSUER) // issuer
        .setAudience(process.env.JWT_AUDIENCE) // audience
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME) // token expiration time, e.g., "1 day"
        .sign(secretKey); // secretKey generated from previous step

    return jwt;

}