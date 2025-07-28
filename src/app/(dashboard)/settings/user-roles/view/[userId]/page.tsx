'use client';

import React from 'react'
import ViewRole from './ViewRole'
import { useParams } from 'next/navigation';
const MainPage = () => {
const searchParams = useParams();
  return (
    <div>
      <ViewRole roleId={searchParams?.userId} />
    </div>
  )
}

export default MainPage

