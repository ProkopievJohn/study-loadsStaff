import Router from 'koa-router';
import userController from '../controller/user';
import projectController from '../controller/project';
const router = new Router();

router
  .get('/api/users', userController.readAllUsers)
  .get(`/api/user/:id`, userController.readOneUser)
  .post('/api/user', userController.createUser)
  .put('/api/user/:id', userController.updateUser)
  .delete('/api/user/:id', userController.deleteUser)
  
  .get('/api/projects', projectController.readAllProjects)
  .get('/api/project/:id', projectController.readOneProject)
  .post('/api/project', projectController.createProject)
  .put('/api/project/:id', projectController.updateProject)
  .delete('/api/project/:id', projectController.deleteProject);
  
export default router;
