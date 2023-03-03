import React from 'react'
import { useGetIdentity, useOne } from '@pankod/refine-core'; //get currently logged in user and their info

import { Profile } from 'components'

const MyProfile = () => {

  const { data: user } = useGetIdentity(); //get current user
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userid,
  });//more info about user from our DB

  //users profile
  const myProfile = data?.data ?? []; //get user data

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Profile 
      type='My'
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  )
}

export default MyProfile