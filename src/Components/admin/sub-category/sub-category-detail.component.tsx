import { Card, Col, List, Row, Typography } from "antd";
import { useSubCategory } from "hooks/sub-category.hook";
import React from "react";

const SubCategoryDetailComponent: React.FC = () => {
  const { subCategory } = useSubCategory();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: subCategory.id,
          },
          {
            label: "Name",
            value: subCategory.name,
          },
          {
            label: "Slug",
            value: subCategory.slug,
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col md={4}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={20}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SubCategoryDetailComponent;
