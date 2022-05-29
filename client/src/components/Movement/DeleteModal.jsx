import React from 'react';
import {
    Button,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import API from '../../lib/API';
import {BsFillTrashFill} from 'react-icons/bs'
const DeleteModal = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate() 
    const deleteMovement = async() => {  
        try {
        let create = await API.delete(`/movement/${id}`,
       {
           headers: {
             'Authorization': `JWT ${localStorage.AuthToken}`
           }
         })
         navigate("/");
       } catch(e) {
       
       }
    }

    return (
      <>
       
        <IconButton onClick={onOpen} icon={<BsFillTrashFill />} size={'sm'} />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={'brand.darkGrey'}>
            <ModalHeader>Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>You're about to delete this movement from your budget. Are you sure?
            </ModalBody>
  
            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={deleteMovement}>
              Yes, Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default DeleteModal;