import SplashScreen from './components/splash-Screen-01/Screen';
import {OpulentSipsProvider} from './context/OpulentSips';

function App() {
  return (
    <>
      <OpulentSipsProvider>
        <SplashScreen />
      </OpulentSipsProvider>
    </>
  );
}

export default App;
