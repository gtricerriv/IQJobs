import { RoleModel } from "../models/Role";
import { connectToDatabase, closeDatabaseConnection } from '../config';
import { Request, Response } from "express";

const handleResponse = (response: Response, statusCode: number, data: any) => {
    response.status(statusCode).json(data);
};

export const createRole = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const newRole = new RoleModel(request.body);
        await newRole.save();
        handleResponse(response, 201, newRole);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const getRoleById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const roleId = request.query.id as string;
        const role = await RoleModel.findById(roleId);
        if (!role) {
            return handleResponse(response, 404, { message: "Role not found" });
        }
        handleResponse(response, 200, role);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const updateRoleById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const roleId = request.query.id as string;
        const updatedRole = await RoleModel.findByIdAndUpdate(roleId, request.body, { new: true });
        if (!updatedRole) {
            return handleResponse(response, 404, { message: "Role not found" });
        }
        handleResponse(response, 200, updatedRole);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const deleteRoleById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const roleId = request.query.id as string;
        const deletedRole = await RoleModel.findByIdAndDelete(roleId);
        if (!deletedRole) {
            return handleResponse(response, 404, { message: "Role not found" });
        }
        handleResponse(response, 200, deletedRole);
    } catch (error: any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};
