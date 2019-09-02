class Manager {
  constructor() {
    this.exitHandler = (options, exitCode) => {
      if (this.server) {
        this.server.kill();
      }
      process.exit(0)
    };
    process.on("exit", this.exitHandler);
    process.on("SIGINT", this.exitHandler);
    process.on("SIGUSR1", this.exitHandler);
    process.on("SIGUSR2", this.exitHandler);
    process.on("uncaughtException", this.exitHandler);
  }
}
module.exports = new Manager();
