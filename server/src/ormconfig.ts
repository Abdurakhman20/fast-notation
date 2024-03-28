import { DataSource, DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'fast_notation_user',
  password: '1234',
  database: 'fast_notation',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts, .js}'],
};

const dataSourse = new DataSource(config);
export default dataSourse;
