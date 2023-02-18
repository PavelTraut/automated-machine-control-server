import { Request } from 'express';
import User from '../entitys/user.entity';

export default class AppRequest extends Request {
  user: User;
}
