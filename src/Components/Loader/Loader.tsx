import React from "react";

export class Loader extends React.Component<
  Record<string, unknown>,
  Record<string, unknown>
> {
  render(): JSX.Element {
    return (
      <div data-testid="loader_block">
        <p>Loading...</p>
      </div>
    );
  }
}
