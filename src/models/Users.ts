/**
 * Define User model
 *
 * @author Ganesha moorthy
 */


 import { Document } from 'dynamoose/dist/Document';
import { DynamoDatabase } from '../providers/database/dynamoose.db';
import { IUser } from '../interfaces/modelUser';
import { number } from 'yup';
const mongoose = require('mongoose')

const dotenv = require('dotenv').config()
import { v4 as uuid } from 'uuid';

const tableName = dotenv.parsed.DB_USER_TABLE || 'dotenv DB_USER_TABLE not found';
export const IUserDynamooseModel = DynamoDatabase.model<IUser & Document>(tableName, new DynamoDatabase.Schema({

    id: {
        type: String,
        required: true,
        hashKey:true,
        default:uuid()

    },
    companyId:{
        type: String,
        required:true,
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: true
    }, phoneNumber: {
        type: String,
        required: true
    }
    ,timezone: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: "active"
    },
    isPhoneVerified:{
        type: Boolean,
        required:false,
        default: false
    },
    isEmailVerified:{
        type: Boolean,
        required:false,
        default: false
    },
    createdAt: { type: Number, required: true, default: Date.now },
    updatedAt: {
        type: Number,
        default: Date.now()
    },
}))