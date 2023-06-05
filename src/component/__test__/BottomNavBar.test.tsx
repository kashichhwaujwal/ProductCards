import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import BottomNavBar from "views/BottomNavBar";

it("renders correctly", () => {
  const tree = renderer.create(
    <Router>
      <BottomNavBar />
    </Router>
  ).toJSON;

  expect(tree).toMatchSnapshot();
});
