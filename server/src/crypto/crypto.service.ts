import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class CryptoService {
  private readonly saltRaunds = 10;
  compare(hash: string, password: string) {
    return compare(password, hash);
  }

  encrypt(password: string) {
    return new Promise((resolve, reject) => {
      hash(password, this.saltRaunds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  }
}
