import { Provider } from "react-redux"
import Navigation from "./pages/Navigation"
import store from "./store/Store"

export default App = ()=>{


  return<Provider store={store}>
    <Navigation />
  </Provider>
}