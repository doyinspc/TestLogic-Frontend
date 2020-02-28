module.exports = {
  apps: [
    {
      name: 'testtricks',
      script: 'node_modules/serve/bin/serve.js',
      args: "-s build -l 3000",
      exec_mode: "fork_mode"
    },
  ],
};
