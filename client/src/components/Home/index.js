import { Box, Container, Heading, Spinner, Table, TableContainer, Tbody, Text,Flex, Spacer, Tag, TagCloseButton, TagLabel, Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFilters } from "../../lib/hooks/useFilters";
import { FetchMovements } from "../../lib/hooks/useQuery";
import { MovementItem } from "../Table/Movement";
function Home() {

    const {filters, SetFilters} = useFilters();

    const { data, isLoading, error, isFetching, refetch } =  FetchMovements({page: 1, filter:filters});

useEffect(() => {
    refetch();
}, [])

   
    return (  <>
    <Heading fontFamily={'Manrope'}>
    <Container> <Flex spacing={30}>
   <Box>My<Text display={'inline'} color={'brand.primary'}> Overview</Text> 
    {(isLoading || isFetching) && <Spinner />}
 </Box> <Spacer />
 <Box>
 {(filters?.tags) ? <><Heading fontFamily={'Manrope'}>Filtering by Tag</Heading> <Tag
      borderRadius='full'
      variant='solid'
      colorScheme='yellow'
      color={'brand.light'}
      ml={'5px'}
    >
      <TagLabel>{filters.tags}</TagLabel>
      <TagCloseButton onClick={() => SetFilters([])} />
    </Tag></> : ''}
 </Box>
  </Flex>  </Container>
    </Heading>
    {!isLoading && <Container maxW={'100ch'}>{data.result.length > 0 ? <TableContainer><Table variant='simple'><Tbody>{data.result.map(movement => <MovementItem item={movement} />)}</Tbody></Table></TableContainer> : <Alert status='info' bg={'brand.mediumGrey'} variant='left-accent' borderColor={'brand.primary'}>
    <AlertIcon color={'brand.primary'} />
    Shoots, There's nothing to show!
  </Alert>}</Container> }
   </>
    );
}

export default Home;