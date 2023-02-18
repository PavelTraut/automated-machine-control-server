import { Request, Response } from 'express';
import getRefreshTime from '../utils/getRefreshTimes';

export default class CookiesService {
  setRefreshToken(res: Response, token: string) {
    res.cookie('refreshToken', token, {
      expires: getRefreshTime(),
      httpOnly: true,
    });
  }

  getRefreshToken(req: Request) {
    return req.cookies('refreshToken');
  }
}
