# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop tachacoincore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/tachacoincore-node.git
git clone git@github.com:<yourusername>/tachacoincore-lib.git
```

To develop tachacoin or to compile from source:

```bash
git clone git@github.com:<yourusername>/tachacoincoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See tachacoin documentation for building tachacoin on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download tachacoin distribution, you'll need to compile tachacoind from source, and setup your configuration to use that version.


We now will setup symlinks in `tachacoincore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf tachacoincore-lib
ln -s ~/tachacoincore-lib
rm -rf tachacoind-rpc
ln -s ~/tachacoind-rpc
```

And if you're compiling or developing tachacoincoin:
```bash
cd ../bin
ln -sf ~/tachacoin/src/tachacoind
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd tachacoincore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/tachacoind.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/tachacoind.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch tachacoincore-node.json
touch package.json
```

Edit `tachacoincore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "tachacoind",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "tachacoind": {
      "spawn": {
        "datadir": "/home/<youruser>/.tachacoin",
        "exec": "/home/<youruser>/tachacoin/src/tachacoind"
      }
    }
  }
}
```

**Note**: To install services [tachacoin-insight-api](https://github.com/tachacoin/insight-api) and [tachacoin-explorer](https://github.com/tachacoin/tachacoin-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/tachacoincore-lib
ln -s ~/tachacoincore-node
ln -s ~/tachacoin-insight-api
ln -s ~/tachacoin-explorer
```

Make sure that the `<datadir>/tachacoin.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../tachacoincore-node/bin/tachacoincore-node start
```