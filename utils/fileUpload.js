import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

// If you need __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (file) => {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(__dirname, '../uploads', fileName);

  await fs.rename(file.path, filePath);
  return `/uploads/${fileName}`;
};
