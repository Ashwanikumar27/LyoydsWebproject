import React from "react";
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

import Autocomplete from "./Autocomplete";

jest.mock("./utils/api");

const mockedFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      id: "1",
      title: 'hello'
    }),
  })
);

global.fetch = mockedFetch;

describe("Autocomplete", () => {
  it("renders correctly", () => {
    render(<Autocomplete />);

    const input = screen.getByRole('textbox', {placeholder: /search for a product/i})
    
    expect(input).toBeInTheDocument();
  });

  it("searching in text box gives suggestion list", async () => {
    render(<Autocomplete />);

    const input = screen.getByRole('textbox', {placeholder: /search for a product/i});
    fireEvent.change(input, {target: {value: "fj"}});
    
    await screen.getByTestId('suggestions').toBeInTheDocument();
  });

});
