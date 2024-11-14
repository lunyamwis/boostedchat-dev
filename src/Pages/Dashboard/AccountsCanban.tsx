import React, { useState } from "react";
import {
  Grid,
  Container,
  ScrollArea,
  Box,
  Title,
  Stack
} from "@mantine/core";
import AccountCard from "./AccountCard";
import AccountDrawer from "./AccountDrawer";

export function AccountsCanban() {
  const columnTitles = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<{
    username: string;
    assignedTo: string;
    lastMsgSentAt: string;
    msgSentBy: string;
  } | null>(null);

  const openDrawer = (messageDetails: {
    username: string;
    assignedTo: string;
    lastMsgSentAt: string;
    msgSentBy: string;
  }) => {
    setSelectedMessage(messageDetails);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedMessage(null);
  };



  return (
    <Container fluid style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} >
      <Grid justify="center" style={{ flex: 1 }} align="stretch" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
        {/* <Grid.Col span={{ base: 12, md: 6, lg: 3 }}
          style={{ backgroundColor: '#dee2e6', padding: '10px', borderRadius: '8px' }}
        >
          <AccountCard username="Denn" assignedTo="robot" lastMsgSentAt="12:03" msgSentBy="robot"></AccountCard>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <AccountCard username="Denn" assignedTo="robot" lastMsgSentAt="12:03" msgSentBy="robot"></AccountCard>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <AccountCard username="Denn" assignedTo="robot" lastMsgSentAt="12:03" msgSentBy="robot"></AccountCard>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <AccountCard username="Denn" assignedTo="robot" lastMsgSentAt="12:03" msgSentBy="robot"></AccountCard>
        </Grid.Col> */}
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid.Col
            key={index}
            span={{ base: 12, md: 6, lg: 3 }}
            style={{
              backgroundColor: ['#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6'][index],
              padding: '10px',
              borderRadius: '8px',
              height: '100vh'
            }}
          >
            {/* Sticky Title */}
            <Box style={{
              position: 'sticky',
              top: 0, backgroundColor: ['#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6'][index],
              zIndex: 1,
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <Title order={4} >Stage x</Title>
            </Box>
            <ScrollArea style={{ height: '100%' }}>
              <Stack gap="sm">
                {Array.from({ length: 20 }).map((_, cardIndex) => (
                  <AccountCard
                    key={cardIndex}
                    username={`User ${cardIndex + 1}`}
                    assignedTo={cardIndex % 2 === 0 ? 'robot' : 'person'}
                    lastMsgSentAt={`12:${cardIndex < 10 ? `0${cardIndex}` : cardIndex}`}
                    msgSentBy={cardIndex % 2 === 0 ? 'robot' : 'person'}
                    onClick={() => openDrawer({
                      username: `User ${cardIndex + 1}`,
                      assignedTo: cardIndex % 2 === 0 ? 'robot' : 'person',
                      lastMsgSentAt: `12:${cardIndex < 10 ? `0${cardIndex}` : cardIndex}`,
                      msgSentBy: cardIndex % 2 === 0 ? 'robot' : 'person'
                    })}
                  />
                ))}
              </Stack>
            </ScrollArea>
          </Grid.Col>
        ))}

      </Grid>
      {/* Message Drawer */}
      <AccountDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        messageDetails={selectedMessage}
      />
    </Container>

  )
}