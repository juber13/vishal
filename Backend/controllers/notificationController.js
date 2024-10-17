import Notification from "../models/notificationModel.js";

export const getNotifications = async (req,res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({to:userId}).populate({
            path:"from",
            select:"username profileImg"
        });
await Notification.updateMany({
    to:userId},{read:true});
    res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotification function", error.message);
        res.status(500).json({error:"Internal server Error"});
    }
};
export const deleteNotifications =async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({to:userId});
        res.status(200).json({message: "Notifications deleted successfully"});
    } catch (error) {
        console.log("Error in deleteNotifications function:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

// import Notification from "../models/notificationModel.js";

// export const getNotifications = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         // Find notifications for the user and populate the "from" field
//         const notifications = await Notification.find({ to: userId }).populate({
//             path: "from",
//             select: "username profileImg"
//         });

//         // Update the 'read' status of all notifications
//         await Notification.updateMany({ to: userId, read: false }, { $set: { read: true } });

//         // Respond with the fetched notifications
//         res.status(200).json(notifications);
//     } catch (error) {
//         console.log("Error in getNotifications function:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

// export const deleteNotifications = async (req, res) => {
//     try {
//         const userId = req.user._id;

//         // Delete all notifications for the user
//         await Notification.deleteMany({ to: userId });

//         // Respond with a success message
//         res.status(200).json({ message: "Notifications deleted successfully" });
//     } catch (error) {
//         console.log("Error in deleteNotifications function:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

export const deleteNotificationsById = async (req, res) => {
try {
    const notificationId = req.params.id;
    const userId = req.userId._id;
    const notification =await Notification.findById(notificationId);
    if(!notification){
        return res.status(404).json({error: "Notification not found"});
    }
    if(notification.to.toString() !== userId.toString()){
        return res.status(403).json({error: "you are not allowed to delete this notification"});
    }
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({message: "Notification deleted successfully"});
} catch (error) {
    console.log("Error in deleteNotificationById function:", error.message);
    res.status(500).json({error:" Internal Server Error"});
}
}