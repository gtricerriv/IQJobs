import { onRequest } from "firebase-functions/v2/https";
import { createPlan, getPlanById, deletePlanById, updatePlanById } from "./controllers/PlanController";
import { createRole, getRoleById, deleteRoleById, updateRoleById } from "./controllers/RoleController";
import { createView, getViewById, deleteViewById, updateViewById } from "./controllers/ViewController";
import { createUser, getUserById, deleteUserById, updateUserById } from "./controllers/UserController";
import { createTransaction, getTransactionById, deleteTransactionById, updateTransactionById } from "./controllers/TransactionController";
import { createJob, getJobById, updateJobById, deleteJobById } from "./controllers/JobController";
import { createProfile, getProfileById, updateProfileById, deleteProfileById } from "./controllers/ProfileController";

//import { createSubscription } from './controllers/stripeController';

// Rutas para el modelo Plan
export const createPlanRoute = onRequest(createPlan);
export const getPlanByIdRoute = onRequest(getPlanById);
export const updatePlanByIdRoute = onRequest(updatePlanById);
export const deletePlanByIdRoute = onRequest(deletePlanById);

// Rutas para el modelo Role
export const createRoleRoute = onRequest(createRole);
export const getRoleByIdRoute = onRequest(getRoleById);
export const updateRoleByIdRoute = onRequest(updateRoleById);
export const deleteRoleByIdRoute = onRequest(deleteRoleById);

// Rutas para el modelo View
export const createViewRoute = onRequest(createView);
export const getViewByIdRoute = onRequest(getViewById);
export const updateViewByIdRoute = onRequest(updateViewById);
export const deleteViewByIdRoute = onRequest(deleteViewById);

// Rutas para el modelo User
export const createUserRoute = onRequest(createUser);
export const getUserByIdRoute = onRequest(getUserById);
export const updateUserByIdRoute = onRequest(updateUserById);
export const deleteUserByIdRoute = onRequest(deleteUserById);

// Rutas para el modelo Transaction
export const createTransactionRoute = onRequest(createTransaction);
export const getTransactionByIdRoute = onRequest(getTransactionById);
export const updateTransactionByIdRoute = onRequest(updateTransactionById);
export const deleteTransactionByIdRoute = onRequest(deleteTransactionById);

// Rutas para el modelo Job
export const createJobRoute = onRequest(createJob);
export const getJobByIdRoute = onRequest(getJobById);
export const updateJobByIdRoute = onRequest(updateJobById);
export const deleteJobByIdRoute = onRequest(deleteJobById);

// Rutas para el modelo Profile
export const createProfileRoute = onRequest(createProfile);
export const getProfileByIdRoute = onRequest(getProfileById);
export const updateProfileByIdRoute = onRequest(updateProfileById);
export const deleteProfileByIdRoute = onRequest(deleteProfileById);

// Rutas para el modelo createSubscription
//export const createSubscriptionRoute = onRequest(createSubscription);