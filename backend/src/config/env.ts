import 'dotenv/config';

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 5000),
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: required('JWT_SECRET', 'change-this-secret'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  aiApiKey: process.env.AI_API_KEY ?? '',
  nodeEnv: process.env.NODE_ENV ?? 'development',
};
