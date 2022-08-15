import { showNotification } from '@mantine/notifications';

export const showError = (message: string) => {
  showNotification({ title: "Ошибка!", message: message, color: "red" })
}