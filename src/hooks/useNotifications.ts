
import { useState } from 'react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Afficher avec sonner
    switch (notification.type) {
      case 'success':
        toast.success(notification.title, { description: notification.message });
        break;
      case 'error':
        toast.error(notification.title, { description: notification.message });
        break;
      case 'warning':
        toast.warning(notification.title, { description: notification.message });
        break;
      default:
        toast.info(notification.title, { description: notification.message });
    }
  };

  const notifyStageChange = (candidateName: string, fromStage: string, toStage: string) => {
    addNotification({
      title: 'Candidat déplacé',
      message: `${candidateName} a été déplacé de "${fromStage}" vers "${toStage}"`,
      type: 'info'
    });
  };

  const notifyRecruiterAssigned = (recruiterName: string, jobTitle: string) => {
    addNotification({
      title: 'Recruteur affecté',
      message: `${recruiterName} a été affecté à l'offre "${jobTitle}"`,
      type: 'success'
    });
  };

  return {
    notifications,
    addNotification,
    notifyStageChange,
    notifyRecruiterAssigned
  };
};
