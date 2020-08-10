import React, { Fragment } from 'react';

import './Layout.css';

const layout = props => (
  <Fragment>
    <header className="main-header">{props.header}</header>
  
    <main className="content">{props.children}</main>
  </Fragment>
);

export default layout;
