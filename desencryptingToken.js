import jwt from 'jsonwebtoken';

const secretKey = 'mysecretkey';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJ1c2VybmFtZSI6InN5cHh4eGgiLCJpYXQiOjE3MTYyMTQ2OTB9.abEA1MyCBNc12Lp8wDm4rEby7mSpK3wkj_d4ql0Y1cI';
let payloadOriginal = null;

try {
    payloadOriginal = await jwt.verify(token, secretKey);
} catch (error) {
    console.error(error);
}

console.log(payloadOriginal);