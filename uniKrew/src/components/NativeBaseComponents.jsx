// import nativeBase
import {AlertDialog, Button, Center, Badge, Box} from 'native-base';

const Alert = ({cancelRef, onClose, isOpen, navigation}) => {
  const handelFlow = () => {
    onClose;
    navigation.navigate('Checkout');
  };

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          {/* <AlertDialog.Header>Checkout</AlertDialog.Header> */}
          <AlertDialog.Body>Are you sure you want to checkout</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={handelFlow}>
                Yes
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

const BadgeIcon = ({number}) => {
  return (
    <Badge // bg="red.400"
      colorScheme="danger"
      rounded="full"
      mb={-4}
      mr={-4}
      zIndex={1}
      variant="solid"
      alignSelf="flex-end"
      _text={{
        fontSize: 11,
      }}>
      {number}
    </Badge>
  );
};

const Actionsheet = ({isOpen, onOpen, onClose}) => {
  return (
    <Center>
      <Button onPress={onOpen}>Actionsheet</Button>

      <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export {Alert, BadgeIcon, Actionsheet};
