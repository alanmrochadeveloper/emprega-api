module.exports = {
    apps: [
        {
            name: "api",
            script: "dist/src/main.js",
            instances: 2,
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
                PORT: 3001
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3001
            },
            namespace: "99emprega",
            watch: true
        }
    ]
};
