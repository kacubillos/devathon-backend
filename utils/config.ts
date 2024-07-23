import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

interface Config {
    PORT: string | undefined;
}

const config: Config = {
    PORT
}

export default config;