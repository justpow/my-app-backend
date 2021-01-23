# my-app-backend

my-app-backend is a back-end boilerplate to start and init new project.
The app is using Express JS and Clean Architecture adoption.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install

```
Node v10+
Yarn v.120+
Docker engine v20+
Docker compose v1.28+
```

### Environtment Variable
Before installing the app, make sure there is ``.env`` file available with the defined keys. Copy the ``.env`` file template with command below

```
cp .env-example .env
```

### Installation

First you need init DB and install all dependencies

```
make init
```

## Running the app

After that just run the app in development mode by command:
```
make dev
```

The app will run on port ``3001``
```
localhost:3001
```

Author ``justpow``

