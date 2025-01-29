import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(
  configService: ConfigService,
): Promise<void> {
  const AppDataSource = await new DataSource({
    type: 'postgres',
    synchronize: true,
    host: configService.get('database.host'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
    port: configService.get('database.port'),
  });

  await AppDataSource.initialize();
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
}
