import "./index.css";
import {
  Button,
  Divider,
  Heading,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function App() {
  const [counterPass, setCounterPass] = useState(0);
  const [counterProgressModule, setCounterProgressModule] = useState(0);
  const [counterExclude, setCounterExclude] = useState(0);
  const [counterRetriever, setCounterRetriever] = useState(0);

  const [passValue, setPassValue] = useState("0");
  const [deferValue, setDeferValue] = useState("0");
  const [failValue, setFailValue] = useState("0");
  const [outcome, setOutcome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast({
    title: "Incorrect Total",
    description: "Your total credits should equal up to 120",
    status: "error",
    duration: 9000,
    isClosable: true,
  });

  function calculateOutcome() {
    let sum = Number(passValue) + Number(deferValue) + Number(failValue);
    if (sum !== 120 || sum < 120) {
      return toast.apply();
    }

    setIsLoading(true);
    setTimeout(() => {
      onOpen();
      if (Number(passValue) === 120) {
        setOutcome("Progress");
        setCounterPass(counterPass + 1);
      } else if (Number(passValue) === 100) {
        setOutcome("Progress - Module Trailer");
        setCounterProgressModule(counterProgressModule + 1);
      } else if (Number(passValue) <= 20 && Number(failValue) >= 80) {
        setOutcome("Exclude");
        setCounterExclude(counterExclude + 1);
      } else {
        setOutcome("Do Not Progress - Module Retriever");
        setCounterRetriever(counterRetriever + 1);
      }
      setIsLoading(false);
    }, 2000);

    // setIsLoading(false);
  }

  return (
    <>
      <section className="bg-slate-950 w-screen h-screen flex flex-col items-center font-sans text-white p-8 justify-evenly">
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay backdropFilter="auto" backdropBlur="4px" />
          <ModalContent>
            <ModalHeader>Your Progression Outcome Is:</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{outcome}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <div className="text-center">
          <Heading className="text-2xl">
            University progression outcome calculator
          </Heading>
          <h1 className="mt-4">
            developed by{" "}
            <Link href="https://github.com/mahdiuahmed" target="_blank">
              <Button>mahdi ahmed</Button>
            </Link>
          </h1>
        </div>

        <RadioGroup onChange={setPassValue} value={passValue}>
          <Heading className="underline">Pass Credits</Heading>
          <Stack direction="row">
            <Radio value="0">0</Radio>
            <Radio value="20">20</Radio>
            <Radio value="40">40</Radio>
            <Radio value="60">60</Radio>
            <Radio value="80">80</Radio>
            <Radio value="100">100</Radio>
            <Radio value="120">120</Radio>
          </Stack>
        </RadioGroup>
        <RadioGroup onChange={setDeferValue} value={deferValue}>
          <Heading className="underline">Defer Credits</Heading>
          <Stack direction="row">
            <Radio value="0">0</Radio>
            <Radio value="20">20</Radio>
            <Radio value="40">40</Radio>
            <Radio value="60">60</Radio>
            <Radio value="80">80</Radio>
            <Radio value="100">100</Radio>
            <Radio value="120">120</Radio>
          </Stack>
        </RadioGroup>
        <RadioGroup onChange={setFailValue} value={failValue}>
          <Heading className="underline">Fail Credits</Heading>
          <Stack direction="row">
            <Radio value="0">0</Radio>
            <Radio value="20">20</Radio>
            <Radio value="40">40</Radio>
            <Radio value="60">60</Radio>
            <Radio value="80">80</Radio>
            <Radio value="100">100</Radio>
            <Radio value="120">120</Radio>
          </Stack>
        </RadioGroup>
        <Button
          onClick={calculateOutcome}
          isLoading={isLoading}
          loadingText="Calculating"
        >
          Calcualte Outcome
        </Button>
      </section>
    </>
  );
}
