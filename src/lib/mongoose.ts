import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: MongooseCache | undefined;
}

const globalCache: MongooseCache = global.__mongooseCache ?? { conn: null, promise: null };
global.__mongooseCache = globalCache;

export async function connectMongo() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI env var');
  }
  if (globalCache.conn) return globalCache.conn;
  if (!globalCache.promise) {
    // Ensure TLS params for Atlas compatibility (helps with SSL handshake errors)
    const uri = MONGODB_URI.includes('?')
      ? MONGODB_URI
      : `${MONGODB_URI}?retryWrites=true&w=majority`;
    globalCache.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      })
      .then((m) => {
        console.log('✅ MongoDB connected successfully');
        return m;
      })
      .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        // Clear the promise so we can retry
        globalCache.promise = null;
        throw new Error(`MongoDB connection failed: ${err.message}. Please check your MONGODB_URI in .env.local`);
      });
  }
  try {
    globalCache.conn = await globalCache.promise;
    return globalCache.conn;
  } catch (err: any) {
    globalCache.promise = null;
    throw err;
  }
}

