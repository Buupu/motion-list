import React, { useState } from "react";
import {
  ChakraProvider,
  theme,
  Flex,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import { PersonModal } from "./modal/person";
import { useForm } from "react-hook-form";
import { PersonCard } from "./components/personCard";
import { AnimatePresence } from "framer-motion";

const defaultState = [
  { name: "Sammy", email: "sammy@gmail.com" },
  { name: "John", email: "john@gmail.com" },
  { name: "Ryan", email: "rrryan@gmail.com" },
  { name: "Adam", email: "theAdam@gmail.com" },
  { name: "Daniel", email: "Daniel@gmail.com" },
];

export const App = () => {
  const [people, setPeople] = useState<PersonModal[]>(defaultState);
  const { handleSubmit, register, reset } = useForm();

  const addPeople = (personToAdd: PersonModal) => {
    if (!people.some((person) => person.email === personToAdd.email)) {
      const tempPeople = [...people];
      tempPeople.unshift(personToAdd);
      setPeople(tempPeople);
      reset();
    }
  };

  const removePeople = () => {
    const tempPeople = [...people];
    tempPeople.shift();
    setPeople(tempPeople);
  };

  const sortByEmail = () => {
    const tempPeople = [...people];

    tempPeople.sort((personA, personB) =>
      personA.email.localeCompare(personB.email)
    );

    setPeople(tempPeople);
  };

  const sortByName = () => {
    const tempPeople = [...people];

    tempPeople.sort((personA, personB) =>
      personA.name.localeCompare(personB.name)
    );

    setPeople(tempPeople);
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex p={6}>
        <form onSubmit={handleSubmit(addPeople)}>
          <VStack w={300} spacing={4} mr={12}>
            <Input placeholder="name" {...register("name")} required></Input>
            <Input
              placeholder="email"
              type="email"
              {...register("email")}
              required
            ></Input>
            <Button colorScheme="teal" type="submit" width="100%">
              Submit
            </Button>
            <Button colorScheme="orange" width="100%" onClick={sortByName}>
              Sort by name
            </Button>
            <Button colorScheme="orange" width="100%" onClick={sortByEmail}>
              Sort by email
            </Button>
            <Button colorScheme="red" width="100%" onClick={removePeople}>
              Remove
            </Button>
          </VStack>
        </form>
        <VStack w={400} spacing={6}>
          <AnimatePresence>
            {people.map((person) => {
              return <PersonCard key={person.email} person={person} />;
            })}
          </AnimatePresence>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};
