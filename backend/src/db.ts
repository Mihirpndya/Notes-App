// mongodb+srv://mihir_pandya:sA2QTDKcBYkhXe6g@cluster0.jyjb85p.mongodb.net/

import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

mongoose.connect(
	"mongodb+srv://mihir_pandya:sA2QTDKcBYkhXe6g@cluster0.jyjb85p.mongodb.net/Notes"
);

interface Note extends Document {
	title: string;
	description?: string;
}

const noteSchema = new Schema<Note>({
	title: { type: String, required: true },

	description: { type: String },
});

const Notes = mongoose.model<Note>("Notes", noteSchema);

export default Notes;
