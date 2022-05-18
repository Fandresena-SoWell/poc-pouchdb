
# POC PouchDB (poc-pouchdb)



Simple Todo avec stockage local en utilisant [PouchDB](https://pouchdb.com/)

### Fonctionnalités
* CRUD Todo
* Proposition de structure des models

### Structure des models
On a la hiérarchie de dossiers suivantes:
* models
	* entities: les définitions des tables qu'on gère dans PouchDB
	* interfaces: les interfaces que les autres classes doivent implémenter
	* repositories: les classes responsables de stocker et modifier les données dans PouchDB

### Avantages
- On utilise la pleine capacité de Typescript pour créer des bases solides sur lequel écrire nos logiques métiers, grâce à des concepts clés comme les classes abstraites et les interfaces
- On peut utiliser des designs patterns reconnus et fiables pour nos besoins, comme Repository, Singleton

### Inconvénients
- La gestion des typages devient assez compliqué à gérer au fil des components etc
- Beaucoup de code boilerplate pour l'écriture des fondements

 ### Difficultés
 - Gérer les types des éléments fournis par PouchDB et les utiliser avec nos types est un assez grand challenge



## Install the dependencies



```bash

yarn

```



### Start the app in development mode (hot-code reloading, error reporting, etc.)



```bash

quasar dev

```



### Lint the files



```bash

yarn lint

```



### Format the files



```bash

yarn format

```



### Build the app for production



```bash

quasar build

```
