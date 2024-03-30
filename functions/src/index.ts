import { onRequest } from 'firebase-functions/v2/https';
import {
  createPlan,
  getPlanById,
  deletePlanById,
  updatePlanById,
} from './controllers/PlanController';
import {
  createRole,
  getRoleById,
  deleteRoleById,
  updateRoleById,
} from './controllers/RoleController';
import {
  createView,
  getViewById,
  deleteViewById,
  updateViewById,
} from './controllers/ViewController';
import {
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByAuth0,
  getUsersAdmin
} from './controllers/UserController';
import {
  createTransaction,
  getTransactionById,
  deleteTransactionById,
  updateTransactionById,
} from './controllers/TransactionController';
import {
  createJob,
  getJobById,
  getJobs,
  updateJobById,
  deleteJobById,
  getJobsWithUser,
} from './controllers/JobController';
import {
  createProfile,
  getProfileById,
  updateProfileById,
  deleteProfileById,
} from './controllers/ProfileController';
import {
  getJobTips,
  getResumeRecommendations,
} from './controllers/TipsController';
import { getJobDetails } from './controllers/crawlerController';
import {
  createSubscription,
  createCustomer,
} from './controllers/stripeController';

const handleCors = (req: any, res: any) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
};

const applyCorsToFunction = (func:any) => {
  return onRequest((req: any, res: any) => {
    handleCors(req, res);
    func(req, res);
  });
};

export const createCustomerRoute = applyCorsToFunction(createCustomer);

// Rutas para el modelo Plan
export const createPlanRoute = applyCorsToFunction(createPlan);
export const getPlanByIdRoute = applyCorsToFunction(getPlanById);
export const updatePlanByIdRoute = applyCorsToFunction(updatePlanById);
export const deletePlanByIdRoute = applyCorsToFunction(deletePlanById);

// Rutas para el modelo Role
export const createRoleRoute = applyCorsToFunction(createRole);
export const getRoleByIdRoute = applyCorsToFunction(getRoleById);
export const updateRoleByIdRoute = applyCorsToFunction(updateRoleById);
export const deleteRoleByIdRoute = applyCorsToFunction(deleteRoleById);

// Rutas para el modelo View
export const createViewRoute = applyCorsToFunction(createView);
export const getViewByIdRoute = applyCorsToFunction(getViewById);
export const updateViewByIdRoute = applyCorsToFunction(updateViewById);
export const deleteViewByIdRoute = applyCorsToFunction(deleteViewById);


// Rutas para el modelo User
export const createUserRoute = applyCorsToFunction(createUser);
export const getUserByIdRoute = applyCorsToFunction(getUserById);
export const getUserByAuth0Route = applyCorsToFunction(getUserByAuth0);
export const getUsersAdminRoute = applyCorsToFunction(getUsersAdmin);
export const updateUserByIdRoute = applyCorsToFunction(updateUserById);
export const deleteUserByIdRoute = applyCorsToFunction(deleteUserById);

// Rutas para el modelo Transaction
export const createTransactionRoute = applyCorsToFunction(createTransaction);
export const getTransactionByIdRoute = applyCorsToFunction(getTransactionById);
export const updateTransactionByIdRoute = applyCorsToFunction(updateTransactionById);
export const deleteTransactionByIdRoute = applyCorsToFunction(deleteTransactionById);

// Rutas para el modelo Job
export const createJobRoute = applyCorsToFunction(createJob);
export const getJobsRoute = applyCorsToFunction(getJobs);
export const getJobsWithUserRoute = applyCorsToFunction(getJobsWithUser);
export const getJobByIdRoute = applyCorsToFunction(getJobById);
export const updateJobByIdRoute = applyCorsToFunction(updateJobById);
export const deleteJobByIdRoute = applyCorsToFunction(deleteJobById);

// Rutas para el modelo Profile y Tips
export const createProfileRoute = applyCorsToFunction(createProfile);
export const getProfileByIdRoute = applyCorsToFunction(getProfileById);
export const updateProfileByIdRoute = applyCorsToFunction(updateProfileById);
export const deleteProfileByIdRoute = applyCorsToFunction(deleteProfileById);
export const tipsToProfiles = applyCorsToFunction(getResumeRecommendations);
export const tipsToJobs = applyCorsToFunction(getJobTips);
// Rutas para Crawler
//export const getJobDetailsRoute = onRequest(getJobDetails);
// Rutas para el modelo createSubscription
export const createSubscriptionRoute = applyCorsToFunction(createSubscription);

export const testFunction = onRequest((req, res) => {
  res.send('¡Esta es una función de prueba en Firebase!');
});
