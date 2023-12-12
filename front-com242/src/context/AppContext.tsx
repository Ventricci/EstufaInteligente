import { createContext, useState } from 'react';

export interface IUserApiData {
  auth: boolean;
  token: string;
  id: number;
  name: string;
  cpf: string;
  email: string;
  role: 'Administrator' | 'Client';
  photo: string;
  greenhouses: number[];
}

interface IDevicesData {
  id: number;
  name: string;
  category: 'sensor' | 'activation';
  status: boolean;
  deleted: boolean;
  serial: string;
  greenhousesid: number;
}

export interface GreenhouseData {
  id: number;
  name: string;
  idealtemperature: number | null;
  idealhumidty: number | null;
  usersid: number;
  addressesid: number;
  deleted: boolean;
}

interface IAppContextProps {
  deviceStatus: boolean;
  setStateDeviceStatus: (value: boolean) => void;
  active: boolean;
  setStateActive: (value: boolean) => void;
  activeGreenhouseId: number;
  setStateActiveGreenhouseId: (value: number) => void;
  UserApiData: IUserApiData;
  setStateUserApiData: (value: IUserApiData) => void;
  token: string;
  setStateToken: (value: string) => void;
  devicesData: IDevicesData[];
  setStateDevicesData: (value: IDevicesData[], shouldPush?: boolean) => void;
  userGreenhouses: GreenhouseData[];
  setStateUserGreenhouses: (value: GreenhouseData[], shouldPush?: boolean) => void;
}

export const AppContext = createContext({} as IAppContextProps);

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [deviceStatus, setDeviceStatus] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [activeGreenhouseId, setActiveGreenhouseId] = useState<number>(0);
  const [UserApiData, setUserApiData] = useState<IUserApiData>({
    auth: false,
    token: '',
    id: 0,
    name: '',
    cpf: '',
    email: '',
    role: 'Client',
    photo: '',
    greenhouses: [],
  });
  const [token, setToken] = useState<string>('');
  const [devicesData, setDevicesData] = useState<IDevicesData[]>([]);
  const [userGreenhouses, setUserGreenhouses] = useState<GreenhouseData[]>([]);

  function setStateDeviceStatus(value: boolean) {
    setDeviceStatus(value);
  }

  function setStateActive(value: boolean) {
    setActive(value);
  }

  function setStateActiveGreenhouseId(value: number) {
    setActiveGreenhouseId(value);
  }

  function setStateUserApiData(value: IUserApiData) {
    setUserApiData(value);
  }

  function setStateToken(value: string) {
    setToken(value);
  }

  function setStateDevicesData(value: IDevicesData[], shouldPush: boolean = false) {
    if (shouldPush) {
      setDevicesData((prev) => [...prev, ...value]);
    } else {
      setDevicesData(value);
    }
  }

  function setStateUserGreenhouses(value: GreenhouseData[], shouldPush: boolean = false) {
    if (shouldPush) {
      setUserGreenhouses((prev) => [...prev, ...value]);
    } else {
      setUserGreenhouses(value);
    }
  }

  return (
    <AppContext.Provider
      value={{
        deviceStatus,
        setStateDeviceStatus,
        active,
        setStateActive,
        activeGreenhouseId,
        setStateActiveGreenhouseId,
        UserApiData,
        setStateUserApiData,
        token,
        setStateToken,
        devicesData,
        setStateDevicesData,
        userGreenhouses,
        setStateUserGreenhouses,
      }}
    >
      { children }
    </AppContext.Provider>
  );
}
