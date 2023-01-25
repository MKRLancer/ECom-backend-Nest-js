import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD.toString(),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: false,
            logging: Boolean(process.env.DB_LOGGING),
        };
    }
};