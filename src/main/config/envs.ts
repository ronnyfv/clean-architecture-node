const envs = {
  MONGO_URL:
    process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  PORT: process.env.PORT || '3000',
};
export { envs };
