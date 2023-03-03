import React from 'react'
import { Box, Typography, Stack } from '@pankod/refine-mui'
import ReactApexChart from 'react-apexcharts'

// interface for TS
import { PieChartProps } from 'interfaces/home'

//we need to specify these props are a type PieChartProps
const PieChart = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <Box
      id='chart'
      display='flex'
      flex={1}
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      bgcolor='#fcfcfc'
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width='fit-content'
    >
      <Stack direction='column'>
        <Typography fontSize={14} color='#808191'>
          {title}
        </Typography>        
        
        <Typography fontSize={24} color='#11142d' mt={1}>
          {value}
        </Typography>
      </Stack>

      <ReactApexChart 
        options={{
          chart: { type: 'donut' },
          colors, //technically its colors: colors, but since the key and value are the same, we can just write colors
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type='donut'
        width="120px"
      />
    </Box>
  )
}

export default PieChart