"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Check, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

// Sample notifications data
const allNotifications: {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}[] = [
  {
    id: 1,
    title: "System Update",
    message: "A new system update is available for installation.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 2,
    title: "Meeting Reminder",
    message: "Don't forget about the team meeting at 3:00 PM.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 3,
    title: "New Message",
    message: "You received a new message from Alex.",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 4,
    title: "Password Change Alert",
    message: "Your password was changed successfully.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 5,
    title: "Subscription Expiring Soon",
    message: "Your subscription will expire in 3 days.",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 6,
    title: "Payment Received",
    message: "Your payment of $49.99 has been processed successfully.",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 7,
    title: "New Friend Request",
    message: "Sarah has sent you a friend request.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 8,
    title: "Event Invitation",
    message: "You are invited to the Annual Gala on Friday.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 9,
    title: "Security Alert",
    message: "A login attempt was detected from a new device.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 10,
    title: "Daily News Update",
    message: "Read today's top news stories now.",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState(allNotifications);
  const notificationsPerPage = 5;
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  const getCurrentPageNotifications = () => {
    const startIndex = (currentPage - 1) * notificationsPerPage;
    const endIndex = startIndex + notificationsPerPage;
    return notifications.slice(startIndex, endIndex);
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
  };

  return (
    <>
      <div className="space-y-4">
        {getCurrentPageNotifications().map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border transition-colors ${
              notification.read
                ? "bg-muted/50"
                : "bg-card hover:bg-accent/5 relative"
            }`}
          >
            {!notification.read && (
              <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
            )}
            <div className="grid gap-1 ml-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{notification.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`shrink-0 ${notification.read ? "text-muted-foreground" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                  disabled={notification.read}
                >
                  {notification.read ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Check className="h-5 w-5" />
                  )}
                  <span className="sr-only">Mark as read</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(notification.date, "PPp")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
}
