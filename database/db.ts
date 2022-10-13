import { DataSource } from 'typeorm';

import { dbConfig } from '@config';

const AppDataSource = new DataSource(dbConfig);

export const connectToDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
      .then(() => {
        console.log('[DATABASE] connected');
      })
      .catch((error) => console.log('[DATABASE] error', error));
  }
  return AppDataSource;
};
