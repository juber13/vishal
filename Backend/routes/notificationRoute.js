import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotifications, deleteNotificationsById, getNotifications } from "../controllers/notificationController.js";

const router = express.Router();
router.get("/", protectRoute,getNotifications);
router.delete("/", protectRoute,deleteNotifications);
router.delete("/:id", protectRoute,deleteNotificationsById);
export default router;