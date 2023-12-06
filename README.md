# Alchemy-API
Backend APIs for accessing transactions , token and nft details of an address.

## Technologies Used

- **Backend**: The server is constructed using Node.js and the Express framework, ensuring robust and efficient functionality. MongoDB is employed as the database, and user authentication is handled via JSON Web Tokens (JWT) and signature verification using metamask and etherjs.

## Getting Started

To run this project locally and experience its capabilities, follow these simple steps:

1. Clone this repository to your local machine.

2. Install the necessary dependencies using `pnpm install`.

4. Create an `.env` file in the root folders. Copy the contents from `.env-sample` to these files, and fill in the essential API keys and URLs with your own credentials.

5. Start the backend server with the command `node index.js`.

Now, you are all set to explore the potential of Quaerere and enjoy a seamless web search experience.

Feel free to customize, extend, and improve this project according to your needs. Happy searching!

## URLs

### Base URL
- **Local Development**: `http://localhost:PORT` (Replace `PORT` with the port number configured in your `.env` file)

### Endpoints

#### Transactions
- **Fetch User Transactions:**
  - `GET /api/fetch-transaction/:address`

#### Tokens
- **Fetch Token Details:**
  - `GET /api/fetch-token/:address`
- **Fetch Token Metadata:**
  - `GET /api/fetch-tokenMetaData/:address`

#### NFTs
- **Fetch User NFTs:**
  - `GET /api/fetch-nft/:address`
- **Fetch NFT Metadata:**
  - `GET /api/fetch-nftMetaData/:address/:tokenId`

#### User
- **User Registration:**
  - `POST /api/register`
- **User Login:**
  - `POST /api/login`
- **Metamask Login:**
  - `POST /api/login-metamask`
- **Fetch Nonce:**
  - `GET /api/nonce`

