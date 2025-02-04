import mongoose, { type Connection } from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

let currentConnection: Connection | null = null;

export async function connect(): Promise<Connection> {
	if (currentConnection) {
		console.log("Reusing existing MongoDB connection");
		return currentConnection;
	}

	if (!MONGO_URI) {
		throw new Error("Mongo URI must be specified.");
	}

	try {
		currentConnection = (await mongoose.connect(MONGO_URI)).connection;
		return currentConnection;
	} catch (error) {
		currentConnection = null;
		throw error;
	}
}
