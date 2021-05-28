import Container from '@material-ui/core/Container';
import Lobby from './web/lobby/Lobby';
import { makeStyles } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Gameplay from './web/gameplay/Gameplay';

const useStyles = makeStyles(() => ({
  root: {
    height: '90vh',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Container fixed maxWidth={'md'} className={classes.root}>
      <Router>
        <Switch>
          <Route exact path={'/match/:matchID'}>
            <Gameplay />
          </Route>

          <Route exact path={'/'}>
            <Lobby />
          </Route>

          <Route path={'*'}>
            <Redirect to={'/'} />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
