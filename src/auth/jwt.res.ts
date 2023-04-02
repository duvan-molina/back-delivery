import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UploadFilesMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) return res.json({ message: 'No token provided' });

    await jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        return res.json({ message: 'Token invalid' });
      } else {
        next();
      }
    });
  }
}
