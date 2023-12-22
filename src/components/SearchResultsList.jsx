import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = (props) => {
  return (
    <div className="results-list">
      {props.results.map((result, id) => {
       return <SearchResult result={result.mname} key={id} medicineNames={props.medicineNames} setMedicineNames={props.setMedicineNames} />;
      })}
    </div>
  );
};