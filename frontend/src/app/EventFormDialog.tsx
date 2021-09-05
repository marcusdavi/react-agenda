import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Box, InputLabel } from "@material-ui/core";
import { createEventEndpoint, deleteEventEndpoint } from "./backend";
import { ICalendar, IEditingEvent, updateEventEndpoint } from "./backend";
import { useEffect, useRef, useState } from "react";

interface IEventFormDialogProps {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onSave: () => void;
  onCancel: () => void;
}

interface IValidationErrors {
  [field: string]: string;
}

export default function EventFormDialog(props: IEventFormDialogProps) {
  const [event, setEvent] = useState<IEditingEvent | null>(props.event);
  const [errors, setErrors] = useState<IValidationErrors>({});
  const inputDate = useRef<HTMLElement | null>();
  const inputDesc = useRef<HTMLElement | null>();

  useEffect(() => {
    setEvent(props.event);
    setErrors({});
  }, [props.event]);

  const isNewEvent = !event?.id;

  function save(evt: React.FormEvent) {
    evt.preventDefault();
    if (event) {
      if (validate()) {
        if (isNewEvent) {
          createEventEndpoint(event).then(props.onSave);
        } else {
          updateEventEndpoint(event).then(props.onSave);
        }
      }
    }
  }

  function deleteEvent() {
    if (event) {
      deleteEventEndpoint(event.id!).then(props.onSave);
    }
  }

  function validate() {
    if (event) {
      const currentErrors: IValidationErrors = {};
      if (!event.date) {
        currentErrors["date"] = "A data deve ser preenchida";
        inputDate.current?.focus();
      }
      if (!event.desc) {
        currentErrors["desc"] = "A descrição deve ser preenchida";
        inputDesc.current?.focus();
      }
      setErrors(currentErrors);
      return Object.keys(currentErrors).length === 0;
    } else {
      return false;
    }
  }

  return (
    <div>
      <Dialog
        open={!!event}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={save}>
          <DialogTitle id="form-dialog-title">
            {isNewEvent ? "Criar evento" : "Editar evento"}
          </DialogTitle>
          <DialogContent>
            {event && (
              <>
                <TextField
                  inputRef={inputDate}
                  type="date"
                  margin="normal"
                  label="Data"
                  fullWidth
                  value={event.date}
                  onChange={(evt) =>
                    setEvent({ ...event, date: evt.target.value })
                  }
                  error={!!errors.date}
                  helperText={errors.date}
                />
                <TextField
                  inputRef={inputDesc}
                  autoFocus
                  margin="normal"
                  label="Descrição"
                  fullWidth
                  value={event.desc}
                  onChange={(e) => setEvent({ ...event, desc: e.target.value })}
                  error={!!errors.desc}
                  helperText={errors.desc}
                />
                <TextField
                  type="time"
                  margin="normal"
                  label="Hora"
                  fullWidth
                  value={event.time ?? ""}
                  onChange={(e) => setEvent({ ...event, time: e.target.value })}
                />
                <FormControl margin="normal" fullWidth>
                  <InputLabel id="select-calendar">Agenda</InputLabel>
                  <Select
                    labelId="select-calendar"
                    value={event.calendarId}
                    onChange={(e) =>
                      setEvent({
                        ...event,
                        calendarId: e.target.value as number,
                      })
                    }
                  >
                    {props.calendars.map((calendar) => (
                      <MenuItem key={calendar.id} value={calendar.id}>
                        {calendar.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {!isNewEvent && (
              <Button type="button" onClick={deleteEvent}>
                Excluir
              </Button>
            )}
            <Box flex="1"></Box>
            <Button type="button" onClick={props.onCancel}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
