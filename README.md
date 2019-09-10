# mc_bootstrap
Can create mc servers and watch plugin binaries for changes to copy and restart a server

## Building binaries:
`pkg -t latest-macos-x64 -o binaries/mc_bootstrap_darwin_x64 . && pkg -t latest-linux-x64 -o binaries/mc_bootstrap_linux_x64 . && pkg -t latest-win-x64 -o binaries/mc_bootstrap_x64 .`