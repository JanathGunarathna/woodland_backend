import { account } from "../models/account.js";
import { Op } from "sequelize";

const accountRepo = {
  createAccount: async (accountData) => {
    return await account.create(accountData);
  },

  findById: async (id) => {
    return await account.findByPk(id);
  },

  findByEmail: async (email) => {
    return await account.findOne({ where: { email } });
  },

  findAll: async () => {
    return await account.findAll();
  },

  updateAccount: async (id, accountData) => {
    const existingAccount = await account.findByPk(id);
    if (!existingAccount) return null;
    return await existingAccount.update(accountData);
  },

  deleteAccount: async (id) => {
    const existingAccount = await account.findByPk(id);
    if (!existingAccount) return false;
    await existingAccount.destroy();
    return true;
  },
};

export default accountRepo;
