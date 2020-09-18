import React, { useState, useEffect } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);
  useEffect(() => {
    setChecked([]);
  }, [props.reset]);
  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value)}
          style={{ margin: "0.5rem" }}
          type="checkbox"
          checked={Checked.indexOf(value) === -1 ? false : true}
        >
          {value.name}
        </Checkbox>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header={props.name} key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
