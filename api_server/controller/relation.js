import db from '../models/db';
import mongo from 'mongodb';
const router = require('koa-router');
let ObjectID = mongo.ObjectID;

const createRelation = async function(id, projects) {
  try {
    let data = {
      _id: new ObjectID(id),
      projects: projects
    }
    const result = await db.insertDocument('relations', data);
    return 
  } catch(err) {
    return err;
  }
};

const readAllRelations = async function(ctx, next) {
  try {
    const result = await db.findCollection('relations');
    ctx.body = result;
    ctx.status = 200;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'cannot find'};
    return;
  }
};

const updateRelation = async function(ctx, next) {
  try {
    let data = {
      projects: ctx.request.body.projects 
    }
    const result = await db.updateDocument('relations', ctx.params.id, {$set: data});
    ctx.body = result;
    ctx.status = 200;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'cannot find'};
    return;
  }
};

const deleteRelation = async function(ctx, next) {
  try {
    const users = await db.removeDocument('relations', ctx.params.id);
    ctx.body = 'OK';
    ctx.status = 204;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'cannot find'};
    return;
  }
};

export default {createRelation, readAllRelations, updateRelation, deleteRelation};
