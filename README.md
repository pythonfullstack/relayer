# Relayer

The project is a multi-chain relayer system that we can limit the chains to be only Polygon Testnet that won’t do a lot of burden. 

## What is a relayer

Sending transactions on-chain requires gas fee. A relayer is essentially a system which sends transactions on behalf of the user so the user doesn’t have to spend gas fees. But in this case we have a little different relayer - where we let users pre-fill gas one time and let them send transactions without gas later. 

## Tech-stack

- Express.js
- Prisma as an interface with the DB [https://www.prisma.io/](https://www.prisma.io/)
- PostgreSQL

## What's done

- Allow users to setup accounts using email / password
- Automatically create a wallet using ethers.js, encrypt its keys and store
- Send users only the wallet address so they can fill it with $$
- Let users create and revoke multiple API keys which will let them send transactions
- The entire API would also need normal JWT based authentication

## TODO
- Expose an endpoint to the users to let them send:
    - contract address
    - contract abi
    - function name
    - parameters
    - tx value
- This endpoint will authenticate using the API keys and then will send the transaction using the wallet provisioned for that user and polygon testnet RPCs and then send the response back to the user.
