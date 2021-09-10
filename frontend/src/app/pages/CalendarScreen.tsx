import { Box, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCalendarsEndpoint, getEventsEndpoint } from "../services/backend";
import {  ICalendar,  IEvent,  IEditingEvent} from "../interfaces/interfaces"
import CalendarHeader from "../components/CalendarHeader";
import CalendarsView from "../components/CalendarsView";
import CalendarTable from "../components/CalendarTable";
import { getToday } from "../helpers/dateFunctions";
import EventFormDialog from "../components/EventFormDialog";

export default function CalendarScreen() {
  const { month } = useParams<{ month: string }>();
  const [editingEvent, setEditingEvent] = useState<IEditingEvent | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);

  const weeks = generateCalendar(
    month + "-01",
    events,
    calendars,
    calendarsSelected
  );
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([
      getCalendarsEndpoint(),
      getEventsEndpoint(firstDate, lastDate),
    ]).then(([calendars, events]) => {
      setCalendarsSelected(calendars.map(() => true));
      setCalendars(calendars);
      setEvents(events);
    });
  }, [firstDate, lastDate]);

  function refreshEvents() {
    getEventsEndpoint(firstDate, lastDate).then(setEvents);
  }

  function toggleCalendar(index: number) {
    const newValue = [...calendarsSelected];
    newValue[index] = !newValue[index];
    setCalendarsSelected(newValue);
  }

  function openNewEvent(date: string) {
    setEditingEvent({
      date: date,
      desc: "",
      calendarId: calendars[0].id,
    });
  }

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224, 224, 224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button
          color="primary"
          variant="contained"
          onClick={() => openNewEvent(getToday())}
        >
          Novo Evento
        </Button>
        <Box marginTop="64px">
          <CalendarsView
            calendars={calendars}
            toggleCalendar={toggleCalendar}
            calendarsSelected={calendarsSelected}
          />
        </Box>
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <CalendarHeader month={month}/>
        <CalendarTable
          weeks={weeks}
          onClickDay={openNewEvent}
          onClickEvent={setEditingEvent}
        />
        <EventFormDialog
          event={editingEvent}
          calendars={calendars}
          onCancel={() => setEditingEvent(null)}
          onSave={() => {
            setEditingEvent(null);
            refreshEvents();
          }}
        />
      </Box>
    </Box>
  );
}

type IEventWithCalendar = IEvent & { calendar: ICalendar };

interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  calendarsSelected: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "T12:00:00");
  const currentMonth = jsDate.getMonth();
  const currentDay = new Date(jsDate);

  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();

  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < 7; i++) {
      const yearStr = currentDay.getFullYear();
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");
      const isoDate = `${yearStr}-${monthStr}-${dayStr}`;

      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calendarIndex = calendars.findIndex(
            (cal) => cal.id === event.calendarId
          );
          if (calendarsSelected[calendarIndex]) {
            events.push({ ...event, calendar: calendars[calendarIndex] });
          }
        }
      }
      week.push({
        dayOfMonth: currentDay.getDate(),
        date: isoDate,
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);
  return weeks;
}
