import React from 'react';
import Page from 'app/components/LayoutComponents/Page';
import { RemoteProvider, useRemoteContext } from 'app/remoteContext';
function AppWrapper(props) {
  return (
    <RemoteProvider>
      <App {...props} />
    </RemoteProvider>
  );
}

function App(props) {
  const { store } = useRemoteContext();
  console.log('🚀 ~ App ~ store:', store);
  return (
    <Page>
      <h1>Hello</h1>
    </Page>
  );
}

export default AppWrapper;
