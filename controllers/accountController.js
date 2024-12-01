import accountService from '../services/accountService.js';

export const createAccount = async (req, res) => {
  try {
    const accountData = req.body;
    const profilePicture = req.file;
    const account = await accountService.createAccount(accountData, profilePicture);
    res.status(201).json({
      success: true,
      data: account,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountService.getAccount(id);
    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.status(200).json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const profilePicture = req.file;
    const account = await accountService.updateAccount(id, updateData, profilePicture);
    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await accountService.deleteAccount(id);
    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Exporting individual functions
export default {
  createAccount,
  getAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
};
