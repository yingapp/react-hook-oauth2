//
// Copyright (C) 2019 Dmitry Kolesnikov
//
// This file may be modified and distributed under the terms
// of the MIT license.  See the LICENSE file for details.
// https://github.com/fogfish/react-hook-oauth2
//
import React from 'react'
import {
  PENDING,
  FAILURE,
  SUCCESS,
  OAUTH2_INTROSPECT,
} from './types'
import { useSecureLookup } from './hook'

//
// HoC: details about signed in user
export const WhoIs = Component => {
  const { status } = useSecureLookup(OAUTH2_INTROSPECT)
  return (<Component status={status} />)
  /*
  const [whois, updateState] = useState({})

  useEffect(() => {
    const ref = setInterval(
      () => {
        const t = JSON.parse(window.localStorage.getItem('access_token'))
        if (t && Object.keys(t).length !== 0) {
          clearInterval(ref)
          updateState(t)
        }
      },
      500,
    )
    return () => clearInterval(ref)
  }, [])
  return (<Component {...whois} />)
  */
}

//
// HoC: Loading and Error branch
export const WhileIO = (Loading, Recover, Component) => ({ status, ...props }) => {
  if (status instanceof PENDING) {
    return (!Loading ? null : <Loading status={status} {...props} />)
  }

  if (status instanceof FAILURE) {
    return (!Recover ? null : <Recover status={status} {...props} />)
  }

  if (status instanceof SUCCESS) {
    return <Component {...status} {...props} />
  }

  return <Component status={status} {...props} />
}
