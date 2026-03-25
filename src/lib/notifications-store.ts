export const notifications = [
  {
    id: "1",
    type: "new_application",
    title: "Новая заявка",
    message: "Иванов Иван подал заявку на секцию",
    read: false,
    createdAt: new Date().toISOString(),
    link: "/dashboard/applications/new",
  },
  {
    id: "2",
    type: "status_change",
    title: "Изменение статуса",
    message: "Заявка Петрова Петра изменена",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    link: "/dashboard/applications/2",
  },
];

export function addNotification(data: any) {
  const newNotification = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    read: false,
    ...data,
  };
  notifications.unshift(newNotification);
  return newNotification;
}

export function markAsRead(id: string) {
  const index = notifications.findIndex((n) => n.id === id);
  if (index !== -1) {
    notifications[index].read = true;
    return notifications[index];
  }
  return null;
}

export function markAllAsRead() {
  notifications.forEach((n) => {
    n.read = true;
  });
  return notifications;
}
