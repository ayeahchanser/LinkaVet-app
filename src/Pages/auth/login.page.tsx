import GeneralAppShell from "layout/app/general-app-shell";
import React, {  useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import "../../styles/login.style.scss";
import { Link, Navigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { useAuth } from "hooks/auth/auth.hook";

const LoginPage: React.FC = () => {
  const { loginUserFunction, isAuthenticated, user } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    loginUserFunction({
      email: values.email,
      password: values.password,
    });
    setSubmitting(false);
  };

  if (isAuthenticated && user) {
    return <Navigate to={"/callback"} />;
  }
  return (
    <GeneralAppShell>
      <Row
        justify={"center"}
        align="middle"
        className="form__container"
        // style={{
        //   background: "url(./honey-man.svg)",
        //   backgroundRepeat: "no-repeat, repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <Col
          xs={18}
          sm={12}
          lg={6}
          style={{
            background: "#fffff3",
            padding: "50px 20px",
            borderRadius: 10,
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MdEmail className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className="login-form-forgot" to="/forgot-password">
                Forgot password
              </Link>
            </div>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
                loading={isSubmitting}
              >
                Log in
              </Button>{" "}
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                width: "100%",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Or <Link to="/register">register now!</Link>
            </span>
          </Form>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default LoginPage;
