import { JobModel, JobClass } from "../models/Job";
import { Request, Response } from "express";

const handleResponse = (response: Response, statusCode: number, data: any) => {
    response.status(statusCode).json(data);
};

export const createJob = async (request: Request, response: Response) => {
    try {
        const newJob = new JobModel(request.body);
        await newJob.save();
        handleResponse(response, 201, newJob);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    }
};

export const getJobById = async (request: Request, response: Response) => {
    try {
        const jobId = request.query.id as string;
        const job = await JobModel.findById(jobId);
        if (!job) {
            return handleResponse(response, 404, { message: "Job not found" });
        }
        handleResponse(response, 200, job);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    }
};

export const updateJobById = async (request: Request, response: Response) => {
    try {
        const jobId = request.query.id as string;
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, request.body, { new: true });
        if (!updatedJob) {
            return handleResponse(response, 404, { message: "Job not found" });
        }
        handleResponse(response, 200, updatedJob);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    }
};

export const deleteJobById = async (request: Request, response: Response) => {
    try {
        const jobId = request.query.id as string;
        const deletedJob = await JobModel.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return handleResponse(response, 404, { message: "Job not found" });
        }
        handleResponse(response, 200, deletedJob);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    }
};
