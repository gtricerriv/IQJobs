import { TransactionModel } from '../models/Transaction';
import { connectToDatabase, closeDatabaseConnection } from '../config';
import { Request, Response } from 'express';

const handleResponse = (response: Response, statusCode: number, data: any) => {
    response.status(statusCode).json(data);
};

export const createTransaction = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const newTransaction = new TransactionModel(request.body);
        await newTransaction.save();
        handleResponse(response, 201, newTransaction);
    } catch (error:any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const getTransactionById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const transactionId = request.query.id as string;
        const transaction = await TransactionModel.findById(transactionId);
        if (!transaction) {
            return handleResponse(response, 404, { message: "Transaction not found" });
        }
        handleResponse(response, 200, transaction);
    } catch (error:any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const updateTransactionById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const transactionId = request.query.id as string;
        const updatedTransaction = await TransactionModel.findByIdAndUpdate(transactionId, request.body, { new: true });
        if (!updatedTransaction) {
            return handleResponse(response, 404, { message: "Transaction not found" });
        }
        handleResponse(response, 200, updatedTransaction);
    } catch (error:any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};

export const deleteTransactionById = async (request: Request, response: Response) => {
    try {
        await connectToDatabase();
        const transactionId = request.query.id as string;
        const deletedTransaction = await TransactionModel.findByIdAndDelete(transactionId);
        if (!deletedTransaction) {
            return handleResponse(response, 404, { message: "Transaction not found" });
        }
        handleResponse(response, 200, deletedTransaction);
    } catch (error:any) {
        handleResponse(response, 500, { error: error.message });
    } finally {
        await closeDatabaseConnection();
    }
};
