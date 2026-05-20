import Redis from 'ioredis'

const redis = new Redis({
    host: '[IP_ADDRESS]',
    port: 6379
});

export default redis;