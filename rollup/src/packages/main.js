import dayjs from 'dayjs';

export default function () {
  console.log('当前时间: ' + dayjs().format('YYYY-MM-DD HH:mm:ss'));
}