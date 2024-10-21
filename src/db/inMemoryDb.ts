import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user';

const users: User[] = [];

export const getAllUsers = () => users;

export const getUserById = (id: string) => users.find(user => user.id === id);

export const createUser = (userData: Omit<User, 'id'>) => {
  const newUser: User = { ...userData, id: uuidv4() };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, userData: Partial<Omit<User, 'id'>>) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    return users[index];
  }
  return null;
};

export const deleteUser = (id: string) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};
