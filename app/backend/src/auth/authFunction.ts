import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

const JWT_CONFIG: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = (data: any): string => jwt.sign({ data }, secret, JWT_CONFIG);

const verifyToken = (token: string): any => jwt.verify(token, secret);

export { generateToken, verifyToken };
