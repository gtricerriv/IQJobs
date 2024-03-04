import { CVModel } from "../models/CV";
import { connectToDatabase, closeDatabaseConnection } from '../config';
import { Request, Response } from "express";

const handleResponse = (response: Response, statusCode: number, data: any) => {
    response.status(statusCode).json(data);
};

export const createCV = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const newCV = new CVModel(request.body);
        await newCV.save();
        handleResponse(response, 201, newCV);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const getCVById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const cvId = request.query.id as string;
        const cv = await CVModel.findById(cvId);
        if (!cv) {
            return handleResponse(response, 404, { message: "CV not found" });
        }
        handleResponse(response, 200, cv);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const updateCVById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const cvId = request.query.id as string;
        const updatedCV = await CVModel.findByIdAndUpdate(cvId, request.body, { new: true });
        if (!updatedCV) {
            return handleResponse(response, 404, { message: "CV not found" });
        }
        handleResponse(response, 200, updatedCV);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const deleteCVById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const cvId = request.query.id as string;
        const deletedCV = await CVModel.findByIdAndDelete(cvId);
        if (!deletedCV) {
            return handleResponse(response, 404, { message: "CV not found" });
        }
        handleResponse(response, 200, deletedCV);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};
