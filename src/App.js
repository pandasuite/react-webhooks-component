import React, { useState, useEffect } from 'react';
import PandaBridge from 'pandasuite-bridge';
import { usePandaBridge } from 'pandasuite-bridge-react';

import socketIOClient from 'socket.io-client';
import fnv1a from '@sindresorhus/fnv1a';

import Configuration from './components/Configuration';

require('isomorphic-fetch');

function App() {
  const { properties, setProperty } = usePandaBridge();
  const {
    [PandaBridge.UNIQUE_ID]: unitId,
    [PandaBridge.PANDASUITE_HOST_WITH_SCHEME]: host,
    uniqueId,
  } = properties || {};
  const [data, setData] = useState();

  useEffect(() => {
    if (unitId && host) {
      const socket = socketIOClient(host, { path: '/mo/socket.io' });

      socket.on(fnv1a(uniqueId || unitId).toString(16), (raw) => {
        const { name, body = {} } = raw || {};

        if (name) {
          PandaBridge.send(PandaBridge.UPDATED, {
            queryable: body,
          });
          PandaBridge.send(name, [body]);
          setData(body);
        }
      });
      return () => { socket.disconnect(); };
    }
    return () => {};
  }, [uniqueId, unitId, host]);

  useEffect(() => {
    if (unitId && !uniqueId) {
      setProperty("uniqueId", unitId.substring(1));
    }
  }, [uniqueId, unitId]);

  if (properties === undefined || !PandaBridge.isStudio) {
    return null;
  }

  return (
    <Configuration
      properties={properties}
      data={data}
    />
  );
}

export default App;
