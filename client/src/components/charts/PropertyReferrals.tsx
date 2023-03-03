import React from 'react'
import { Typography, Box, Stack } from '@pankod/refine-mui'

import { propertyReferralsInfo } from 'constants/index'

//since we are using TS, we need to define this as an interface
interface ProgressBarProps {
  title: string,
  percentage: number,
  color: string,
}

const ProgressBar = ({ title, percentage, color}: ProgressBarProps) => (
  <Box width="100%">
    <Stack 
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Typography fontSize={16} fontWeight={500} color='#11142d'>
        {title}
      </Typography>

      <Typography fontSize={16} fontWeight={500} color='#11142d'>
        {percentage}%
      </Typography>
    </Stack>

    <Box
        position='relative'
        mt={2}
        height='8px'
        width='100%'
        borderRadius={1}
        bgcolor='#e4e8ef'
      >
        <Box
          width={`${percentage}%`}
          bgcolor={color}
          position='absolute'
          height='100%'
          borderRadius={1}
        />
      </Box>
  </Box>
)

const PropertyReferrals = () => {
  return (
    <Box
      id='chart'
      display='flex'
      flexDirection='column'
      p={4}
      bgcolor='#fcfcfc'
      borderRadius="15px"
      minWidth={490}
    >
       <Typography
        fontSize={18}
        fontWeight={600}
        color='#11142d'
      >
        Property Referrals
      </Typography>

      <Stack
        direction='column'
        my='20px'
        gap={4}
      >
        {/* we loop over the referrals info array, get each individual bar, and for each bar return a <ProgressBar/> component. We pass in the key and spread the rest of the bar properties */}
        {propertyReferralsInfo.map((bar) => 
          <ProgressBar key={bar.title} {...bar} />
        )}
      </Stack>

      
    </Box>
  )
}

export default PropertyReferrals