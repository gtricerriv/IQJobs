import { onRequest } from 'firebase-functions/v2/https';
import { Response, Request } from 'express';
import { Profiles } from '../models/Index';
import { Document } from 'mongoose';
import { connectToDatabase, closeDatabaseConnection } from '../config';

// Función genérica para manejar respuestas de éxito y error
const handleResponse = (response: Response, statusCode: number, data: any) => {
  response.status(statusCode).json(data);
};

// Función para crear un perfil
export const createProfile = onRequest(
  async (request: Request, response: Response) => {
    try {
      await connectToDatabase();
      const newProfile = new Profiles.ProfileModel();
      // Lógica para asignar valores al nuevo perfil
      await newProfile.save();
      handleResponse(response, 201, newProfile);
    } catch (error: any) {
      handleResponse(response, 500, { error: error.message });
    } finally {
      await closeDatabaseConnection();
    }
  }
);

// Función para obtener un perfil por ID
export const getProfileById = onRequest(
  async (request: Request, response: Response) => {
    try {
      await connectToDatabase();
      const profileId: string = request.query.id as string;
      const profile: Document | null = await Profiles.ProfileModel.findById(
        profileId
      );
      if (!profile) {
        return handleResponse(response, 404, { message: 'Profile not found' });
      }
      handleResponse(response, 200, profile);
    } catch (error: any) {
      handleResponse(response, 500, { error: error.message });
    } finally {
      await closeDatabaseConnection();
    }
  }
);

// Función para actualizar un perfil por ID
export const updateProfileById = onRequest(
  async (request: Request, response: Response) => {
    try {
      await connectToDatabase();
      const profileId: string = request.query.id as string;
      const updatedProfile: Document | null =
        await Profiles.ProfileModel.findByIdAndUpdate(profileId, request.body, {
          new: true,
        });
      if (!updatedProfile) {
        return handleResponse(response, 404, { message: 'Profile not found' });
      }
      handleResponse(response, 200, updatedProfile);
    } catch (error: any) {
      handleResponse(response, 500, { error: error.message });
    } finally {
      await closeDatabaseConnection();
    }
  }
);

// Función para eliminar un perfil por ID
export const deleteProfileById = onRequest(
  async (request: Request, response: Response) => {
    try {
      await connectToDatabase();
      const profileId: string = request.query.id as string;
      const deletedProfile: Document | null =
        await Profiles.ProfileModel.findByIdAndDelete(profileId);
      if (!deletedProfile) {
        return handleResponse(response, 404, { message: 'Profile not found' });
      }
      handleResponse(response, 200, deletedProfile);
    } catch (error: any) {
      handleResponse(response, 500, { error: error.message });
    } finally {
      await closeDatabaseConnection();
    }
  }
);
