import { validate as isUUID } from 'uuid';

export const validateUUID = (id: string) => isUUID(id);

export const validateUserData = (data: any) => {
  const { username, age, hobbies } = data;
  if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
    return false;
  }
  return true;
};
