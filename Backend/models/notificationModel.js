import mongoose, { mongo } from "mongoose";

const notificationSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
        to:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            },
            type:{
                type: String,
                enum: ['like', 'follow'],
                required: true, 
                },
                read:{
                    type: Boolean,
                    default: false,
                },
                // createdAt: {
                //     type: Date,
                //     default: Date.now, // Automatically set createdAt date
                // }
},
{timestamps:true});
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
// follow and unfollow type not show ing on mongobd check and currectit