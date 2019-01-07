import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  let AppWrapper;

  beforeEach(() => {
    AppWrapper = shallow(<App />);
  });

  it(`App should render without crashing.`, () => {
    expect(AppWrapper.length).toBe(1);
  });

  it("should have a div container class name App.", () => {
    expect(AppWrapper.find(".App").length).toEqual(1);
  });
});
