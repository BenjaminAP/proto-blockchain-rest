Do to having issues with the bitcoin core wallet I had to develop a wallet interface.
- The wallet is  and angular app that is shared in the compress folder.
- It has the same functionality as the bitcoin wallet for signing and added a request sign message in it.
- The available routes are on blockchain_router TS file.
- Please be aware that do to having to make a wallet interface I had to change some routes from post -> get.
- Sorry for the inconvenience, but it was the only way I could make some progress.


1. ```npm install --global yarn```
2. ```yarn install```
3. ```yarn dev``` or ```yarn start```
4. server runs in port http://localhost:3000/

- routes that can be tested in postman passing param to the route:

1. http://localhost:3000/block/hash/:hash
2. http://localhost:3000/star/owner/:address

#GitHub Repo:
https://github.com/BenjaminAP/proto-blockchain-rest
