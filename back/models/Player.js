import mongoose from "mongoose";

export const PlayerSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        avatar:{
            type: String,
            required: true,
        },
        gameCount:{
            type: Number,
        },
        bestScore:{
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Player', PlayerSchema)