const spawn = require("child_process").spawn;
exports.startServerWithPipes = (java, path, fName, args = [], jvmArgs = []) => {
  const child = spawn(java, [...jvmArgs, "-jar", fName, ...args], {
    cwd: path
  });
  
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr)
  process.stdin.pipe(child.stdin);
  return child;
};
