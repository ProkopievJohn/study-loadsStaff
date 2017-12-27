import db from '../models/db';
import mongo from 'mongodb';
const router = require('koa-router');
let ObjectID = mongo.ObjectID;

const createUser = async function(ctx, next) {
  try {
    let projects = []; 
    console.log(ctx.request.body);
    
    if (ctx.request.body.projects.length > 0 ) {
      console.log(ctx.request.body.projects);
      
      ctx.request.body.projects.map(item => {
        console.log(item);
        projects.push({"hours": item.hours, "id": item.id});
      });
    }
    let user = {
      name: ctx.request.body.name,
      projects
    };
    console.log(user.projects);
    const result = await db.insertDocument('users', user);
    ctx.body = result;
    ctx.status = 201;
  } catch(err) {
    ctx.body = err;
    ctx.status = 400;
  }
};

const readOneUser = async function(ctx, next) {
  try {
    const result = await db.findDocumentById('users', ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'cannot find users by id'};
    return;
  }
};

const readAllUsers = async function(ctx, next) {
  try {
    const result = await db.findCollection('users');
    ctx.body = result;
    ctx.status = 200;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'cannot find users by id'};
    return;
  }
};

const updateUser = async function(ctx, next) {
  try {
    let data = {
      name: ctx.request.body.name,
      skills: ctx.request.body.skills,
      projects: ctx.request.body.projects 
    }
    const result = await db.updateDocument('users', ctx.params.id, {$set: data});
    ctx.body = result;
    ctx.status = 200;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'cannot find users by id'};
    return;
  }
};

const deleteUser = async function(ctx, next) {
  try {
    const users = await db.removeDocument('users', ctx.params.id);
    ctx.body = 'OK';
    ctx.status = 204;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'cannot find users by id'};
    return;
  }
};

export default {createUser, readAllUsers, readOneUser, updateUser, deleteUser};
