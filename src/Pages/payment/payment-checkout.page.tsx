import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useEffect, useState } from "react";
import "./checkout.style.scss";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import { useProduct } from "hooks/product.hook";
import { ProcessPaymentService } from "services/process-payment.service";
import {
  IInitPayment,
} from "models/init-payment.model";
import BackButton from "components/shared/back-button.component";
import CheckoutSummaryComponent from "components/product/checkout-summary.component";
import { useNavigate } from "react-router-dom";
import { useInitTransaction } from "hooks/shopping-cart/init-transaction.hook";

export const PageCheckoutPage = () => {
  const [form] = Form.useForm();
  const [mode, setMode] = useState("mtn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const { products } = useProduct();
  const { cartItems, findMatchingProducts, cartQuantity } = useShoppingCart();
  const { setInitTransaction, setActiveInitPayment } = useInitTransaction();
  const matchingProducts = findMatchingProducts(products, cartItems);
  const totalAmount =
    matchingProducts.map((p) => p.amount).reduce((a, b) => a + b) || 0;

  const onFinish = async (values: any) => {
    setLoading(true);
    const obj: IInitPayment = {
      // amount: `${totalAmount}`,
      amount: `5`,
      operator: mode,
      telephone: values.telephone,
      name: values.name,
      email: values.email,
      address: values.address,
    };
    const feedback = await ProcessPaymentService.initPayment(obj)
      .then((response) => {
        debugger
        setInitTransaction(response.data);
        return true;
      })
      .catch((error) => {
        console.log("error: ", error);
        setError(error);
        return false;
      });

      setActiveInitPayment(obj);

    if (feedback) {
      message.success("Payment Successful!");
      navigate("/payment-feedback");
    } else {
      message.error(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const onChange = (event: RadioChangeEvent) => {
    event.preventDefault();
    setMode(event.target.value);
  };

  useEffect(() => {}, [mode]);

  return (
    <GeneralAppShell>
      <Row className="checkout-container">
        <Col xs={24} md={14} className="checkout-form">
          <BackButton title="Shopping Cart" />
          <Typography.Title level={2}>Checkout</Typography.Title>
          <Divider style={{ marginBottom: 10 }} />
          <Typography.Paragraph style={{ marginBottom: 10 }}>
            <span style={{ color: "red" }}>*</span>Pay through mobile money
          </Typography.Paragraph>
          <Radio.Group
            onChange={onChange}
            value={mode}
            style={{ display: "block" }}
          >
            <Radio value={"mtn"}>MTN momo</Radio>
            <Radio value={"orange"}>Orange Money</Radio>
            <Radio value={"bank-card"}>Bank Cards</Radio>
          </Radio.Group>

          <Space size={"middle"} className="momo-grid" align="center">
            {mode === "mtn" ? (
              <Tooltip
                title={<span style={{ color: "#333" }}>MTN momo</span>}
                color="#f8cf11"
              >
                <Card
                  style={{ borderRadius: 0, cursor: "pointer" }}
                  bordered={false}
                  bodyStyle={{ padding: 5 }}
                  className="momo-card"
                >
                  <img
                    src={"/momo/momo.png"}
                    alt="mtn momo"
                    height={120}
                    width={120}
                    style={{ borderRadius: 0 }}
                  />
                </Card>
              </Tooltip>
            ) : mode === "orange" ? (
              <Tooltip title={"Orange money"} color="#f50">
                <Card
                  style={{ borderRadius: 0, cursor: "pointer" }}
                  bordered={false}
                  bodyStyle={{ padding: 5 }}
                  className="momo-card"
                >
                  <img
                    src={"/momo/orange-momo.jpeg"}
                    alt="mtn momo"
                    height={120}
                    width={120}
                    style={{ borderRadius: 0 }}
                  />
                </Card>
              </Tooltip>
            ) : (
              <Tooltip
                title={<span style={{ color: "#333" }}>Stripe Payments</span>}
                color="#e6e6e6"
              >
                <Card
                  style={{ borderRadius: 0, cursor: "pointer" }}
                  bordered={false}
                  bodyStyle={{ padding: 5 }}
                  className="momo-card"
                >
                  <img
                    src={"/momo/stripe.png"}
                    alt="mtn momo"
                    height={130}
                    width={200}
                    style={{ borderRadius: 0 }}
                  />
                </Card>
              </Tooltip>
            )}
          </Space>
          <Form
            form={form}
            name="checkout-form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Telephone"
              name="telephone"
              rules={[
                { required: true, message: "Please input your telephone!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={loading}
                block
                htmlType="submit"
                size="large"
              >
                Place Order
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} md={10} className="checkout-summary">
          <Typography.Title level={3}>Order details summary</Typography.Title>
          {/* summary details */}
          <CheckoutSummaryComponent />
        </Col>
      </Row>
    </GeneralAppShell>
  );
};
