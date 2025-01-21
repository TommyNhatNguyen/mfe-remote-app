import React from 'react';
import Page from 'app/components/LayoutComponents/Page';
import { RemoteProvider, useRemoteContext } from 'app/remoteContext';
import { useSelector, Provider } from 'react-redux';
import store from 'app/store';
function AppWrapper(props) {
  return (
    <Provider store={store}>
      <RemoteProvider>
        <App {...props} />
      </RemoteProvider>
    </Provider>
  );
}

function App(props) {
  const { store, selectors } = useRemoteContext();
  console.log('🚀 ~ App ~ store:', store);
  const shopDetail = useSelector(selectors.getShop);
  console.log('🚀 ~ App ~ store:', shopDetail);
  return (
    <Page>
      <h1>Hello</h1>
    </Page>
  );
}

export default AppWrapper;
