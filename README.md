Tachacoincore Node
============

A TACHACOIN full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services.

## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v6
    nvm use v6
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

3. Install tachacoin-bitcore https://github.com/tachacoin/tachacoin-bitcore - with ZMQ ! 

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install tachacoincore-node  

    ```bash
    npm i https://github.com/tachacoin/tachacoincore-node.git#master

    $(npm bin)/tachacoincore-node create mynode

    cd mynode

    ```  
5. Edit tachacoincore-node.json  

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
	    "tachacoind",
        "web"
      ],
      "servicesConfig": {
        "tachacoind": {
          "spawn": {
            "datadir": "/home/user/.tachacoin",
            "exec": "/home/user/tachacoin-bitcore/src/tachacoind"
          }
        }
      }
	}
    ```  
6. Edit tachacoin.conf  

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
7. Run Node  

    ```
    $(npm bin)/tachacoincore-node start
    ```  

## Add-on Services

There are several add-on services available to extend the functionality of Tachacoincore:

- [TACHACOIN Insight API](https://github.com/tachacoin/insight-api)
- [TACHACOIN Explorer](https://github.com/tachacoin/tachacoin-explorer)

## Contributing



## License
