import React from 'react';

import AddUser from './AddUser';

const MainPage = ({ searchParams }: any) => {
  return (
    <div>
      <AddUser searchParams={searchParams} />
    </div>
  );
};

export default MainPage;
