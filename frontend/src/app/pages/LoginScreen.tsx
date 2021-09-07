import { Container, TextField, Box, Button } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { signInEndpoint } from "../services/backend";
import { ILoginScreenProps } from "../interfaces/interfaces";

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253,236,234)",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0",
  },
});

export default function LoginScreen(props: ILoginScreenProps) {
  const classes = useStyles();

  const [email, setEmail] = useState("marcus@email.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(props.onSignIn, (e) =>
      setError("Email ou senha incorretos.")
    );
  }

  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>
        Digite email e senha para entrar no sistema. Para testar, use o e-mail{" "}
        <kbd>marcus@email.com</kbd> e a senha <kbd>1234</kbd>
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
