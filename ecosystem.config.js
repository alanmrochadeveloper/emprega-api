module.exports = {
    apps: [
        {
            name: "api",
            script: "dist/src/main.js",
            instances: 2,
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
                PORT: 3001,
                ...process.env
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3001,
                ...process.env
            },
            namespace: "99emprega",
            watch: true
        }
    ]
};
