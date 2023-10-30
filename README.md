# nodejs-fastify-solid-prisma-docker

Since I have developed only private projects on the last years, I have decided to publish some basic projects to build my portfolio focused in Java, Node.JS and React.JS. The main goal is find some way to apply some of the most popular technologies using a simple way to introduce some fundamental resources.

> Please regard the "About" tab on the GitHub, which you are able to check the technologies used in this project.

> This project will not be deployed to give public endpoint for testing, however, it has all the resources to be deployed anytime using Node.JS 18 or newer, and the Docker (using docker-compose.yml). If you want to deploy that, please regard the notes.txt, which I usually provide some useful details. 

> Important note: for this project is used Prisma + Docker, so that's required you use the docker-compose.yml to make the docker and its components up. 


## FR - Functional Requirements

- [x] The user may register;

- [x] The user may authenticate;

- [x] The user may retrieve their profile details once they are authenticated;

- [x] The user may check in;

- [x] The user may get their check in history;

- [x] The user may search for gyms next to them;

- [x] The user may search for gyms by name;

- [x] The gym may validate the check in from the user;

- [x] The gym may register itself;


## BR - Business Rules

- [x] The transaction may be credit or debit;

- [x] The backend must identify who is the user among the requests;

- [x] The user may see only their own transactions;