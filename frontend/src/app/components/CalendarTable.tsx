import { Box, Icon, Table, TableBody, TableCell } from "@material-ui/core";
import { TableContainer, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { getToday } from "../helpers/dateFunctions";
import { ICalendar, IEvent } from "../interfaces/interfaces";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const useStyles = makeStyles({
  table: {
    borderTop: "1px solid rgb(224, 224, 224)",
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": {
      borderLeft: "1px solid rgb(224, 224, 224)",
    },
    "& td": {
      verticalAlign: "top",
      overflow: "hidden",
      padding: "8px 4px",
    },
  },
  dayOfMonth: {
    display: "inline-block",
    width: "24px",
    lineHeight: "24px",
    fontWeight: 500,
    marginBottom: "4px",
    borderRadius: "50%",
    "&.today": { 
      backgroundColor: "#3f51b5",
      color: "white" 
    },
  },
  event: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: "4px 0",
  },
  eventBackground: {
    display: "inline-block",
    color: "white",
    padding: "2px 4px",
    borderRadius: "4px",
  },
});

interface ICalendarProps {
  weeks: ICalendarCell[][];
  onClickDay: (date: string) => void;
  onClickEvent: (event: IEvent) => void;
}

export default function CalendarTable(props: ICalendarProps) {
  const { weeks } = props;
  const classes = useStyles();

  function handleClick(evt: React.MouseEvent, date: string) {
    if (evt.target === evt.currentTarget) {
      props.onClickDay(date);
    }
  }

  return (
    <TableContainer style={{ flex: "1" }} component={"div"}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map((day, index) => {
              return (
                <TableCell align="center" key={index}>
                  {day}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, i) => (
            <TableRow key={i}>
              {week.map((cell) => {
                return (
                  <TableCell
                    align="center"
                    key={cell.date}
                    onClick={(mEvent) => handleClick(mEvent, cell.date)}
                  >
                    <div
                      className={
                        classes.dayOfMonth +
                        (cell.date === getToday() ? " today" : "")
                      }
                    >
                      {cell.dayOfMonth}
                    </div>
                    {cell.events.map((event) => {
                      const color = event.calendar.color;
                      return (
                        <button
                          key={event.id}
                          className={classes.event}
                          onClick={() => props.onClickEvent(event)}
                        >
                          {event.time && (
                            <>
                              <Icon style={{ color }} fontSize="inherit">
                                watch_later
                              </Icon>
                              <Box component="span" margin="0 4px">
                                {event.time}
                              </Box>
                            </>
                          )}
                          {event.time ? (
                            <span>{event.desc}</span>
                          ) : (
                            <div
                              className={classes.eventBackground}
                              style={{ backgroundColor: color }}
                            >
                              {event.desc}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}
