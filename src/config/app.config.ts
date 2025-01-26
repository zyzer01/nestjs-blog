export const appConfig = () => ({
  environment: process.env.NODE_ENV || 'production',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'zyzer01',
    password: process.env.DATABASE_PASSWORD || 2426,
    name: process.env.DATABASE_NAME || 'nestjs-blog',
    synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
    autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
  },
});
