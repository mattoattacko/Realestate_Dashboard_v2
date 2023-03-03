import React, { useMemo } from "react";

import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core"; //hook that lets us do pagination, sorting, filtering, etc.
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";

//Components
import { PropertyCard, CustomButton } from "components";

//must be capitalized because it's a component
const AllProperties = () => {
  const navigate = useNavigate();

  // we destructured the data, isLoading, isFetching, and error from the useTable hook for our PropertyCard component
  // kinda confusing. Check 2:37:30 in the video
  const {
    tableQueryResult: { data, isLoading, isError },
    current, //current page
    setCurrent, //function to set the current page
    setPageSize, //change number of elements per page
    pageCount, //total number of pages
    sorter, //sorter object
    setSorter, //function to set the sorter
    filters, //filters object
    setFilters, //function to set the filters
  } = useTable();

  const allProperties = data?.data ?? []; //ensures if we dont have the data, we default get an empty array so we dont get an error

  //to sort the price, we need to know what is the current price
  const currentPrice = sorter?.find((item) => item.field === "price")?.order; //if we have a sorter, we want to find the price field and get the order

  //with the above, we can now create a function to sort the price
  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]); //if the current price is ascending, we want to set it to descending. Else, we want to set it to ascending
  }

  //filter by title
  // flatMap is a special JS structure that lets us loop through an array of objects and return a new array of objects
  //if the field in the item is equal to title, we want to return the item. Else, we want to return an empty array
  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => (
      'field' in item ? item : []
    ));

    //filter everything by title
    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || '', 
      propertyType: logicalFilters.find((item) => item.field === "propertyType")?.value || '',
    }
  }, [filters])

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {/* if no properties, show dynamic string. Else show all properties */}
            {!allProperties.length ? "No Properties Found" : "All Properties"}
          </Typography>

          <Box
            mb={2}
            mt={3}
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            width="84%">

            <Box
              display="flex"
              flexWrap="wrap"
              gap={2}
              mb={{ xs: "20px", sm: 0 }}>

              <CustomButton
                title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />

              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])
                }}
              />

              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }} //this is for accessibility            
                defaultValue=""
                value={currentFilterValues.propertyType}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'propertyType',
                      operator: 'eq', //equal to
                      value: e.target.value
                    }
                  ], 'replace') //replace the existing filters with the one we clicked
                }}
              >

                <MenuItem value="">
                  All
                </MenuItem>
                {["House", "Apartment", "Condo", "Townhouse", "Villa", "Farmhouse", "Duplex", "Studio", "Chalet"].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}

              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton
          title="Add Property"
          handleClick={() => navigate("/properties/create")}
          icon={<Add />}
          backgroundColor="#475be8"
          color="#fcfcfc"
        />
      </Stack>

      {/* Property Card */}
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* map over our properties */}
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>

      {/* Pagination */}
      {/* first check if there are any properties left to paginate. If so, show pagination */}
      {allProperties.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)} //when we set state using previous state, we need to pass in a callback function. Here we simply decrease the number of pages by 1
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === 1} //if we are on the first page, disable the button
            // disabled={!(current > 1)} //same as above
          />

          {/* Only visible on Lrg devices */}
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px">
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>

          {/* Next Page Button*/}
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount} //if we are on the last page, disable the button
          />
          
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }} //this is for accessibility
            defaultValue={10}
            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
          >

            {/* map over items */}
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
