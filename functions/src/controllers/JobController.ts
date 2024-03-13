import { JobModel } from '../models/Job';
import { connectToDatabase, closeDatabaseConnection } from '../config';
import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { ProfileModel } from '../models/Profile';

const handleResponse = (response: Response, statusCode: number, data: any) => {
  response.status(statusCode).json(data);
};

export const createJob = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();
    const newJob = new JobModel(request.body);
    await newJob.save();
    handleResponse(response, 201, newJob);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};

export const getJobs = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();

    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const jobs = await JobModel.find()
      .skip((page - 1) * limit)
      .limit(limit);

    handleResponse(response, 200, jobs);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};
export const getJobsWithUser = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();

    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const jobs = await JobModel.find()
      .populate({
        path: 'user_applicants',
        model: ProfileModel.modelName
      })
      .populate({
        path: 'recruiter',
        model: ProfileModel.modelName
      })
      .populate({
        path: 'user',
        model: ProfileModel.modelName
      })
      .skip((page - 1) * limit)
      .limit(limit);

    handleResponse(response, 200, jobs);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};

export const getJobById = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();
    const jobId = request.query.id as string;
    const job = await JobModel.findById(jobId);
    if (!job) {
      return handleResponse(response, 404, { message: 'Job not found' });
    }
    handleResponse(response, 200, job);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};

export const updateJobById = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();
    const jobId = request.query.id as string;
    const updatedJob = await JobModel.findByIdAndUpdate(jobId, request.body, {
      new: true,
    });
    if (!updatedJob) {
      return handleResponse(response, 404, { message: 'Job not found' });
    }
    handleResponse(response, 200, updatedJob);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};

export const deleteJobById = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();
    const jobId = request.query.id as string;
    const deletedJob = await JobModel.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return handleResponse(response, 404, { message: 'Job not found' });
    }
    handleResponse(response, 200, deletedJob);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};
