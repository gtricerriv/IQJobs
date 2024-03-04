import { onRequest } from "firebase-functions/v2/https";
import { UserModel } from "../models/User";
import { ProfileModel } from "../models/Profile";
import { connectToFirebaseDatabase, closeFirebaseDatabaseConnection } from '../config';

// Función para crear un usuario
export const createUser = onRequest(async (request, response) => {
    try {
        await connectToFirebaseDatabase();
        const userData = request.body;
        const newUser = new UserModel(userData);
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    } finally {
        await closeFirebaseDatabaseConnection();
    }
});

// Función para obtener un usuario por ID
export const getUserById = onRequest(async (request, response) => {
    try {
        await connectToFirebaseDatabase();
        const userId = request.query.id as string;
        const user = await UserModel.findById(userId).populate('profile');
        if (!user) {
            response.status(404).json({ message: "User not found" });
        } else {
            response.status(200).json(user);
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    } finally {
        await closeFirebaseDatabaseConnection();
    }
});

// Función para actualizar un usuario por ID
export const updateUserById = onRequest(async (request, response) => {
    try {
        await connectToFirebaseDatabase();
        const userId = request.query.id as string;
        const userData = request.body;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true }).populate('profile');
        if (!updatedUser) {
            response.status(404).json({ message: "User not found" });
        } else {
            response.status(200).json(updatedUser);
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    } finally {
        await closeFirebaseDatabaseConnection();
    }
});

// Función para eliminar un usuario por ID
export const deleteUserById = onRequest(async (request, response) => {
    try {
        await connectToFirebaseDatabase();
        const userId = request.query.id as string;
        const deletedUser = await UserModel.findByIdAndDelete(userId).populate('profile');
        if (!deletedUser) {
            response.status(404).json({ message: "User not found" });
        } else {
            response.status(200).json(deletedUser);
        }
    } catch (error: any) {
        response.status(500).json({ error: error.message });
    } finally {
        await closeFirebaseDatabaseConnection();
    }
});
