import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import MagicInput from '@/components/ui/MagicInput';

interface InventorySearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InventorySearch: React.FC<InventorySearchProps> = ({
  value,
  onChange,
}) => {
  return (
    <InputGroup maxW="130px">
      <MagicInput
        h="35px"
        color="white"
        fontSize="sm"
        value={value}
        onChange={onChange}
        px={8}
      />
      {value.trim() === '' && (
        <InputRightElement h="35px" px={2}>
          <SearchIcon color="white" boxSize={4} />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default InventorySearch;
