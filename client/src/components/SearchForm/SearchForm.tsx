import "./SearchForm.css";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";

type SearchFormProps = {
  className: string;
  onSubmit?: () => void;
  placeholder: string;
};

const SearchForm = ({ className, onSubmit, placeholder }: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="searchForm__div">
        <InputField
          className={className}
          placeholder={placeholder}
          type="search"
        />
        <Button buttonName="Search" className="button searchButton" />
      </div>
    </form>
  );
};

export default SearchForm;
