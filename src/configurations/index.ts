export default () => ({
    port:process.env.PORT,
    db_port: process.env.DB_PORT,
    db_host: process.env.POSTGRES_HOST,
    db_user: process.env.POSTGRES_USER,
    db_password: process.env.POSTGRES_PASSWORD,
    db_name: process.env.POSTGRES_DATABASE,
    secret_key: process.env.SECRET_KEY,
    expire_jwt: process.env.EXPIRE_JWT
})
