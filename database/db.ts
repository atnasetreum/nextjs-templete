import { DataSource } from 'typeorm';

import { User } from '@models';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'example',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});

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
