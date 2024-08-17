import path from 'path';

export default {
    webpack: config => {
        config.resolve.modules.push(path.resolve('./'));

        return config;
    }
};
