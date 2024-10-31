/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO replace with actual implementation

import React, { createContext, createElement, useContext } from "react";
import { EmptyProps, failIfNull } from "../utils";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const actors = [
  { actor: "Bowl", scripts: ["move_with_keys"] },
  { actor: "Apple", scripts: ["move_down_stage"] },
  { actor: "ScoreKeeper", scripts: ["initialise", "award_point", "drop_apples"] }
];

export const DebugPane: React.FC<EmptyProps> = () => {
  return (
    <div className="DebugPane">
      <h1>Choose a script to debug</h1>
      <div className="card-container">
        {actors.map(({ actor, scripts }) => (
          <Card>
            <Card.Body>
              <Card.Title>{actor}</Card.Title>
              {scripts.map((script) => (
                <Button className="DebugScriptButton">{script}</Button>
              ))}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
