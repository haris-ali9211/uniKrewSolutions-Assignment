// import nativeBase
import { AlertDialog, Button, Center, Badge } from 'native-base';

const Alert = ({ cancelRef, onClose, isOpen }) => {
    return (
        <Center>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    {/* <AlertDialog.Header>Checkout</AlertDialog.Header> */}
                    <AlertDialog.Body>
                        Are you sure you want to checkout
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={onClose}>
                                Yes
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    )
}

const BadgeIcon = ({ number }) => {
    return (
        <Badge // bg="red.400"
            colorScheme="danger" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                fontSize: 11
            }}>
            {number}
        </Badge>
    )
}

export { Alert, BadgeIcon }