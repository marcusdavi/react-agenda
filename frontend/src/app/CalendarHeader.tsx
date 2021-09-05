import { Avatar, Box, Icon, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { addMonths, formatMonth } from "./dateFunctions";

interface ICalendarHeader {
  month: string;
}

export default function CalendarHeader(props: ICalendarHeader) {

  const { month } = props;

  return (
    <Box display="flex" alignItems="center" padding="8px 16px">
      <Box>
        <IconButton
          aria-label="previous month"
          component={Link}
          to={"/calendar/" + addMonths(month, -1)}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          aria-label="next month"
          component={Link}
          to={"/calendar/" + addMonths(month, 1)}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>
      <Box flex="1" marginLeft="16px" component="h3">
        {formatMonth(month)}
      </Box>
      <IconButton>
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
    </Box>
  );
}
