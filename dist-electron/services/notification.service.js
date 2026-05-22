import { Notification } from "electron";
class NotificationService {
    show(title, body) {
        const notification = new Notification({
            title,
            body,
        });
        notification.show();
    }
}
export default new NotificationService();
