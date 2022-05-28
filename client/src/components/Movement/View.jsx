import React, { useEffect, useState } from 'react';
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
    Spinner,
  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { AddIcon } from '@chakra-ui/icons';
import API from '../../lib/API';
import {BsFillTrashFill} from 'react-icons/bs'
import { FetchMovement } from '../../lib/hooks/useQuery';
function ViewMovement() {
    const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
const [isSaving, SetisSaving] = useState(false)

const {id} = useParams();
const { data, isLoading, error, isFetching, refetch } =  FetchMovement(id);
  const onSubmit = async({concept, type, date}) => {
    SetisSaving(true);
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
  SetisSaving(false);
  } 
//   data:
// amount: "10.10"
// concept: "prueb22a"
// createdAt: "2022-05-28T18:10:52.043Z"
// creator: "c4c7a814-bf44-4279-8b9b-19798c69e1f2"
// id: "bcf1d9b0-03f1-4533-b42d-3c8b0bcd5b47"
// tags: (2) ['groceries', 'pets']
// timestamp: "2022-05-28T00:00:00.000Z"
// type: true



   const [type, setType] = useState(true)
  const format = (val) => ` $` + val
  const parse = (val) => val.replace(/^\$/, '')

  const [amount, setAmount] = useState('0.00')
  const [tags, setTags] = useState([])

  const [Taginput, setTaginput] = useState('')


  useEffect(() => {
    if(data?.data && !isLoading) {
       setTags(data.data.tags)
       setAmount(data.data.amount);
       setType(data.data.type)
    }
  
  }, [data])
  

  const onChange = ({ target}) =>  setTaginput(target.value.replace(/\s/g, ''))
 

  const AddTag = () => {
    const trimmed = Taginput.trim().toLowerCase(); 
  
    if (tags.length < 6 && trimmed.length && !tags.includes(trimmed)) {
      setTags(prevState => [...prevState,trimmed]);
      setTaginput('');
    }
  };
const removeTag = (i) =>  setTags(prevState => prevState.filter(v => v !== i) );
    return (<>  {(isLoading || isFetching) && <Spinner />} {!isLoading && <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
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
          <Textarea {...register("concept", { required: true })} placeholder="Bought doggo food" defaultValue={data.data.concept} ></Textarea>
        
        </FormControl>
        <FormControl id="type">
          <FormLabel>Type</FormLabel>
         <Text fontSize={'1.2em'}>{(type) ? 'Income' : 'Expense'}</Text>
        
        </FormControl>
        <FormControl id="date">
          <FormLabel>Date</FormLabel>
          <Input {...register("date", { required: true })}  type="date" defaultValue={new Date(data.data.timestamp).toISOString().substr(0,10)}/>
        
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
        <HStack spacing={4}>
         
          <Button
        isLoading={isSaving}
        onClick={handleSubmit(onSubmit)}
        >
            Save
          </Button>
          <IconButton  icon={<BsFillTrashFill />} size={'sm'} />
        </HStack>
      </Stack>
    </Box>
  </Stack>} </>);
}

export default ViewMovement;