import React from 'react';
import ListConnector from './ListConnector';

function TestList() {
  return (
    <ListConnector>
      {({ tests }) => (
        <section>
          <ul>
            {tests.map((test, index) => (
              <li key={test.id}>
                <div>
                  <span>{`${index + 1}. `}</span>
                  {test.title}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ListConnector>
  );
}

export default TestList;
