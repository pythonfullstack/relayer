module.exports = {
    server: {
        env: 'development',
        url: 'http://localhost',
        port: 8080,
        jwtSecret: 'raid-kevin-access-token-secret',
        jwtSaltRounds: 10,
        jwtAccessTokenExpiry: '1d',
        jwtRefreshTokenExpiry: '10d',
    },
    cache: {
        redisPort: 6537,
        redisURL: '',
    },
}
