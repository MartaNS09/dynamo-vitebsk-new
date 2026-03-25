export async function createNotification(notification: {
  type: 'new_application' | 'status_change' | 'new_comment' | 'system';
  title: string;
  message: string;
  link?: string;
  data?: any;
}) {
  try {
    const res = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    });
    return await res.json();
  } catch (error) {
    console.error('Ошибка создания уведомления:', error);
  }
}

// Создание уведомления о новой заявке
export async function notifyNewApplication(application: any) {
  return createNotification({
    type: 'new_application',
    title: 'Новая заявка',
    message: `${application.name} подал(а) заявку на секцию "${application.sport || 'не указана'}"`,
    link: `/dashboard/applications/${application.id}`,
    data: { applicationId: application.id }
  });
}

// Создание уведомления об изменении статуса
export async function notifyStatusChange(applicationId: string, oldStatus: string, newStatus: string, userName: string) {
  return createNotification({
    type: 'status_change',
    title: 'Изменение статуса заявки',
    message: `Статус заявки ${userName} изменен с "${oldStatus}" на "${newStatus}"`,
    link: `/dashboard/applications/${applicationId}`,
    data: { applicationId, oldStatus, newStatus }
  });
}
