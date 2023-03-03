import React from 'react'
import { Box, Typography, Stack } from '@pankod/refine-mui'
import ReactApexChart from 'react-apexcharts'
import { ArrowCircleUpRounded } from '@mui/icons-material'

import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config'

const TotalRevenue = () => {
  return (
    <Box
      id='chart'
      display='flex'
      flexDirection='column'
      flex={1}
      p={4}
      bgcolor='#fcfcfc'
      borderRadius="15px"    
    >
      <Typography
        fontSize={18}
        fontWeight={600}
        color='#11142d'
      >
        Total Revenue
      </Typography>

      <Stack
        direction='row'
        my='20px'
        flexWrap='wrap'
        gap={4}
      >
        <Typography
          fontSize={28}
          fontWeight={700}
          color='#11142d'
        >
          $444,400
        </Typography>

        <Stack 
          direction='row'
          alignItems='center'
          gap={1}
        >
          <ArrowCircleUpRounded 
            sx={{ 
              fontSize: 25,
              color: '#475be8', 
            }}
          />

          <Stack>
            <Typography
              fontSize={15}
              color='#475be8'
            >
              12.5%
            </Typography>            
            
            <Typography
              fontSize={12}
              color='#475be8'
            >
              Than Last Quarter
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart 
        series={TotalRevenueSeries}
        type='bar'
        height={310}
        options={TotalRevenueOptions}
      />
      
    </Box>
  )
}

export default TotalRevenue