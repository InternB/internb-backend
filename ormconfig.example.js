module.exports = {
  "name": "default",
  "type": "postgres",
  "database": "InternB",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "110492-Bb",
  // "url": process.env.DATABASE_URL,
  "entities": [
    "./dist/modules/users/infra/typeorm/entities/*.js",
    "./dist/modules/schools/infra/typeorm/entities/*.js",
    "./dist/modules/disciplines/infra/typeorm/entities/*.js"
  ],
  "migrations": [
    "./dist/shared/infra/typeorm/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": [
      "./dist/shared/infra/typeorm/migrations"
    ]
  },
  "logging": false
}
