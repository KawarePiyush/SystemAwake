import { Notification } from "electron";

class NotificationService {
  show(
    title: string,
    body: string
  ) {
    const notification =
      new Notification({
        title,
        body,
      });

    notification.show();
  }
}

export default new NotificationService();