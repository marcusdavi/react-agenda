import React from "react-transition-group/node_modules/@types/react";

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

export interface ICalendarProps {
  weeks: ICalendarCell[][];
  dispatch: React.Dispatch<ICalendarScreenAction>
}

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}

export interface ICalendarViewProps {
  calendars: ICalendar[];
  dispatch: React.Dispatch<ICalendarScreenAction>
  calendarsSelected: boolean[];
}

export interface ICalendarHeaderProps {
  month: string;
}

export interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}

export interface ICalendarScreenState {
  calendars: ICalendar[];
  calendarsSelected: boolean[];
  events: IEvent[];
  editingEvent: IEditingEvent | null;
}

export type ICalendarScreenAction =
  | {
      type: "load";
      payload: { events: IEvent[]; calendars?: ICalendar[] };
    }
  | {
      type: "edit";
      payload: IEvent;
    }
  | {
      type: "new";
      payload: string;
    }
    | {
      type: "closeDialog";
    }
    | {
      type: "toggleCalendar";
      payload: number;
    };