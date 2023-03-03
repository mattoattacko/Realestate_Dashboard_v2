import React, { useState } from 'react'
import { useGetIdentity } from '@pankod/refine-core' //hooks allows us to get the user relate props we need
import { FieldValues, useForm } from '@pankod/refine-react-hook-form' //allows us to use the form
import { useNavigate } from '@pankod/refine-react-router-v6' //allows us to navigate to other pages

import Form from 'components/common/Form' //our form component

const CreateProperty = () => {

  const navigate = useNavigate()
  const { data: user } = useGetIdentity() //get the user data
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' }) //need to be able to store our state in an image

  //everything else besides the image will be handled by...
  // onFinish to know when the form is finished. 
  //formLoading to know when the form is loading
  //register to register every input or text field
  //handleSubmit to handle the form submission and send to server
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm() 

  //get file and read the data from it
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    //once we read it we are setting it to state
    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));
  };
  
  //using Refine we are passing all the data that we're getting from the form and finally submitting it so our backend can create a record in the database
  //first access all the data from the form "data: FieldValues". Then we check if there is no "propertyImage.name".If there isn't it means the user hasn't uploaded an image and we return an alert.
  //if we do have an image, we can "await onFinish" (from Refine) and pass everything to it (an object inside of which we can spread all the data from inputs, a photo, url, email, etc). All of this comes from Refine's "userIdentity" hook.
  const onFinishHandler = async (data: FieldValues) => {
    if(!propertyImage.name) return alert('Please select an image');
    
    await onFinish({ ...data, photo: propertyImage.url, email: user.email }) //where we pass our data
  };

  return (
    <Form 
      type="Create" //type of form
      register={register} //register the form
      onFinish={onFinish} //when the form is finished
      formLoading={formLoading} //when the form is loading
      handleSubmit={handleSubmit} //handle the form submission
      handleImageChange={handleImageChange} //handle the image change
      onFinishHandler={onFinishHandler} //handle the form submission
      propertyImage={propertyImage} //the property image
    />
  )
}

export default CreateProperty