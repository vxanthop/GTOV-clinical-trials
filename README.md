# :pill: Statistical Analysis on the GTOV Dataset

## :memo: Description

Find all the clinical trials using a specified drug. Furthermore check if the drug is mentioned in the eligibility criteria and the brief summary of the clinical trial.

Clinical Trials Gov Dataset: https://clinicaltrials.gov/.

## :computer: Technologies used:

Client-side: React.js, MaterializeCSS, ESLint

Server-Side: Node.js, Express.js, MongoDB, ESLint

## :hammer: Installation (Ubuntu)

1. Start by installing the system requirements

   By default MongoDB is not available in Ubuntu default repository so you will have to add the official MongoDB repository in your system manually. Follow the installation instructions found here https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/.

   For the rest of the packages:

   ```bash
   $ sudo apt update
   $ sudo apt install git nodejs npm
   ```

2. Clone the repository locally

   ```bash
   $ git clone https://github.com/vilaras/GTOV-clinical-trials.git
   $ cd GTOV-clinical-trials
   ```

3. Install package dependencies for server and client

   ```bash
   $ npm install
   $ cd client
   $ npm install
   ```

4. Initialize the database:

   First of all [start the MongoDB process](#start-the-mongodb-process). Then choose one of the following two ways to initialize the database:

   - Download the mongodump from https://www.dropbox.com/sh/bgdz7289qs1t4t0/AAAwLr-rZxkCPQCeEE7uXxJTa?dl=0, extract inside the `data/` folder and then run:

     ```bash
      $ mongorestore -d gtov mongodump/mongodump/gtov/
     ```

   - Download all the XML files from https://clinicaltrials.gov/AllPublicXML.zip, extract inside the `data/` folder, run:

     ```bash
     $ npm start
     ```

     from the root folder to start the server and finally open a browser and enter http://localhost:5000/populate_db/. This will run a script which parses all the XML files and builds the database from scratch.

## :tada: Usage

### Start the MongoDB process

```bash
$ sudo systemctl start mongod
```

If any error occures, consult the official documentation https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/.

### Start the Development Servers

The application's frontend is built with ReactJS and the backend with ExpressJS. Each run their own development server indipendently in different ports. We have set up for the frontend server to run in port 3000 and for the backend in port 5000. If you want to change that, edit the `config/config.env` and `client/.env` files respectively. Also, if you change the server port be sure to change the client proxy in `client/package.json`. To start the development servers simply run from the root folder:

```bash
$ npm run dev
```

You are ready to go!
