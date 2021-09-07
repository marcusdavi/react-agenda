import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { ICalendar } from "../interfaces/interfaces";

interface ICalendarViewProps {
  calendars: ICalendar[];
  toggleCalendar: (i: number) => void;
  calendarsSelected: boolean[];
}

export default function CalendarsView(props: ICalendarViewProps) {
  const { calendars, calendarsSelected, toggleCalendar } = props;

  return (
    <Box marginTop="64px">
      <h3>Agendas</h3>
      {calendars.map((calendar, i) => (
        <div key={calendar.id}>
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: calendar.color }}
                checked={calendarsSelected[i]}
                onChange={() => toggleCalendar(i)}
              />
            }
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  );
}