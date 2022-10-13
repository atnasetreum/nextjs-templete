import { DataSourceOptions } from 'typeorm';

import { User } from '@models';

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'postgres',
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
};
