import React from 'react'
import { Link } from 'react-router-dom';
import {
    Box,
    Card,
    CardBody,
    Heading,
    List,
    ListItem,
    Badge
} from '@chakra-ui/react';

export default function SelectedUniversity({ selectedUniversity }) {

    return (
        <Box marginTop={4}>
            <Card borderRadius={0} marginTop={4} w={'100%'}>
                <CardBody>
                    {!selectedUniversity && (
                        <Box>
                            <Heading as={'h3'} fontSize={'xs'} fontWeight={'bold'}>
                                Select a university
                            </Heading>
                        </Box>
                    )}
                    {selectedUniversity && (
                        <Box>
                            <Heading as={'h3'} fontSize={'xs'} fontWeight={'bold'}>
                                {selectedUniversity?.name}
                            </Heading>
                            <List>
                                <ListItem>
                                    <Badge>
                                        Website: <Link to={selectedUniversity?.website} target={'_blank'}>To Website</Link>
                                    </Badge>
                                </ListItem>
                                <ListItem>
                                    <Badge>
                                        Location: <Link to={selectedUniversity?.location} target={'_blank'}>To Location</Link>
                                    </Badge>
                                </ListItem>
                                <ListItem>
                                    <Badge>
                                        Country's Capital: {selectedUniversity?.countryCapital}
                                    </Badge>
                                </ListItem>
                                <ListItem>
                                    <Badge>
                                        Currency: {selectedUniversity?.currency.GBP?.symbol || selectedUniversity?.currency.USD?.symbol}
                                    </Badge>
                                </ListItem>
                                <ListItem>
                                    <Badge>
                                        Language: {selectedUniversity?.language}
                                    </Badge>
                                </ListItem>
                                <ListItem>
                                    <Badge>
                                        Population: {selectedUniversity?.population}
                                    </Badge>
                                </ListItem>
                            </List>
                        </Box>
                    )}
                </CardBody>
            </Card>
        </Box>
    )
}
