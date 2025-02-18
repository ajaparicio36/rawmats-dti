"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Check, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { Notification } from "@prisma/client";
import { useSupplier } from "@/components/SupplierDashboard/SupplierContext";
import { SnakeLoader } from "@/components/ui/loader";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { supplier } = useSupplier();

  const { data, error, isLoading } = useSWR<{
    notifications: Notification[];
    totalNotifCount: number;
  }>(`/api/notification/${supplier.userId}?page=${currentPage}`, fetcher);

  const markAsRead = async (id: string) => {
    await fetch(`/api/notification/read`, {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-row gap-3 justify-start items-center">
          <SnakeLoader />
          Loading notifications...
        </div>
      ) : error ? (
        <div className="text-sm font-medium">
          Failed to load notifications, try again later
        </div>
      ) : data && data.notifications.length > 0 ? (
        <div className="space-y-4">
          {data.notifications.map((notification) => (
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
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {notification.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(notification.createdAt, "PPp")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm font-medium">No data available</div>
      )}

      {/* Pagination */}
      {data && (
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
            Page {currentPage} of {Math.ceil(data.totalNotifCount / 5)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(Math.ceil(data.totalNotifCount / 5), p + 1),
              )
            }
            disabled={currentPage === Math.ceil(data.totalNotifCount / 5)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
