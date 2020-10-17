module.exports = {
  "name": "default",
  "type": "postgres",
  "database": "InternB",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "110492-Bb",
  "entities": [
    "./src/modules/users/infra/typeorm/entities/*.ts",
    "./src/modules/schools/infra/typeorm/entities/*.ts",
    "./src/modules/disciplines/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": [
      "./src/shared/infra/typeorm/migrations"
    ]
  },
  "logging": false
}
