import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Textarea,
    Select,
    SelectField,
    HStack,
    Tag,
    TagLabel,
    TagCloseButton,
    IconButton,
    VStack,
  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { AddIcon } from '@chakra-ui/icons';
import API from '../../lib/API';
function CreateMovement() {
    const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
const [isLoading, SetIsLoading] = useState(false)
  const onSubmit = async({concept, type, date}) => {
    SetIsLoading(true);
  type = type == 1
try {
 let create = await API.post("/movement", {
    concept,
    amount,
    tags,
    type,
    date
},
{
    headers: {
      'Authorization': `JWT ${localStorage.AuthToken}`
    }
  })
  navigate("/")
} catch(e) {

}
  SetIsLoading(false);
  } 
   const [type, setType] = useState(true)
  const format = (val) => ` $` + val
  const parse = (val) => val.replace(/^\$/, '')

  const [amount, setAmount] = useState('0.00')
  const [tags, setTags] = useState([])

  const [Taginput, setTaginput] = useState('')

  const onChange = ({ target}) =>  setTaginput(target.value.replace(/\s/g, ''))
 

  const AddTag = () => {
    const trimmed = Taginput.trim().toLowerCase(); 
  
    if (tags.length < 6 && trimmed.length && !tags.includes(trimmed)) {
      setTags(prevState => [...prevState,trimmed]);
      setTaginput('');
    }
  };
const removeTag = (i) =>  setTags(prevState => prevState.filter(v => v !== i) );
    return ( <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    <Box
  
      bg={'brand.mediumGrey'}
      boxShadow={'lg'}
      p={8}>
      <Stack spacing={4}>
        <FormControl id="amount">
          <FormLabel>Amount</FormLabel>
          <NumberInput defaultValue={0} min={0.1} step={0.1} precision={2}  onChange={(amount) => setAmount(parse(amount))}
      value={format(amount)}>
  <NumberInputField  {...register("amount", { required: true })} />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
   
        </FormControl>
        <FormControl id="concept">
          <FormLabel>Concept</FormLabel>
          <Textarea {...register("concept", { required: true })} placeholder="Bought doggo food" ></Textarea>
        
        </FormControl>
        <FormControl id="type">
          <FormLabel>Type</FormLabel>
          <Select  onChange={(t) => setType(t == 1)} {...register("type", { required: true })}>
          <option value={1}>Income</option>
              <option value={0}>Expense</option>
          </Select>
        
        </FormControl>
        <FormControl id="concept">
          <FormLabel>Date</FormLabel>
          <Input {...register("date", { required: true })}  type="date"/>
        
        </FormControl>
         <FormControl>
<FormLabel>Tags</FormLabel>
<VStack spacing={4}>
<HStack spacing={4}><Input  type="text"  value={Taginput}
    placeholder={tags.length > 4 ? "Max. 5 tags" : "Enter a tag"}
     onChange={onChange}
     isDisabled={tags.length > 4}
    ></Input> {tags.length < 5 && <IconButton onClick={() => AddTag()} aria-label='Add' icon={<AddIcon />} size={'sm'} /> }
            </HStack>
         
            <Box spacing={4} align='center' >{tags.map((tag, i) =>   <Tag
key={tag}
      borderRadius='full'
      variant='solid'
      colorScheme='yellow'
      color={'brand.light'}
      ml={'5px'}
    >
      <TagLabel>{tag}</TagLabel>
      <TagCloseButton onClick={() => removeTag(tag)}/>
    </Tag>)}</Box>
    </VStack>
        </FormControl>
        <Stack spacing={10} >
         
          <Button
        isLoading={isLoading}
        onClick={handleSubmit(onSubmit)}
        >
            Save
          </Button>
         
        </Stack>
      </Stack>
    </Box>
  </Stack> );
}

export default CreateMovement;