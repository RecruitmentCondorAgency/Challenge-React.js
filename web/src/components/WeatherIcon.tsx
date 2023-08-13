import { weatherType } from '../types/weather';
import {
  ClearIcon,
  CloudyIcon,
  PCloudyIcon,
  RainIcon,
  SnowIcon,
  TSIcon,
  TSRainIcon,
} from './Icons';

type WeatherIconProps = {
  weatherType: weatherType;
};

const WeatherIcons: Record<weatherType, typeof ClearIcon> = {
  clear: ClearIcon,
  cloudy: CloudyIcon,
  pcloudy: PCloudyIcon,
  rain: RainIcon,
  snow: SnowIcon,
  ts: TSIcon,
  tsrain: TSRainIcon,
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherType }) => {
  const Icon = WeatherIcons[weatherType] || WeatherIcons['clear'];
  return (
    <div className='flex flex-col gap-2 mx-2 my-1 items-center justify-center'>
      <Icon className='h-8 w-8' />
      {weatherType}
    </div>
  );
};
