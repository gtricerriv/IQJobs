import { ViewModel, View } from '../models/View';
import { closeDatabaseConnection, connectToDatabase } from '../config';
import { Request, Response } from 'express';

const handleResponse = (response: Response, statusCode: number, data: any) => {
  response.status(statusCode).json(data);
};

export const createView = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();
    const newView = new ViewModel(request.body);
    await newView.save();
    handleResponse(response, 201, newView);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};

export const getViewById = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();
    const viewId = request.query.id as string;
    const view = await ViewModel.findById(viewId);
    if (!view) {
      return handleResponse(response, 404, { message: 'View not found' });
    }
    handleResponse(response, 200, view);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};

export const updateViewById = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();
    const viewId = request.query.id as string;
    const updatedView = await ViewModel.findByIdAndUpdate(
      viewId,
      request.body,
      { new: true }
    );
    if (!updatedView) {
      return handleResponse(response, 404, { message: 'View not found' });
    }
    handleResponse(response, 200, updatedView);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};

export const deleteViewById = async (request: Request, response: Response) => {
  try {
    await connectToDatabase();
    const viewId = request.query.id as string;
    const deletedView = await ViewModel.findByIdAndDelete(viewId);
    if (!deletedView) {
      return handleResponse(response, 404, { message: 'View not found' });
    }
    handleResponse(response, 200, deletedView);
  } catch (error: any) {
    handleResponse(response, 500, { error: error.message });
  } finally {
    await closeDatabaseConnection();
  }
};
