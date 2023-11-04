import { Button, Card, Col, Divider, Row, Typography } from "antd";
import GridView from "components/product/product-card-grid.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage: React.FC = () => {
  const { cartItems, findMatchingProducts } = useShoppingCart();
  const { products } = useProduct();
  const router = useNavigate();

  const matchingProducts = findMatchingProducts(products, cartItems);

  const handleCheckout = () => {
    router("/payment/checkout");
  };
  return (
    <GeneralAppShell>
      <div style={{ padding: "0 2rem" }}>
        <Row gutter={[8, 16]} style={{ marginTop: 50, padding: "0 1rem" }}>
          <Col span={24}>
            <Typography.Title
              level={2}
              style={{ textAlign: "center", opacity: 0.89 }}
            >
              Shopping Cart
            </Typography.Title>
            <Typography.Paragraph
              style={{ fontWeight: "bold", marginBottom: 0 }}
            >
              {cartItems.length} in Cart
            </Typography.Paragraph>
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          </Col>
          <Col xs={22} md={16}>
            {cartItems && cartItems.length > 0 ? (
              <GridView products={matchingProducts} resultProducts={[]} />
            ) : (
              <NoContent title="Your shopping cart is empty at the moment" />
            )}
          </Col>
          <Col xs={22} md={8}>
            <Card
              bordered={false}
              title={
                <>
                  <Typography.Title
                    style={{ marginBottom: 0, opacity: 0.78 }}
                    level={5}
                  >
                    Total Amount:{" "}
                  </Typography.Title>
                  <Typography.Title
                    style={{ marginBottom: 0, marginTop: 0 }}
                    level={3}
                  >
                    {matchingProducts
                      .map((p) => p.amount)
                      .reduce((a, b) => a + b)}{" "}
                    {" XAF"}
                  </Typography.Title>
                </>
              }
            >
              <Button
                type="primary"
                onClick={handleCheckout}
                htmlType="button"
                size="large"
                block
              >
                Checkout
              </Button>
            </Card>
          </Col>
        </Row>
        <Col span={24} style={{ marginTop: 50 }}>
          <Typography.Title level={3} style={{ textAlign: "center" }}>
            You may also like
          </Typography.Title>
          <Divider style={{ marginTop: 0 }} />
        </Col>
        {products && products.length > 0 ? (
          <GridView products={products} resultProducts={[]} />
        ) : (
          <NoContent title="Your shopping cart is empty at the moment" />
        )}
      </div>
    </GeneralAppShell>
  );
};

export default ShoppingCartPage;
