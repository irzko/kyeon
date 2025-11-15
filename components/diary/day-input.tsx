import { Input } from "@chakra-ui/react";
import { format } from "date-fns";

export default function DayInput() {
  return (
    <Input
      type="datetime-local"
      rounded="xl"
      bg="gray.900"
      outline="none"
      id="date"
      name="date"
      defaultValue={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
      required
    ></Input>
  );
}
