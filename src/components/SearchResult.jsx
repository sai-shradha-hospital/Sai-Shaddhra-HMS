import "./SearchResult.css";


export const SearchResult = (props) => {

  const handleAddMedicine = () => {
    props.setMedicineNames([...props.medicineNames, props.result]);
    props.result("");
  };

  return (
    <div
      className="search-result"
      onClick={handleAddMedicine}
    >
      {props.result}
    </div>
  );
};