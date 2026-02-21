import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;

// Serverless-optimized MongoDB connection options with TLS settings
const options = {
  maxPoolSize: 10,           // Maximum connection pool size for serverless
  minPoolSize: 2,            // Minimum connections to maintain
  maxIdleTimeMS: 30000,      // Close idle connections after 30s
  serverSelectionTimeoutMS: 10000, // Server selection timeout
  socketTimeoutMS: 45000,    // Socket timeout
  connectTimeoutMS: 10000,   // Connection timeout
  retryWrites: true,         // Retry failed writes
  retryReads: true,          // Retry failed reads
  tls: true,                 // Enable TLS for secure connection
  tlsAllowInvalidCertificates: true // Allow self-signed certificates (match Python config)
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('applications'); // Use 'applications' database like working Python project
}

export default clientPromise;
