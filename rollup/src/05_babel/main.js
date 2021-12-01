// CommonJS Module
import dayjs from 'dayjs';

export function showCurrent() {
  console.log(`当前时间: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
}