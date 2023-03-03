import React from "react";
import { Typography, Box, Stack } from "@pankod/refine-mui";
// Refine Hooks
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
// GetIdentity hook allows us to check if the property was created by us, or a different user
// useShow lets us pull all of the data for the property
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
// useParams lets us pull the id from the url/property
import {
  ChatBubble,
  Delete,
  Edit,
  Place,
  Phone,
  Star,
} from "@mui/icons-material";

import { CustomButton } from "components";

//check if the image is valid
function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity(); //get our current user
  const { id } = useParams(); //the ID of the current resource we are trying to view
  const { mutate } = useDelete(); //delete the current resource
  const { queryResult } = useShow(); //get the current resource. Refine checks the URL and understands we are on the /property show and then id. It then makes a call to our BE to get the data for that resource we are looking at

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {}; //get the data from the BE. Or an empty object if there is no data

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  //check if the current user is the owner of the property
  //if they are, we will show the edit and delete buttons
  //shows call and message buttons if they are not the owner
  const isCurrentUser = user.email === propertyDetails.creator.email;

  // Delete Property Handler //
  const handleDeleteProperty = () => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm('Are you sure you want to delete this property?'); //check if we want to delete the property
    if (response) {
      mutate({ //if so, use mutate to delete the property. 
        //resource: 'api/v1/properties', THIS IS WHAT IS IN THE VIDEO RANDOMLY
        resource: 'properties', //refers to the resource under properties...
        id: id as string, //with a specific id
      }, {
        onSuccess: () => {
          navigate('/properties'); //if successful, navigate back to the properties page
        },
      });
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      width="fit-content">
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Details
      </Typography>

      <Box
        display="flex"
        flex-direction={{ xs: "column", lg: "row" }}
        mt="20px"
        gap={4}>
        <Box flex={1} maxWidth={764}>
          <img
            src={propertyDetails.photo}
            alt={propertyDetails.title}
            height={546}
            style={{ borderRadius: "10px", objectFit: "cover" }}
            className="property_details-img"
          />

          <Box mt="15px">
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="space-between">
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142d"
                textTransform="capitalize">
                {propertyDetails.propertyType}
              </Typography>

              {/* Stars */}
              <Box>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={`star-${star}`}
                    sx={{
                      color: "#f2c94c",
                    }}
                  />
                ))}
              </Box>
            </Stack>

            {/* Location */}
            <Stack
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="space-between">
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color="#11142d"
                  textTransform="capitalize">
                  {propertyDetails.title}
                </Typography>

                <Stack direction="row" alignItems="center" mt={0.5} gap={0.5}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} color="#808191">
                    {propertyDetails.location}
                  </Typography>
                </Stack>
              </Box>

              {/* Price */}
              <Box>
                <Typography fontSize={16} fontWeight={600} mt="10px" color="#11142D">Price</Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">${propertyDetails.price}</Typography>
                  <Typography fontSize={14} color="#808191" mb={0.5}>for one day</Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Description */}
            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">Description</Typography>
              <Typography fontSize={14} color="#808191">
                {propertyDetails.description}
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/*  */}
        <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px">
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >

            <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
              <img
                src={checkImage(propertyDetails.creator.avatar) ? propertyDetails.creator.avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"}
                alt="avatar"
                width={90}
                height={90}
                style={{ borderRadius: '100%', objectFit: 'cover' }}
              />

              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142D">{propertyDetails.creator.name}</Typography>
                <Typography mt="5px" fontSize={14} fontWeight={400} color="#808191">Agent</Typography>
              </Box>

              <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: '#808191' }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">North Carolina, USA</Typography>
              </Stack>

              <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">{propertyDetails.creator.allProperties.length} Properties</Typography>
            </Stack>

            <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
              <CustomButton
                title={!isCurrentUser ? 'Message' : 'Edit'}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/properties/edit/${propertyDetails._id}`);
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? 'Call' : 'Delete'}
                backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>

          <Stack>
            <img
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: 'cover' }}
            />
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
