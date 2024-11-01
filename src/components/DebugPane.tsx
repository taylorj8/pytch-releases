/* eslint-disable @typescript-eslint/no-explicit-any */

// import { IAceEditorProps } from "react-ace";
import { EmptyProps } from "../utils";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useStoreState } from "../store";
import { PytchProgramOps } from "../model/pytch-program";


const extractNames = (text: string) => {
  const separatorRegex = /(class\s)[\s\S]*?(?=class|$)/g;
  const classRegex = /class (\w+)/;
  const actors: { actor: string; scripts: string[] }[] = [];
  const scriptRegex = /def (\w+)/g;
  
  let wholeClass;
  while ((wholeClass = separatorRegex.exec(text)) !== null) {
    const className = classRegex.exec(wholeClass[0])
    const scripts: string[] = [];
    let scriptMatch;

    scriptRegex.lastIndex = 0;
    while ((scriptMatch = scriptRegex.exec(wholeClass[0])) !== null) {
      scripts.push(scriptMatch[1]);
    }
    
    if (className && scripts.length > 0) {
      actors.push({ actor: className[1], scripts: scripts });
    }
  }

  return actors;
};

export const DebugPane: React.FC<EmptyProps> = () => {

  const code = useStoreState(
    (state) => PytchProgramOps.ensureKind("DebugPane", state.activeProject.project.program, "flat")
  );

  const actors = extractNames(code.text)

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
