import React from 'react'
import { useOne } from '@pankod/refine-core'; 
import { useParams } from '@pankod/refine-react-router-v6'; //get currently logged in user and their info

import { Profile } from 'components'

const AgentProfile = () => {

  const { id } = useParams(); //get agent id from url
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });//more info about user from our DB

  //users profile
  const myProfile = data?.data ?? []; //get user data

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Profile 
      type='Agent'
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  )
}

export default AgentProfile