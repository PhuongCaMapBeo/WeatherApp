import morningImage from '../assets/images/morning.jpg';
import afternoonImage from '../assets/images/afternoon.jpg';
import nightImage from '../assets/images/night.jpg';
import rainImage from '../assets/images/rain.jpg';
import stormImage from '../assets/images/storm.jpg';
import darkImage from '../assets/images/dark.jpg';

export const backgroundGenerator = (curTime, code) => {
  if (checkCode([1000, 1003, 1150, 1153], code)) return getDayTime(curTime);
  else if (
    checkCode(
      [1063, 1066, 1069, 1072, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
      code,
    )
  )
    return rainImage;
  else if (checkCode([1087], code)) return stormImage;
  else if (checkCode([1009, 1030, 1222, 1237, 1249, 1255, 1261], code))
    return darkImage;
  else return '';
};
const getDayTime = curTime => {
  const curHour = parseInt(curTime.substr(11, 2));
  if (curHour >= 6 && curHour <= 11) {
    return morningImage;
  } else if (curHour >= 12 && curHour <= 17) return afternoonImage;
  else return nightImage;
};

const checkCode = (arr, code) => {
  return arr.filter(value => value === code);
};

export const windType = type => {
  let windName;
  switch (type) {
    case 'S':
      windName = 'Gió Nam';
      break;
    case 'SSE':
      windName = 'Gió Nam Đông Nam';
      break;
    case 'SE':
      windName = 'Gió Đông Nam';
      break;
    case 'E':
      windName = 'Gió Đông';
      break;
    case 'ENE':
      windName = 'Gió Đông Đông Bắc';
      break;
    case 'NE':
      windName = 'Gió Đông Bắc';
      break;
    case 'NNE':
      windName = 'Gió Bắc Đông Bắc';
      break;
    case 'N':
      windName = 'Gió Bắc';
      break;
    case 'NW':
      windName = 'Gió Tây Bắc';
      break;
    case 'WNW':
      windName = 'Gió Tây Tây Bắc';
      break;
    case 'W':
      windName = 'Gió Tây';
      break;
    case 'WSW':
      windName = 'Gió Tây Tây Nam';
      break;
    case 'SW':
      windName = 'Gió Tây Nam';
      break;
    case 'SSW':
      windName = 'Gió Nam Tây Nam';
      break;
    default:
      windName = 'Gió không xác định';
  }
  return windName;
};
