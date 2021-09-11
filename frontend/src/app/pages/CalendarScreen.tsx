import { useParams } from "react-router";
import { Box, Button } from "@material-ui/core";
import { CalendarHeader } from "../components/CalendarHeader";
import { CalendarsView } from "../components/CalendarsView";
import { CalendarTable } from "../components/CalendarTable";
import EventFormDialog from "../components/EventFormDialog";
import { getToday } from "../helpers/dateFunctions";
import { useCalendarScreenState } from "../hooks/UseCalendarScreenState";



export default function CalendarScreen() {
  const { month } = useParams<{ month: string }>();
  const {
    weeks,
    calendars,
    calendarsSelected,
    dispatch,
    refreshEvents,
    editingEvent,
    closeDialog
  } = useCalendarScreenState(month);



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
          onClick={() => dispatch({ type: "new", payload: getToday() })}
        >
          Novo Evento
        </Button>
        <Box marginTop="64px">
          <CalendarsView
            calendars={calendars}
            dispatch={dispatch}
            calendarsSelected={calendarsSelected}
          />
        </Box>
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <CalendarHeader month={month} />
        <CalendarTable weeks={weeks} dispatch={dispatch} />
        <EventFormDialog
          event={editingEvent}
          calendars={calendars}
          onCancel={closeDialog}
          onSave={() => {
            closeDialog();
            refreshEvents();
          }}
        />
      </Box>
    </Box>
  );
}
