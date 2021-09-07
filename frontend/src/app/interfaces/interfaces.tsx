export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string; // ?: => opcional
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
}

export interface ICalendarScreenProps extends IUserMenuProps{}
  
export interface IUserMenuProps {
  user: IUser;
  onSignOut: () => void;
}

export interface ICalendarHeaderProps extends IUserMenuProps {
  month: string;
}
