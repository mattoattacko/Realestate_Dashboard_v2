import React from 'react'
import { EmailOutlined, LocationCity, Phone, Place } from '@mui/icons-material';
import { useGetIdentity } from '@pankod/refine-core'; //get currently logged in user
import { Box, Stack, Typography } from '@pankod/refine-mui'
import { Link } from '@pankod/refine-react-router-v6'; //redirect to users profile page

import { AgentCardProp, InfoBarProps } from 'interfaces/agent'

//info bar component since we are using it multiple times
const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack
    direction="row"
    flex={1}
    minWidth={{ xs: '100%', sm: 300 }}
    gap={1.5}
  >
    {icon}
    <Typography
      fontSize={14}
      color="#808191"
    >
      {name}
    </Typography>
  </Stack>
);

const AgentCard = ({ id, name, email, avatar, numOfProperties }: AgentCardProp) => {

  const { data: currentUser } = useGetIdentity(); //get current user

  //logic to generate link to agent profile page
  const generateLink = () => {
    if(currentUser.email === email) return '/my-profile' //if its the current user, link to my profile page

    return `/agents/show/${id}` //else link to agents profile page
  }



  return (
    <Box
      component={Link}
      to={generateLink()} // link to specific agent
      width="100%"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '20px',
        padding: '20px',
        '&:hover': {
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)',
        }
      }}
    >
      <img 
        src={avatar}
        alt='user'
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: 'cover' }}
      />
      <Stack
        direction="column"
        justifyContent="space-between"
        flex={1}
        gap={{ xs: 4, sm: 2}}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          gap={2}
        >
          <Typography
            fontSize={22}
            fontWeight={600}
            color="#11142d"
          >
            {name}
          </Typography>

          <Typography
            fontSize={14}
            color="#808191"
          >
            Agent
          </Typography>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <InfoBar 
            icon={<EmailOutlined sx={{color: '#808191'}} />}
            name={email}
          />          
          <InfoBar 
            icon={<Place sx={{color: '#808191'}} />}
            name="Seattle"
          />          
          <InfoBar 
            icon={<Phone sx={{color: '#808191'}} />}
            name="425-555-5555"
          />          
          <InfoBar 
            icon={<LocationCity sx={{color: '#808191'}} />}
            name={`${numOfProperties} Properties`}
          />
        </Stack>
      </Stack>
    </Box>
  )
}

export default AgentCard