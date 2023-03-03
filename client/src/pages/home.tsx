import React from 'react'
import { useList } from '@pankod/refine-core' //most important Refine hook that allows us access to a specific resource (eg: properties, users, etc.)
import { Typography, Box, Stack } from '@pankod/refine-mui'
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from 'components'

const Home = () => {

  //useList hook is used to fetch a list of resources from the API. In this case, we are fetching a list of properties.
  const { data, isLoading, isError } = useList({
    resource: 'properties',
    config: {
      pagination: {
        pageSize: 4 //we only want to fetch 4 properties
      }
    }
  })

  //pull data from the data object
  const latestProperties = data?.data ?? []; //if data is undefined (so we dont have any data), then set it to an empty array

  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Oh heck something went wrong!</Typography>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142D' >
        Dashboard
      </Typography>

      <Box display="flex" mt="20px" flexWrap="wrap" gap={4}>
        <PieChart 
          title="Properties for Sale"
          value={44}
          series={[75, 25]} //series is the %s of the pie chart
          colors={['#275be8', '#c4e8ef']}
        />        
        <PieChart 
          title="Properties for Rent"
          value={123}
          series={[60, 40]}
          colors={['#FF5733', '#c4e8ef']}
        />        
        <PieChart 
          title="Total Customers"
          value={1234}
          series={[75, 25]}
          colors={['#5A8D1D', '#c4e8ef']}
        />        
        <PieChart 
          title="Cities"
          value={4}
          series={[75, 25]}
          colors={['#9C06CE', '#c4e8ef']}
        />
      </Box>

      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        mt="25px"
        width="100%"
        gap={4}
      >
        {/* Charts */}
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>


{/* The rest of this was added after all of the other sections were complete. See other code or video of how we got here so youre not just copy/pasting stuff. */}

        {/* Properties */}
        <Box
          display="flex"
          flex={1}
          borderRadius='15px'
          padding="20px"
          mt="25px"
          bgcolor='#fcfcfc'
          flexDirection="column"
          minWidth='100%'
        >
          <Typography
            fontSize='18px'
            fontWeight={600}
            color='#11142D'
          >
            Latest Properties
          </Typography>

          {/* Container Box for Properties */}
          <Box>
            {latestProperties.map((property) => (
              <PropertyCard 
                key={property._id} 
                id={property._id}
                title={property.title}
                location={property.location}
                price={property.price}
                photo={property.photo}
              />
            ))}
          </Box>
        </Box>
    </Box>
  )
}

export default Home