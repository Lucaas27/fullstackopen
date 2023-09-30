import app from './app.js';
import config from './utils/envs.js';
import { info } from './utils/logger.js';

const PORT = config.port;

app.listen(PORT, () => info(`Server running on port ${PORT}`));
