import { Avatar, Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { PersonModal } from "../modal/person";
import { motion } from "framer-motion";

export const PersonCard = memo(
  ({ person }: { person: PersonModal }) => {
    const MotionFlex = motion(Flex);
    return (
      <MotionFlex
        py={3}
        px={3}
        borderRadius="md"
        bg="teal.50"
        w="full"
        borderLeft="2px"
        borderColor="teal.500"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        layout
      >
        <HStack spacing={3}>
          <Avatar />
          <Box>
            <Heading fontSize={18} color="teal.900">
              {person.name}
            </Heading>
            <Text color="teal.700">{person.email}</Text>
          </Box>
        </HStack>
      </MotionFlex>
    );
  },
  (next, prev) => next.person === prev.person
);
