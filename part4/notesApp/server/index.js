import app from './app.js';
import config from './utils/envs.js';
import logger from './utils/logger.js';

const PORT = config.port;

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
