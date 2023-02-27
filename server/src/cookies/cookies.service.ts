import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import getRefreshTime from '../utils/getRefreshTimes';

@Injectable()
export class CookiesService {
  setRefreshToken(res: Response, token: string) {
    res.cookie('refreshToken', token, {
      expires: getRefreshTime(),
    });
  }

  getRefreshToken(req: Request) {
    return req.cookies['refreshToken'];
  }
}
