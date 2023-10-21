export interface Notification {
  id: string; // Unique identifier for the notification
  type: 'follow' | 'like' | 'comment'; // Type of notification
  senderId: string; // User ID of the person who triggered the notification
  senderName: string; // Display name of the sender
  message: string; // Main content of the notification
  timestamp: Date; // When the notification was sent
  link: string;
  user: {
    imageName: string | null;
    image: string | null;
  };
}
