import { ContextProvider } from "./context/contextapi";
import { Index } from "./component/index";
const App = () => {
  return (
    <ContextProvider>
      <Index />
    </ContextProvider>
  );
};

export default App;
