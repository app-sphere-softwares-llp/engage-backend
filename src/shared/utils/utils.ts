import * as moment from 'moment';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

/**
 * path resolver function
 * @param pathToResolve
 */
export const resolvePath = (pathToResolve) => {
  return path.resolve(path.join(pathToResolve));
};

/**
 * return's new utc date
 */
export const generateUtcDate = (): Date => {
  return moment.utc().toDate();
};

/**
 * throw new bad request exception
 * @param msg
 * @constructor
 */
export const BadRequest = (msg: string) => {
  throw new BadRequestException(msg);
};

/**
 * converts a normal id to objectId
 * @param id
 */
export const toObjectId = (id: string | number): Types.ObjectId => {
  return new Types.ObjectId(id);
};

/**
 * check if given id is valid or not
 * @param id
 */
export const isValidObjectId = (id: string) => {
  return Types.ObjectId.isValid(id);
};

/**
 * check whether given mobile no is valid
 * @param mobileNo
 */
export const isValidMobileNo = (mobileNo: string) => {
  return /^\d{10}$/.test(mobileNo);
};
