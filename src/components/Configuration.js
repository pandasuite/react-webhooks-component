import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import PandaBridge from 'pandasuite-bridge';
import { Alert } from 'pandasuite-bridge-react/lib/ui';

import ReactJson from 'react-json-view';

import {
  ClipboardCopyIcon, LinkIcon,
} from '@heroicons/react/solid';

function Configuration(props) {
  const intl = useIntl();
  const [state, setState] = useState({
    token: undefined,
    error: false,
  });
  const [effect, setEffect] = useState(false);
  const { properties, data } = props;
  const {
    [PandaBridge.UNIQUE_ID]: unitId,
    [PandaBridge.PANDASUITE_HOST_WITH_SCHEME]: host,
  } = properties;

  useEffect(() => {
    fetch(`${host}api/tokens/${unitId}`, {
      credentials: 'include',
    }).then(async (response) => {
      if (response.ok) {
        const body = await response.json();
        setState({ token: body.token });
      } else {
        setState({ error: intl.formatMessage({ id: 'request.error.generic' }) });
      }
    }).catch(() => {
      setState({ error: intl.formatMessage({ id: 'request.error.generic' }) });
    });
  }, [host, unitId, intl]);

  const webhookLink = `${host}mo/hooks/${unitId}/${state.token}/dataReceived`;

  return (
    <>
      {state.error && (
        <Alert className="mb-5" type="danger">{state.error}</Alert>
      )}
      {state.token && (
      <div>
        <span className="block text-sm font-medium text-gray-700">
          {intl.formatMessage({ id: 'span.title' })}
        </span>
        <div className="mt-1 mb-3 flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="email"
              id="email"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
              value={webhookLink}
            />
          </div>
          <button
            type="button"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            onClick={() => { navigator.clipboard.writeText(webhookLink); setEffect(true); }}
          >
            <ClipboardCopyIcon
              className={`${
                effect && 'animate-ping-single'
              } h-5 w-5 text-gray-400`}
              aria-hidden="true"
              onAnimationEnd={() => setEffect(false)}
            />
          </button>
        </div>
        {data ? (
          <ReactJson
            src={data}
            name={false}
            onAdd={false}
            onEdit={false}
            onDelete={false}
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
          />
        ) : (
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
      </div>
      )}
    </>
  );
}

Configuration.propTypes = {
  properties: PropTypes.oneOfType([PropTypes.object]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Configuration;
