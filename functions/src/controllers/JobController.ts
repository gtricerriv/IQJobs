import { JobModel } from "../models/Job";
import { connectToDatabase, closeDatabaseConnection } from '../config';
import { Request, Response } from "express";

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

export const getJobById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const jobId = request.query.id as string;
        const job = await JobModel.findById(jobId);
        if (!job) {
            return handleResponse(response, 404, { message: "Job not found" });
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
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, request.body, { new: true });
        if (!updatedJob) {
            return handleResponse(response, 404, { message: "Job not found" });
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
            return handleResponse(response, 404, { message: "Job not found" });
        }
        handleResponse(response, 200, deletedJob);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};
