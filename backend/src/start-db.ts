import { MongoMemoryServer } from 'mongodb-memory-server';

(async () => {
  try {
    const mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: 'familien-hero',
      }
    });

    const uri = mongod.getUri();
    console.log(`=======================================`);
    console.log(`🟢 MongoDB Memory Server gestartet!`);
    console.log(`🔗 URI: ${uri}`);
    console.log(`=======================================`);
    console.log(`(Zum Beenden STRG+C drücken)`);
  } catch (error) {
    console.error('Fehler beim Starten der In-Memory-Datenbank:', error);
    process.exit(1);
  }
})();
