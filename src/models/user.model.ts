import mongoose from 'mongoose' 
export const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 10
        },
        email: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 255,
            unique: true
        }
    },
    {
        timestamps: true

    })

export const User = mongoose.model('users', userSchema);