import React from 'react'
import { useList } from '@pankod/refine-core' //quickly fetch a list of users
import { Box, Typography } from '@pankod/refine-mui'

import { AgentCard } from 'components'

const Agents = () => {

  const { data, isLoading, isError } = useList({
    resource: 'users', //pass the resource we want to get
    // resource: 'api/v1/users',
  })

  //get agents
  const allAgents = data?.data ?? [];

  // console.log(allAgents)

  if(isLoading) return <Box>Loading...</Box>
  if(isError) return <Box>Error</Box>

  return (
    <Box>
      <Typography 
        fontSize={25}
        fontWeight={700}
        // color="primary" //primary color seems to be light green
        // color='#3f51b5' is a purpleish color
        color="#11142d"
      >
        Agent List
      </Typography>

      <Box
        mt="20px"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#fcfcfc',
        }}
      >
        {/* dynamic list of all agents. For each agent we return an AgentCard */}
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            numOfProperties={agent.allProperties.length}           
          />
        ))}
      </Box>
    </Box>
  )
}

export default Agents