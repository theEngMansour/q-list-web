import * as React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function RTL(props) {
  return (
    <CacheProvider value={cacheRtl}>
      {props.children}
    </CacheProvider>
  );
}
