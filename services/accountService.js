import accountRepository from "../repositories/accountRepo.js";
import bcrypt from "bcrypt";
import { uploadFile } from "../utils/fileUpload.js";

export const createBooking = async (accountData, profilePicture) => {
  try {
    const hashedPassword = await bcrypt.hash(accountData.password, 10);

    let profilePicturePath = null;
    if (profilePicture) {
      profilePicturePath = await uploadFile(profilePicture);
    }

    const account = await accountRepository.create({
      ...accountData,
      password: hashedPassword,
      profilePicturePath,
    });

    const { password, ...accountWithoutPassword } = account.toJSON();
    return accountWithoutPassword;
  } catch (error) {
    throw new Error("Error creating account: " + error.message);
  }
};

export const getAccount = async (id) => {
  try {
    const account = await accountRepository.findById(id);
    if (!account) throw new Error("Account not found");

    const { password, ...accountWithoutPassword } = account.toJSON();
    return accountWithoutPassword;
  } catch (error) {
    throw new Error("Error fetching account: " + error.message);
  }
};

export const getAllAccounts = async () => {
  try {
    const accounts = await accountRepository.findAll();
    return accounts.map((account) => {
      const { password, ...accountWithoutPassword } = account.toJSON();
      return accountWithoutPassword;
    });
  } catch (error) {
    throw new Error("Error fetching accounts: " + error.message);
  }
};

export const updateAccount = async (id, updateData, profilePicture) => {
  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if (profilePicture) {
      updateData.profilePicturePath = await uploadFile(profilePicture);
    }

    const updatedAccount = await accountRepository.update(id, updateData);
    if (!updatedAccount) throw new Error("Account not found");

    const { password, ...accountWithoutPassword } = updatedAccount.toJSON();
    return accountWithoutPassword;
  } catch (error) {
    throw new Error("Error updating account: " + error.message);
  }
};

export const deleteAccount = async (id) => {
  try {
    const deleted = await accountRepository.delete(id);
    if (!deleted) throw new Error("Account not found");
    return true;
  } catch (error) {
    throw new Error("Error deleting account: " + error.message);
  }
};

// Exporting all functions together as an object
const accountService = {
  createBooking,
  getAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
};

export default accountService;
