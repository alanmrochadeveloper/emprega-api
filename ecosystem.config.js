module.exports = {
    apps: [
        {
            name: "api",
            script: "dist/src/main.js",
            instances: 2,
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
                PORT: 3001,
                TYPEORM_CONNECTION: "postgres",
                TYPEORM_HOST: "localhost",
                TYPEORM_PORT: "15432",
                TYPEORM_USERNAME: "root",
                TYPEORM_PASSWORD: "@Postgres123",
                TYPEORM_DATABASE: "emprega99",
                TYPEORM_SYNCHRONIZE: false,
                TYPEORM_MIGRATIONS: "src/typeorm/migrations/*.{ts,js}",
                TYPEORM_MIGRATIONS_TABLE_NAME: "migrations_history",
                TYPEORM_MIGRATIONS_RUN: false,
                TYPEORM_ENTITIES: "**.entity.{ts,js}",
                TYPEORM_SSL_REJECT_UNAUTHORIZED: false,
                TYPEORM_AUTO_LOAD_ENTITIES: false,
                TYPEORM_SSL_MODE: false,
                TYPEORM_SYNCHRONIZE: false
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3001,
                TYPEORM_CONNECTION: "postgres",
                TYPEORM_HOST: "emprega-99-dev.cbuaoiimmoy2.sa-east-1.rds.amazonaws.com",
                TYPEORM_PORT: "5432",
                TYPEORM_USERNAME: "postgres",
                TYPEORM_PASSWORD: "99Emprega777",
                TYPEORM_DATABASE: "emprega99",
                TYPEORM_SYNCHRONIZE: false,
                TYPEORM_MIGRATIONS: "dist/src/database/migrations/*.{ts,js}",
                TYPEORM_MIGRATIONS_TABLE_NAME: "migrations_history",
                TYPEORM_MIGRATIONS_RUN: false,
                TYPEORM_ENTITIES: "dist/src/**.entity.{ts,js}",
                TYPEORM_SSL_REJECT_UNAUTHORIZED: false,
                TYPEORM_AUTO_LOAD_ENTITIES: false,
                TYPEORM_SSL_MODE: false,
                TYPEORM_SYNCHRONIZE: false,
                EMAIL_HOST: "smtp-mail.outlook.com",
                EMAIL_DOMAIN: "outlook.com",
                EMAIL_PORT: "587",
                EMAIL_USER: "alanmrochadeveloper@outlook.com",
                EMAIL_PASSWORD: "@Mnala756",
                CLIENT_URL: "https://main.d3unqwilcm1tv7.amplifyapp.com"
            },
            namespace: "99emprega",
            watch: true
        }
    ]
};
