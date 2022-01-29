import { useQuery, gql } from "@apollo/client";
//import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = () => {
  const params = useParams();
  const flight = params.flight_number.slice(1);
  const flight_number = parseInt(flight);
  console.log(flight_number);
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });
  if (loading) return <p>Loading</p>;
  if (error) return console.log(error);
  const {
    mission_name,
    launch_year,
    launch_success,
    launch_date_local,
    rocket: { rocket_id, rocket_name, rocket_type },
  } = data.launch;

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:{mission_name}</span>
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Flight Number: {flight_number}</li>
        <li className="list-group-item">Launch Date: {launch_date_local}</li>
        <li className="list-group-item">Launch Year: {launch_year}</li>
        <li className="list-group-item">
          Launch Successful:{" "}
          <span
            className={classNames({
              "text-success": launch_success,
              "text-danger": !launch_success,
            })}
          >
            {launch_success ? "Yes" : "No"}
          </span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {rocket_id}</li>
        <li className="list-group-item">Rocket Name: {rocket_name}</li>
        <li className="list-group-item">Rocket Type: {rocket_type}</li>
      </ul>
      <hr />
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
};
export default Launch;
