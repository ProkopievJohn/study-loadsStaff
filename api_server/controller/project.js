import db from '../models/db';
import mongo from 'mongodb';
const router = require('koa-router');

const createProject = async function(ctx, next) {
  try {
    let data = {
      name: ctx.request.body.name,
    };
    const result = await db.insertDocument('projects', data);
    if (ctx.request.body.users && rctx.request.body.users.length > 0) {
      result.users.map(async (item) => {
        let data = {
          projects: [{
            id: item.id,
            hours: item.hours
          }]
        };
        await db.updateDocument('users', item.id, data);
      });
    }
    ctx.body = 'OK';
    ctx.status = 201;
     
  } catch(err) {
    
    ctx.body = err;
    ctx.status = 400;
  };
};

const readOneProject = async function(ctx, next) {
  try {
    const result = await db.findDocumentById('projects', ctx.params.id);
    ctx.status = 200;
    ctx.body = result;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'wrong ID'};
  }
};

const readAllProjects = async function(ctx, next) {
  try {
    const result = await db.findCollection('projects');
    ctx.status = 200;
    ctx.body = result;
  } catch(err) {
    ctx.status = 400;
    ctx.body = err;
  };
};

const updateProject = async function(ctx, next) {
  try {
    let data = {
      name: ctx.request.body.name,
    };
    const result = await db.updateDocument('projects', ctx.params.id, {$set: data});
    ctx.body = result;
    ctx.status = 204;
  } catch(err) {
    ctx.status = 400;
    ctx.body = err;
  };
};

const deleteProject = async function(ctx, next) {
  try {
    let users = await db.findDocuments('users', {"projects": {$elemMatch: {"id": ctx.params.id}}});
    await db.removeDocument('projects', ctx.params.id);
    
    if (users) {
      users.map(async (user) => {
        for (project in user.projects) { 
          if (project.id === ctx.params.id) {
            await db.updateDocument('users', user._id, {$pull: {projects: project}});
          }
        }
      });
    }
    ctx.status = 204;
  } catch(err) {
    ctx.status = 400;
    ctx.body = {err: 'wrong ID'};
  }
};

export default {createProject, readOneProject, readAllProjects, updateProject, deleteProject};
