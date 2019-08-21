import React, { Suspense } from 'react'

export default function CommonSuspenseContianer (WrapComponent: React.ComponentType) {
  return (
    <Suspense fallback={<div>...isloading</div>}>
      <WrapComponent></WrapComponent>
    </Suspense>
  )
}





