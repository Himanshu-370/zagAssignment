import React from "react";
import { Button, Space } from "antd";

function Heading() {
  return (
    <React.Fragment>
      <div className="heading-box"> 
        <div className="heading-content">
          <h2>Orders</h2>

          <Space wrap>
            <Button type="primary">+ Add Order</Button>
          </Space>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Heading;
