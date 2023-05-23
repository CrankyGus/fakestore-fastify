import { prisma } from '../../plugins/prisma';
import { IUser } from '../../dtos/user.dto';
import { hashPassword } from '../../utils/hash';

async function getAllUsers(opts?: boolean) {
  try {
    const users = await prisma.user.findMany({
      include: {
        orders: opts || false
      }
    });
    return users;
  } catch (error) {
    return error;
  }
}

async function getUserById(id: string, opts?: boolean) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        orders: opts || false
      }
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function createUser(user: IUser) {
  const { userFirstName, userLastName, email, password, isAdmin, userAddress, userCity, userPhone, userPostalCode, userCountry } = user;

  const hashedPassword = await hashPassword(password);
  const userExist = await prisma.user.findUnique({
    where: { email }
  });

  if (userExist) return 'User already exist';

  try {
    const newUser = await prisma.user.create({
      data: {
        firstname: userFirstName,
        lastname: userLastName,
        email: email,
        hashpassword: hashedPassword,
        address: userAddress,
        city: userCity,
        postal_code: userPostalCode,
        country: userCountry,
        phone: userPhone,
        isAdmin: isAdmin
      }
    });
    return newUser;
  } catch (error) {
    return error;
  }
}

async function updateUser(id: string, userEmail: string, user: IUser) {
  const { userFirstName, userLastName, email, password, isAdmin, userAddress, userCity, userPhone, userPostalCode, userCountry } = user;

  const hashedPassword = await hashPassword(password);
  const userExist = await prisma.user.findUnique({
    where: { email: userEmail }
  });

  if (!userExist) return 'User does not exist';

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstname: userFirstName,
        lastname: userLastName,
        email: email,
        hashpassword: hashedPassword,
        address: userAddress,
        city: userCity,
        postal_code: userPostalCode,
        country: userCountry,
        phone: userPhone,
        isAdmin: isAdmin
      }
    });
    return updatedUser;
  } catch (error) {
    return error;
  }
}

async function deleteUser(id: string) {
    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
    })

    return user
}

export {
    deleteUser,
    updateUser,
    createUser,
    getUserById,
    getAllUsers
}