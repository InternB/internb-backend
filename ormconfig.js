module.exports = {
  "name": "default",
  "type": "postgres",
  "url": process.env.DATABASE_URL,
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
