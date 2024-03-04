import { PlanModel } from "../models/Plan";
import { connectToDatabase, closeDatabaseConnection } from '../config';
import { Request, Response } from "express";

const handleResponse = (response: Response, statusCode: number, data: any) => {
    response.status(statusCode).json(data);
};

export const createPlan = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const newPlan = new PlanModel(request.body);
        await newPlan.save();
        handleResponse(response, 201, newPlan);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const getPlanById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const planId = request.query.id as string;
        const plan = await PlanModel.findById(planId);
        if (!plan) {
            return handleResponse(response, 404, { message: "Plan not found" });
        }
        handleResponse(response, 200, plan);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const updatePlanById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const planId = request.query.id as string;
        const updatedPlan = await PlanModel.findByIdAndUpdate(planId, request.body, { new: true });
        if (!updatedPlan) {
            return handleResponse(response, 404, { message: "Plan not found" });
        }
        handleResponse(response, 200, updatedPlan);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const deletePlanById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const planId = request.query.id as string;
        const deletedPlan = await PlanModel.findByIdAndDelete(planId);
        if (!deletedPlan) {
            return handleResponse(response, 404, { message: "Plan not found" });
        }
        handleResponse(response, 200, deletedPlan);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};
