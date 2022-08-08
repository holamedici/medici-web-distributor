import {  useParams } from "react-router-dom";

function Code() {
  let params = useParams();
  return (
    <div
     className="main"
    >
      <div>
        <h1 className="generalTitle">user id: {params.code.split("|||")[0]}</h1>
        <h1 className="generalTitle">amount: {params.code.split("|||")[1]}</h1>

      </div>
    </div>
  );
}
export default Code;
