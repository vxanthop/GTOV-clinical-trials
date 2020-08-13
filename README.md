# :pill: Appathon-NTUA  Statistical Analysis on the GTOV Dataset

Web application project for the 2019-2020 Internet and Applications course @ ECE-NTUA.



## :memo: Description

Find all the clinical trials using a specified drug. Furthermore check if the drug is mentioned in the eligibility criteria and the brief summary of the clinical trial.



Clinical Trials Gov Dataset: https://clinicaltrials.gov/.



## :computer: Technologies used:

Client-side: ReactJS, MaterializeCSS

Server-Side: NodeJS, ExpressJS, MongoDB



## **:hammer:** Installation (Ubuntu)

1. Start by installing the system requirements 

   By default MongoDB is not available in Ubuntu default repository so you will have to add the official MongoDB repository in your system manually. Follow the installation instructions found here https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/.

   

   For the rest of the packages:

   ```bash
   $ sudo apt update
   $ sudo apt install git git-lfs nodejs npm 
   ```

   
   
2. Clone the repository locally

   ```bash
   $ git clone https://github.com/vilaras/Appathon-NTUA.git
   $ cd Appathon-NTUA
   ```

   


3. Initialize the database from the mongodump located in `data/mongodump/`

   ```bash
   $ mongorestore -d appathon_ntua data/mongodump/appathon_ntua
   ```
   
   or download the XML zip from https://clinicaltrials.gov/ct2/resources/download#DownloadAllData, extract inside the `data/` folder, [start the Mongo server](#Usage) and then run:
   
   ``` bash
   $ nodejs db_setup.js 
   ```
   
   
   


4. Install package dependencies for server and client

   ```bash
   $ npm install
   $ cd client
   $ npm install 
   ```



##  :tada:Usage

### Start the MongoDB process 

```bash
$ sudo systemctl start mongod
```

If any error occures consult the official documentation https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/.

### Start the Development Servers

The application frontend is built with ReactJS and the backend with ExpressJS. Each run their own development server indipendently in different ports. We have set up for the frontend server to run in port 3000 and for the backend in port 5000. If you want to change that, edit the `config/config.env` and `client/.env`files respectively. To start the development servers simply run from the root folder:

```bash
$ npm run dev
```

You are  ready to go! 

