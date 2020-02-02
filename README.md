# mc_bootstrap
Can watch plugin binaries for changes to copy and restart a server  

[Download, all platforms](https://github.com/liz3/mc_bootstrap/releases/latest)

## Building binaries:
`pkg -t latest-macos-x64 -o binaries/mc_bootstrap_darwin_x64 . && pkg -t latest-linux-x64 -o binaries/mc_bootstrap_linux_x64 . && pkg -t latest-win-x64 -o binaries/mc_bootstrap_x64 .`

```
Usage: mc-bootstrap build/run/help [...args]
run
                --dir,-d PATH : Define the directoy where the server root is
                --bin,-b PATH(default to "java") : Define the java start executable
                --file,-f PATH : Define the server exeutable
                --watch,-w : Define a file to be watched, this option is followed by 3 arguments, file(The file to be watch), dest(the destination file) and cmd()
                        Example: -w myproject/build/plugin.jar myserver/plugins/plugin.jar restart
                        Actions: restart will perform a server restart, while anything else will only run the specified command
                --jvm,-j PARAM : Adds the following param to the JVM start args
                --dump,-o NAME : Rather then starting the configuration, it saves the configuration into a file
                --conf,-c NAME : Loads a configuration from the name and starts a server based on that config
                --timeout,-t NUMBER(default 3000) : Some build tools like maven or gradle write the target file more then once. to make sure only the newest version is copied. this defines in milliseconds how long to wait before actually copying the file, so only the final file gets copied to the server.

```