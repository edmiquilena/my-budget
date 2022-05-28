
import { AddIcon, CalendarIcon, MinusIcon } from '@chakra-ui/icons';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Text, Box, Tag, TagLabel, TagLeftIcon, Icon
  } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { useFilters } from '../../lib/hooks/useFilters';
export const MovementItem = ({item}) => {
  const navigate =  useNavigate();
  const {filters, SetFilters} = useFilters();
 
    const {concept, amount, timestamp, tags, id, type}  = item;
   let date = new Date(timestamp).toLocaleDateString('EN-us', {
        day: '2-digit',
        timeZone: 'UTC',
        month: 'long',
        year: 'numeric'
      })
     const handleClick = (e, id) => {
        if(e.target.className.split(" ").includes("isTag")) return; 
    return navigate(`/view/${id}`)};
return <Tr  _hover={hover} onClick={(e) => handleClick(e, id)}>
<Td>{(type) ? <AddIcon color='brand.primary' /> : <MinusIcon color='brand.primary'  />}</Td>
<Td>{concept} <Text color='gray.500' noOfLines={1}>
<CalendarIcon /> {date}
</Text>
  <Box spacing={4} pt={'10px'}>{tags.map((tag, i) =>   <Tag 
  className='isTag'
key={tag}
onClick={() => SetFilters({tags: [tag]})}
      borderRadius='full'
      variant='solid'
      colorScheme='yellow'
      color={'brand.light'}
      ml={'5px'}
      _hover={{
        color: 'brand.mediumGrey',
        bg: 'brand.primary'
      }}
    >
     <TagLeftIcon as={CircleIcon} color='brand.darkGrey' /> <TagLabel className='isTag'>{tag}</TagLabel>
    </Tag>)}</Box></Td>
<Td isNumeric color={(type) ? '#65f44b' : '#f44b4b'}>{(type) ? '+' : '-'}${amount}</Td>
</Tr>;
}
const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )
const hover = {
    cursor: 'pointer',
    bg: 'brand.mediumGrey'
}