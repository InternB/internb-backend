module.exports = {
  "name": "default",
  "type": "postgres",
  "database": "InternB",
  "host": process.env.DATABASE_HOST,
  "port": process.env.DATABASE_PORT,
  "username": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASS,
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
