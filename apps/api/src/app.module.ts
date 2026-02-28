import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'lanradar',
      password: process.env.DB_PASS || 'lanradar',
      database: process.env.DB_NAME || 'lanradar',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
