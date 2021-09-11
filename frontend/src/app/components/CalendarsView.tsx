import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import { ICalendarViewProps } from "../interfaces/interfaces";

export const CalendarsView = React.memo(function (props: ICalendarViewProps) {
  const { calendars, calendarsSelected } = props;

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
                onChange={() =>
                  props.dispatch({ type: "toggleCalendar", payload: i })
                }
              />
            }
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  );
});
