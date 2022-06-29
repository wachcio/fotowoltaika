import { LoggerService } from '@nestjs/common';
import fs from 'fs';
import { access, appendFile } from 'node:fs/promises';

export class MyLogger implements LoggerService {
  async writeToFile(message: any) {
    try {
      //   await access('logs/log.txt');
      await appendFile(
        'logs/log.txt',
        `[${new Date().toISOString()}] ${message}\r\n`,
      );
      //   console.log('can access');
    } catch {
      console.error('cannot access');
    }
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(`[${new Date().toISOString()}] ${message}`);
    this.writeToFile(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.error(`[${new Date().toISOString()}] ${message}`);
    this.writeToFile(message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.log(`[${new Date().toISOString()}] ${message}`);
    this.writeToFile(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    console.log(`[${new Date().toISOString()}] ${message}`);
    this.writeToFile(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(`[${new Date().toISOString()}] ${message}`);
    this.writeToFile(message);
  }
}
