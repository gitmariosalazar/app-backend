import {Router} from 'express';
import {getUserById, getUserTypeById, getUsers, getUsersTypes, createUser, updateUser, deleteUser, changeUserPassword, loginUser} from '../models/users.js';

const router = Router();

router.get('/userstypes', getUsersTypes);
router.get('/userstypes/:id', getUserTypeById);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', loginUser)
router.put('/users/:id', changeUserPassword)
router.delete('/users/:id', deleteUser)


export {
    router
}   