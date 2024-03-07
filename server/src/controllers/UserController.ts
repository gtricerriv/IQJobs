import { Request, Response } from 'express';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Plan } from '../models/Plan';
const { UserModel, UserClass } = User;
const { RoleModel, RoleClass } = Role;

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por su id
export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  const { auth0_id, profile_id, subscription_id } = req.body;

  const newUser = new UserClass();

  try {
    const createdUser = await UserModel.create(newUser);
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el usuario', code: err})
  }
}
